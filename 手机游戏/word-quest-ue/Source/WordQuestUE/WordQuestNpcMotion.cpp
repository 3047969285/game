#include "WordQuestNpcMotion.h"
#include "Animation/AnimSequence.h"
#include "Animation/Skeleton.h"
#include "Components/SkeletalMeshComponent.h"
#include "Engine/SkeletalMesh.h"
#include "Dom/JsonObject.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"

UWordQuestNpcMotion::UWordQuestNpcMotion()
{
 PrimaryComponentTick.bCanEverTick = true;
}

void UWordQuestNpcMotion::CollectMeshes()
{
 Meshes.Reset();
 if (!GetOwner()) return;
 TArray<AActor*> Actors;
 Actors.Add(GetOwner());
 TArray<AActor*> Attached;
 GetOwner()->GetAttachedActors(Attached, true, true);
 Actors.Append(Attached);
 for (AActor* Actor : Actors)
 {
  TArray<USkeletalMeshComponent*> Found;
  Actor->GetComponents(Found);
  for (USkeletalMeshComponent* Mesh : Found) if (Mesh && Mesh->GetSkeletalMeshAsset()) Meshes.AddUnique(Mesh);
 }
}

bool UWordQuestNpcMotion::Configure(const FString& Role, const FString& Scene)
{
 if (!GetOwner() || Role.IsEmpty() || Scene.IsEmpty()) return false;
 // Persona identifiers are names, not paths.
 for (TCHAR C : Role) if (!(FChar::IsAlnum(C) || C == '_')) return false;
 CurrentRole = Role; CurrentScene = Scene;
 CollectMeshes();
 NextBlink = 2.5f + float(GetTypeHash(Role) % 240) / 100.f;
 FString Json, Activity;
 const FString Path = FPaths::ProjectContentDir() / TEXT("Data/npc/personas") / (Role + TEXT(".json"));
 if (FFileHelper::LoadFileToString(Json, *Path))
 {
  TSharedPtr<FJsonObject> Persona;
  if (FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Json), Persona) && Persona.IsValid())
  {
   const TArray<TSharedPtr<FJsonValue>>* Schedule = nullptr;
   if (Persona->TryGetArrayField(TEXT("schedule"), Schedule)) for (const auto& Item : *Schedule)
   {
    const TSharedPtr<FJsonObject> Entry = Item.IsValid() ? Item->AsObject() : nullptr;
    FString EntryScene;
    if (Entry.IsValid() && Entry->TryGetStringField(TEXT("scene"), EntryScene) && EntryScene == Scene)
    { Entry->TryGetStringField(TEXT("activity"), Activity); break; }
   }
  }
 }
 // Preserve the pose authored by scene staging at PIE start. Do not replace
 // it with a schedule pose until an explicit, blended transition is available.
 PoseName = PoseForActivity(Activity);
 bPoseApplied = false;
 GetOwner()->Tags.AddUnique(TEXT("needs_npc_pose_transition"));
 GetOwner()->Tags.AddUnique(TEXT("needs_npc_gaze_rig"));
 return Meshes.Num() > 0;
}

FString UWordQuestNpcMotion::PoseForActivity(const FString& Activity)
{
 const FString A = Activity.ToLower();
 const bool bSitting = A.Contains(TEXT("sit")) || A.Contains(TEXT("armchair")) || A.Contains(TEXT("sofa"));
 if (A.Contains(TEXT("phone"))) return bSitting ? TEXT("sit_phone") : TEXT("stand_phone");
 if (A.Contains(TEXT("book")) || A.Contains(TEXT("read"))) return bSitting ? TEXT("sit_read") : TEXT("stand");
 if (A.Contains(TEXT("laptop"))) return bSitting ? TEXT("sit_laptop") : TEXT("stand");
 if (A.Contains(TEXT("tablet"))) return bSitting ? TEXT("sit_tablet") : TEXT("stand");
 return bSitting ? TEXT("sit") : TEXT("stand");
}

bool UWordQuestNpcMotion::ApplyPose(const FString& Activity)
{
 PoseName = PoseForActivity(Activity);
 const FString Path = FString::Printf(TEXT("/Game/Memory/Characters/Poses/A_MH_%s.A_MH_%s"), *PoseName, *PoseName);
 UAnimSequence* Pose = LoadObject<UAnimSequence>(nullptr, *Path);
 if (!Pose || !Pose->GetSkeleton()) return false;
 for (USkeletalMeshComponent* Mesh : Meshes)
 {
  if (!Mesh || Mesh->GetBoneIndex(TEXT("pelvis")) == INDEX_NONE || Mesh->GetBoneIndex(TEXT("head")) == INDEX_NONE) continue;
  // A MetaHuman animation graph is never replaced; only existing single-node snapshots are eligible.
  if (Mesh->GetAnimationMode() != EAnimationMode::AnimationSingleNode) continue;
  if (!Pose->GetSkeleton()->IsCompatibleMesh(Mesh->GetSkeletalMeshAsset())) continue;
  Mesh->PlayAnimation(Pose, true);
  return true;
 }
 return false;
}

bool UWordQuestNpcMotion::SetMorph(FName Name, float Value)
{
 bool bFound = false;
 for (USkeletalMeshComponent* Mesh : Meshes)
 {
  if (Mesh && Mesh->GetSkeletalMeshAsset() && Mesh->GetSkeletalMeshAsset()->FindMorphTarget(Name))
  { Mesh->SetMorphTarget(Name, Value); bFound = true; }
 }
 return bFound;
}

void UWordQuestNpcMotion::SetGazeTarget(FVector Location) { GazeTarget = Location; bGazeActive = true; }
void UWordQuestNpcMotion::ClearGazeTarget() { bGazeActive = false; }

void UWordQuestNpcMotion::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* TickFunction)
{
 Super::TickComponent(DeltaTime, TickType, TickFunction);
 if (!GetOwner() || GetOwner()->IsHidden() || DeltaTime <= 0.f) return;
 Clock += DeltaTime;
 if (Clock >= NextBlink && BlinkElapsed < 0.f) BlinkElapsed = 0.f;
 if (BlinkElapsed >= 0.f)
 {
  BlinkElapsed += DeltaTime;
  const float Weight = FMath::Clamp(1.f - FMath::Abs(BlinkElapsed - .09f) / .09f, 0.f, 1.f);
  bBlinkAvailable = SetMorph(TEXT("eyeBlinkLeft"), Weight) | SetMorph(TEXT("eyeBlinkRight"), Weight);
  if (BlinkElapsed >= .18f) { BlinkElapsed = -1.f; NextBlink = Clock + 3.f + float(GetTypeHash(CurrentRole + FString::FromInt(int32(Clock))) % 220) / 100.f; }
 }
 const float Breath = .5f + .5f * FMath::Sin(Clock * 1.1f);
 bBreathAvailable = SetMorph(TEXT("breath"), Breath * .12f);
 FRotator Desired = FRotator::ZeroRotator;
 if (bGazeActive)
 {
  FVector Origin = GetOwner()->GetActorLocation() + FVector(0, 0, 150);
  for (USkeletalMeshComponent* Mesh : Meshes) if (Mesh && Mesh->DoesSocketExist(TEXT("head"))) { Origin = Mesh->GetSocketLocation(TEXT("head")); break; }
  const FVector Local = GetOwner()->GetActorTransform().InverseTransformVectorNoScale(GazeTarget - Origin);
  const FRotator Aim = Local.Rotation();
  Desired.Yaw = FMath::Clamp(FRotator::NormalizeAxis(Aim.Yaw), -35.f, 35.f);
  Desired.Pitch = FMath::Clamp(FRotator::NormalizeAxis(Aim.Pitch), -20.f, 20.f);
 }
 SmoothedLook = FMath::RInterpTo(SmoothedLook, Desired, DeltaTime, 4.f);
 const float H = SmoothedLook.Yaw / 35.f, V = SmoothedLook.Pitch / 20.f;
 bool bEyes = false;
 bEyes |= SetMorph(TEXT("eyeLookOutLeft"), FMath::Max(0.f, H));
 bEyes |= SetMorph(TEXT("eyeLookInLeft"), FMath::Max(0.f, -H));
 bEyes |= SetMorph(TEXT("eyeLookInRight"), FMath::Max(0.f, H));
 bEyes |= SetMorph(TEXT("eyeLookOutRight"), FMath::Max(0.f, -H));
 for (FName Name : {FName(TEXT("eyeLookUpLeft")), FName(TEXT("eyeLookUpRight"))}) bEyes |= SetMorph(Name, FMath::Max(0.f, V));
 for (FName Name : {FName(TEXT("eyeLookDownLeft")), FName(TEXT("eyeLookDownRight"))}) bEyes |= SetMorph(Name, FMath::Max(0.f, -V));
 bEyeMorphAvailable = bEyes;
}

void UWordQuestNpcMotion::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
 for (FName Name : {FName(TEXT("eyeBlinkLeft")), FName(TEXT("eyeBlinkRight")), FName(TEXT("breath")), FName(TEXT("eyeLookOutLeft")), FName(TEXT("eyeLookInLeft")), FName(TEXT("eyeLookInRight")), FName(TEXT("eyeLookOutRight")), FName(TEXT("eyeLookUpLeft")), FName(TEXT("eyeLookUpRight")), FName(TEXT("eyeLookDownLeft")), FName(TEXT("eyeLookDownRight"))}) SetMorph(Name, 0.f);
 Super::EndPlay(EndPlayReason);
}

FString UWordQuestNpcMotion::GetMotionState() const
{
 return FString::Printf(TEXT("role=%s scene=%s pose=%s pose_applied=%d blink_morph=%d breath_morph=%d eye_morph=%d bone_look=0 yaw=%.1f pitch=%.1f"), *CurrentRole, *CurrentScene, *PoseName, bPoseApplied, bBlinkAvailable, bBreathAvailable, bEyeMorphAvailable, SmoothedLook.Yaw, SmoothedLook.Pitch);
}
