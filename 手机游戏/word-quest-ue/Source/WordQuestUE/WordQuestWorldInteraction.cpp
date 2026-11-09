#include "WordQuestWorldInteraction.h"
#include "WordQuestMemoryDirector.h"
#include "WordQuestNpcDirector.h"
#include "Components/BoxComponent.h"
#include "Components/StaticMeshComponent.h"
#include "Engine/World.h"
#include "Engine/StaticMesh.h"
#include "PhysicsEngine/BodySetup.h"
#include "EngineUtils.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/Pawn.h"
#include "InputCoreTypes.h"
#include "Kismet/GameplayStatics.h"
#include "Materials/MaterialInterface.h"
#include "PhysicalMaterials/PhysicalMaterial.h"
#include "PhysicsEngine/PhysicsConstraintComponent.h"
#include "Sound/SoundWaveProcedural.h"
#include "Engine/StaticMeshActor.h"
#include "PhysicsEngine/PhysicsHandleComponent.h"
#include "Sound/SoundBase.h"

namespace
{
FString Tagged(const AActor* Actor,const TCHAR* Prefix)
{
 if(Actor)for(const FName Tag:Actor->Tags){const FString Text=Tag.ToString();if(Text.StartsWith(Prefix))return Text.Mid(FCString::Strlen(Prefix));}
 return FString();
}
struct FMassProfile{float Density,Fill,Min,Max;};
FMassProfile Profile(const FString& Kind)
{
 if(Kind==TEXT("phone")||Kind==TEXT("remote"))return {1800,.95f,.08f,.45f};
 if(Kind==TEXT("cup"))return {2400,.12f,.06f,.65f};
 if(Kind==TEXT("book"))return {700,.80f,.05f,2.0f};
 if(Kind==TEXT("chess_piece"))return {650,.35f,.004f,.12f};
 if(Kind==TEXT("chair"))return {650,.035f,3.f,30.f};
 if(Kind==TEXT("drawer"))return {650,.12f,1.f,15.f};
 if(Kind==TEXT("door"))return {650,.45f,8.f,50.f};
 if(Kind==TEXT("window"))return {650,.20f,4.f,20.f};
 return {1000,.25f,.03f,10.f};
}
}

UWordQuestWorldInteraction::UWordQuestWorldInteraction()
{
 PrimaryComponentTick.bCanEverTick=true;PrimaryComponentTick.TickGroup=TG_PostUpdateWork;
}
namespace
{
USoundWaveProcedural* MakeContactPlaceholder(UObject* Outer,FName Material)
{
 const FString Name=Material.ToString();
 USoundWaveProcedural* Wave=NewObject<USoundWaveProcedural>(Outer);
 Wave->SetSampleRate(48000);Wave->NumChannels=1;Wave->Duration=.22f;Wave->SoundGroup=SOUNDGROUP_Effects;
 const int32 Count=10560;TArray<int16> Samples;Samples.SetNumUninitialized(Count);
 FRandomStream Noise(Name.IsEmpty()?17:FCrc::StrCrc32(*Name));
 float Base=180.f,Bright=.35f,Decay=13.f;
 if(Name.Contains(TEXT("metal"))){Base=880.f;Bright=.55f;Decay=9.f;}
 else if(Name.Contains(TEXT("ceramic"))||Name.Contains(TEXT("glass"))){Base=2400.f;Bright=.7f;Decay=18.f;}
 else if(Name.Contains(TEXT("paper"))||Name.Contains(TEXT("fabric"))){Base=90.f;Bright=.85f;Decay=26.f;}
 else if(Name.Contains(TEXT("plastic"))){Base=520.f;Bright=.5f;Decay=15.f;}
 else if(Name.Contains(TEXT("stone"))){Base=260.f;Bright=.6f;Decay=20.f;}
 for(int32 I=0;I<Count;I++)
 {
  const float T=float(I)/48000.f;const float Env=FMath::Exp(-Decay*T);
  const float Tone=FMath::Sin(2.f*PI*Base*T)*.55f+FMath::Sin(2.f*PI*Base*1.71f*T)*.25f;
  const float Grain=(Noise.FRand()*2.f-1.f)*Bright;
  Samples[I]=int16(FMath::Clamp((Tone+Grain)*Env,.0f,1.f)*32767.f*.32f);
 }
 Wave->QueueAudio(reinterpret_cast<const uint8*>(Samples.GetData()),Samples.Num()*sizeof(int16));
 return Wave;
}
}

void UWordQuestWorldInteraction::BeginPlay()
{
 Super::BeginPlay();
 Handle=NewObject<UPhysicsHandleComponent>(GetOwner(),TEXT("MemoryPhysicsHandle"));Handle->RegisterComponent();
 Handle->SetLinearStiffness(900.f);Handle->SetLinearDamping(100.f);Handle->SetAngularStiffness(900.f);Handle->SetAngularDamping(100.f);Handle->SetInterpolationSpeed(12.f);
 HintMaterial=LoadObject<UMaterialInterface>(nullptr,TEXT("/Game/Memory/Physics/M_InteractionHint.M_InteractionHint"));
 // C16 placeholder contact audio: material-specific procedural sounds, no authored assets yet.
 for(const TCHAR* MaterialName:{TEXT("wood"),TEXT("metal"),TEXT("ceramic"),TEXT("glass"),TEXT("paper"),TEXT("fabric"),TEXT("plastic"),TEXT("stone"),TEXT("generic")})
 {
  const FName Key(MaterialName);
  if(!ContactSounds.Contains(Key)||!ContactSounds.FindRef(Key))ContactSounds.Add(Key,MakeContactPlaceholder(this,Key));
 }
 // Room shell actors carry interaction semantics independently of the legacy physics setup.
 // The delivered window is fixed until an authored movable sash is available.
 for(TActorIterator<AActor> It(GetWorld());It;++It)
 {
  AActor* Actor=*It;
  if(Actor->ActorHasTag(TEXT("arch:floor")))
  {
   FVector Centre,Extent;Actor->GetActorBounds(false,Centre,Extent);
   if(!Centre.ContainsNaN()&&!Extent.ContainsNaN()&&Extent.X>1&&Extent.Y>1)
   {
    auto* Floor=NewObject<UBoxComponent>(Actor,TEXT("MemoryRoomFloorCollision"));
    Actor->AddInstanceComponent(Floor);Floor->SetBoxExtent(Extent.ComponentMax(FVector(1)),false);
    Floor->SetWorldLocation(Centre);Floor->SetCollisionProfileName(TEXT("BlockAll"));
    Floor->SetCollisionEnabled(Actor->IsHidden()?ECollisionEnabled::NoCollision:ECollisionEnabled::QueryAndPhysics);
    Floor->SetHiddenInGame(true);Floor->RegisterComponent();RoomFloorColliders.Add(Floor);
   }
   continue;
  }
  if(Actor->ActorHasTag(TEXT("interactive:window"))) continue;
  if(Actor->ActorHasTag(TEXT("interactive:door")))
  {
   Actor->Tags.AddUnique(TEXT("physics_kind:door"));Actor->Tags.AddUnique(TEXT("physics_mode:hinge"));
   Actor->Tags.AddUnique(TEXT("physics_material:wood"));
  }
  if(!Tagged(Actor,TEXT("physics_kind:")).IsEmpty())PrepareBody(Actor);
 }
}
void UWordQuestWorldInteraction::PrepareBody(AActor* Actor)
{
 auto* Mesh=Actor?Actor->FindComponentByClass<UStaticMeshComponent>():nullptr;
 if(!Mesh||!Mesh->GetStaticMesh()||Actor->ActorHasTag(TEXT("physics_runtime_ready")))return;
 const FString Kind=Tagged(Actor,TEXT("physics_kind:"));const FString Mode=Tagged(Actor,TEXT("physics_mode:"));
 if(Mode.IsEmpty())return;
 FVector Centre,Extent;Actor->GetActorBounds(false,Centre,Extent);
 if(Centre.ContainsNaN()||Extent.ContainsNaN()||Extent.GetMax()<=0.f)return;
 const FRotator OriginalRotation=Actor->GetActorRotation();
 // Existing simple/convex collision retains the authored mesh pivot and shape.
 // Never mutate BodySetup or generate collision in the source StaticMesh.
 const UBodySetup* Setup=Mesh->GetStaticMesh()->GetBodySetup();
 const bool bSourceCollision=Setup&&Setup->AggGeom.GetElementCount()>0&&Setup->CollisionTraceFlag!=CTF_UseComplexAsSimple;
 Mesh->SetMobility(EComponentMobility::Movable);Mesh->SetSimulatePhysics(false);
 UPrimitiveComponent* Body=Mesh;
 if(!bSourceCollision)
 {
  auto* Proxy=NewObject<UBoxComponent>(Actor,TEXT("MemoryCollisionBody"));Actor->AddInstanceComponent(Proxy);
  Proxy->SetMobility(EComponentMobility::Movable);Proxy->SetBoxExtent(Extent.ComponentMax(FVector(.45f)),false);
  Proxy->SetHiddenInGame(true,false);Proxy->RegisterComponent();Proxy->SetWorldLocation(Centre);
  Mesh->SetCollisionEnabled(ECollisionEnabled::NoCollision);Actor->SetRootComponent(Proxy);Mesh->AttachToComponent(Proxy,FAttachmentTransformRules::KeepWorldTransform);
  Body=Proxy;Actor->Tags.AddUnique(TEXT("needs_convex_collision"));Actor->Tags.AddUnique(TEXT("physics_collision:box_proxy"));
 }
 else
 {
  Actor->Tags.Remove(TEXT("needs_convex_collision"));Actor->Tags.AddUnique(TEXT("physics_collision:source_simple"));
 }
 Body->SetCollisionProfileName(TEXT("PhysicsActor"));Body->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);
 Body->SetCollisionResponseToAllChannels(ECR_Block);Body->SetCollisionResponseToChannel(ECC_Camera,ECR_Ignore);
 Body->SetGenerateOverlapEvents(false);Body->SetNotifyRigidBodyCollision(true);Body->SetLinearDamping(.6f);Body->SetAngularDamping(2.f);Body->SetUseCCD(true);
 const auto P=Profile(Kind);
 // Local dimensions avoid mass inflation when a thin book is rotated in world space.
 const FVector LocalExtent=Mesh->GetStaticMesh()->GetBounds().BoxExtent*Mesh->GetComponentScale().GetAbs();
 const float VolumeM3=8.f*LocalExtent.X*LocalExtent.Y*LocalExtent.Z*1.e-6f;
 const float Mass=FMath::Clamp(VolumeM3*P.Density*P.Fill,P.Min,P.Max);
 Body->SetMassOverrideInKg(NAME_None,Mass,true);
 SpawnTransforms.Add(Actor,Body->GetComponentTransform());
 FName Material(*Tagged(Actor,TEXT("physics_material:")));if(Material.IsNone())Material=TEXT("wood");
 if(!PhysicalMaterials.Contains(Material))
 {
  auto* PM=NewObject<UPhysicalMaterial>(this);PM->Density=P.Density*.001f;PM->Friction=Material==TEXT("fabric")?.85f:.55f;PM->Restitution=Material==TEXT("ceramic")?.08f:.12f;PhysicalMaterials.Add(Material,PM);
 }
 Body->SetPhysMaterialOverride(PhysicalMaterials[Material]);Body->OnComponentHit.AddDynamic(this,&UWordQuestWorldInteraction::Hit);
 Body->SetSimulatePhysics(Mode!=TEXT("static")&&!Actor->IsHidden());Bodies.Add(Body);Actor->Tags.Remove(TEXT("physics_collision_pending"));Actor->Tags.AddUnique(TEXT("physics_runtime_ready"));
 if(Mode==TEXT("hinge")||Mode==TEXT("slide"))
 {
  auto* Joint=NewObject<UPhysicsConstraintComponent>(Actor,TEXT("MemoryJoint"));Actor->AddInstanceComponent(Joint);Joint->RegisterComponent();
  // Claude's room shell places the door on the east wall; south means its minimum Y edge.
  // For unlabelled window glass choose the long horizontal axis to keep the hinge at an edge.
  FVector HingeOffset=FVector::ZeroVector;
  if(Mode==TEXT("hinge"))
  {
   const FString Side=Tagged(Actor,TEXT("hinge:"));
   if(Side==TEXT("south"))HingeOffset.Y=-Extent.Y;
   else if(Side==TEXT("north"))HingeOffset.Y=Extent.Y;
   else if(Side==TEXT("west"))HingeOffset.X=-Extent.X;
   else if(Side==TEXT("east"))HingeOffset.X=Extent.X;
   else if(Extent.Y>Extent.X)HingeOffset.Y=-Extent.Y;
   else HingeOffset.X=-Extent.X;
  }
  Joint->SetWorldLocation(Centre+HingeOffset);
  Joint->SetWorldRotation(Mode==TEXT("hinge")?FRotator(90,OriginalRotation.Yaw,0):OriginalRotation);
  Joint->SetLinearXLimit(Mode==TEXT("slide")?LCM_Limited:LCM_Locked,Mode==TEXT("slide")?22.f:0.f);
  Joint->SetLinearYLimit(LCM_Locked,0);Joint->SetLinearZLimit(LCM_Locked,0);
  Joint->SetAngularSwing1Limit(ACM_Locked,0);Joint->SetAngularSwing2Limit(ACM_Locked,0);Joint->SetAngularTwistLimit(Mode==TEXT("hinge")?ACM_Limited:ACM_Locked,Mode==TEXT("hinge")?90.f:0.f);
  Joint->SetDisableCollision(true);Joint->SetConstrainedComponents(Body,NAME_None,nullptr,NAME_None);
  Joint->SetLinearPositionDrive(Mode==TEXT("slide"),false,false);Joint->SetLinearDriveParams(200.f,40.f,500.f);
  Joint->SetAngularDriveMode(EAngularDriveMode::TwistAndSwing);Joint->SetAngularOrientationDrive(false,Mode==TEXT("hinge"));// Chaos torque is in centimetre units; the old 300 limit could not move a 50 kg door.
  Joint->SetAngularDriveParams(30000.f,3000.f,1000000.f);
  Constraints.Add(Actor,Joint);
 }
}
UPrimitiveComponent* UWordQuestWorldInteraction::BodyFor(AActor* Actor) const
{
 for(const auto& Body:Bodies)if(IsValid(Body.Get())&&Body->GetOwner()==Actor)return Body.Get();
 return nullptr;
}
void UWordQuestWorldInteraction::EndPlay(const EEndPlayReason::Type Reason)
{
 ReleaseHeld(false);ClearFocus();if(Handle)Handle->DestroyComponent();Super::EndPlay(Reason);
}
bool UWordQuestWorldInteraction::IsAvailable()const
{
 if(!bEnabled||!GetWorld()||UGameplayStatics::IsGamePaused(this))return false;
 if(auto* Npc=GetOwner()->FindComponentByClass<UWordQuestNpcDirector>())if(Npc->IsInputActive())return false;
 if(auto* D=GetOwner()->FindComponentByClass<UWordQuestMemoryDirector>())
 {
  const FString State=D->GetPlaybackState();if(State.Contains(TEXT("transition=1"))||State.Contains(TEXT("world_input=1"))||State.Contains(TEXT("paused=1")))return false;
  FString Before,Error;if(State.Split(TEXT(" error="),&Before,&Error)&&!Error.IsEmpty())return false;
 }
 return true;
}
void UWordQuestWorldInteraction::ClearFocus()
{
 if(Focused.IsValid())if(auto* Mesh=Focused->FindComponentByClass<UStaticMeshComponent>())Mesh->SetOverlayMaterial(nullptr);
 Focused.Reset();GazeClock=0;
}
void UWordQuestWorldInteraction::TickComponent(float Dt,ELevelTick TickType,FActorComponentTickFunction* Fn)
{
 Super::TickComponent(Dt,TickType,Fn);
 auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC)return;
 for(const auto& FloorPtr:RoomFloorColliders)
 {
  auto* Floor=FloorPtr.Get();if(!IsValid(Floor)||!Floor->GetOwner())continue;
  const auto Desired=Floor->GetOwner()->IsHidden()?ECollisionEnabled::NoCollision:ECollisionEnabled::QueryAndPhysics;
  if(Floor->GetCollisionEnabled()!=Desired)Floor->SetCollisionEnabled(Desired);
 }
 // Inactive sets retain no live bodies; do not let hidden furniture fall forever.
 for(const auto& BodyPtr:Bodies)
 {
  auto* Body=BodyPtr.Get();if(!IsValid(Body))continue;
  const bool Active=!Body->GetOwner()->IsHidden()&&Tagged(Body->GetOwner(),TEXT("physics_mode:"))!=TEXT("static");
  if(Body->IsSimulatingPhysics()!=Active){if(Held.Get()==Body)ReleaseHeld();Body->SetSimulatePhysics(Active);}
  if(Active&&Body->IsSimulatingPhysics())
  {
   const FVector V=Body->GetPhysicsLinearVelocity();if(V.SizeSquared()>FMath::Square(900.f))Body->SetPhysicsLinearVelocity(V.GetClampedToMaxSize(900.f));

  }
 }
 if(!IsAvailable()){Gate=TEXT("gated");ReleaseHeld();ClearFocus();bTouchDown=false;bTouchHolding=false;bInspecting=false;return;}
 Gate=TEXT("ready");FVector Eye;FRotator Aim;PC->GetPlayerViewPoint(Eye,Aim);
 FCollisionQueryParams Query(SCENE_QUERY_STAT(MemoryInteract),false);Query.AddIgnoredActor(GetOwner());if(PC->GetPawn())Query.AddIgnoredActor(PC->GetPawn());if(PC->GetViewTarget())Query.AddIgnoredActor(PC->GetViewTarget());
 FVector RayStart=Eye,RayDirection=Aim.Vector();
 float TouchX=0,TouchY=0;bool TouchPressed=false;PC->GetInputTouchState(ETouchIndex::Touch1,TouchX,TouchY,TouchPressed);
 if(TouchPressed&&!Held.IsValid())PC->DeprojectScreenPositionToWorld(TouchX,TouchY,RayStart,RayDirection);
 FHitResult HitResult;const bool HitSomething=GetWorld()->LineTraceSingleByChannel(HitResult,RayStart,RayStart+RayDirection*ReachCm,ECC_Visibility,Query);
 AActor* Candidate=HitSomething?HitResult.GetActor():nullptr;
 if(bProbeFocusLock&&Focused.IsValid())Candidate=Focused.Get();
 else
 {
  if(!Candidate||Tagged(Candidate,TEXT("physics_mode:")).IsEmpty()||Candidate->IsHidden())Candidate=nullptr;
  if(Focused.Get()!=Candidate){ClearFocus();Focused=Candidate;}
 }
 if(Candidate)
 {
  GazeClock=bProbeFocusLock?GazeSeconds:GazeClock+Dt;
  if(GazeClock>=GazeSeconds&&HintMaterial)if(auto* Mesh=Candidate->FindComponentByClass<UStaticMeshComponent>())if(Mesh->GetOverlayMaterial()!=HintMaterial)Mesh->SetOverlayMaterial(HintMaterial);
 }
 bInspecting=false;
 if(Held.IsValid()&&Handle)
 {
  auto* Body=Held.Get();if(Body->GetOwner()->IsHidden()){ReleaseHeld();return;}
  FVector Target=Eye+Aim.Vector()*HoldDistanceCm;Query.AddIgnoredActor(Body->GetOwner());
  FHitResult Wall;const float Radius=FMath::Clamp(Body->Bounds.BoxExtent.GetMax(),3.f,24.f);
  if(GetWorld()->SweepSingleByChannel(Wall,Eye,Target,FQuat::Identity,ECC_Visibility,FCollisionShape::MakeSphere(Radius),Query))Target=Wall.Location+Wall.Normal*2.f;
  Handle->SetTargetLocationAndRotation(Target,Aim+InspectOffset);
  if(PC->WasInputKeyJustPressed(EKeys::MouseScrollUp))InspectHeld(FRotator(0,15,0));
  if(PC->WasInputKeyJustPressed(EKeys::MouseScrollDown))InspectHeld(FRotator(0,-15,0));
  bInspecting=PC->IsInputKeyDown(EKeys::RightMouseButton)||PC->IsInputKeyDown(EKeys::Gamepad_LeftTrigger);
  if(PC->IsInputKeyDown(EKeys::RightMouseButton))
  {float X=0,Y=0;PC->GetInputMouseDelta(X,Y);InspectHeld(FRotator(-Y*.25f,X*.25f,0));}
  if(PC->IsInputKeyDown(EKeys::Gamepad_LeftTrigger))
   InspectHeld(FRotator(-PC->GetInputAnalogKeyState(EKeys::Gamepad_RightY)*75.f*Dt,PC->GetInputAnalogKeyState(EKeys::Gamepad_RightX)*90.f*Dt,0));
 }
 if(PC->WasInputKeyJustPressed(EKeys::F)||PC->WasInputKeyJustPressed(EKeys::Gamepad_FaceButton_Left))Interact();
 if(PC->WasInputKeyJustPressed(EKeys::G)||PC->WasInputKeyJustPressed(EKeys::Gamepad_RightShoulder)){if(Held.IsValid())ReleaseHeld(true);else PushFocused();}
 float X=0,Y=0,X2=0,Y2=0;bool Down=false,Down2=false;
 PC->GetInputTouchState(ETouchIndex::Touch1,X,Y,Down);PC->GetInputTouchState(ETouchIndex::Touch2,X2,Y2,Down2);
 if(Down)
 {
  const FVector2D Touch(X,Y),Centre=Down2?(Touch+FVector2D(X2,Y2))*.5f:Touch;
  if(!bTouchDown)
  {
   TouchStart=LastTouch=Touch;LastTouchCentre=Centre;TouchClock=TouchUpSpeed=0;
   bTouchHolding=Held.IsValid();bTouchHandled=bTouchHolding;
  }
  TouchClock+=Dt;
  const float UpSpeed=(LastTouch.Y-Y)/FMath::Max(Dt,.001f);TouchUpSpeed=FMath::Max(0.f,UpSpeed);
  if(Held.IsValid()&&Down2)
  {
   bInspecting=true;bTouchHolding=true;
   if(!bTwoTouches)LastTouchCentre=Centre;
   const FVector2D Drag=Centre-LastTouchCentre;InspectHeld(FRotator(-Drag.Y*.25f,Drag.X*.25f,0));
  }
  if(!bTouchHandled&&TouchClock>=.3f&&FVector2D::Distance(TouchStart,Touch)<14.f)
  {bTouchHandled=Interact();bTouchHolding=Held.IsValid();}
  LastTouch=Touch;LastTouchCentre=Centre;
 }
 else if(bTouchDown&&bTouchHolding&&Held.IsValid())
 {
  // A short fast upward swipe throws; simply lifting the fingers drops safely.
  const bool Throw=TouchUpSpeed>650.f&&TouchStart.Y-LastTouch.Y>55.f;
  ReleaseHeld(Throw);bTouchHolding=false;bInspecting=false;
 }
 bTouchDown=Down;bTwoTouches=Down&&Down2;
}
bool UWordQuestWorldInteraction::Interact()
{
 if(!IsAvailable())return false;
 if(Held.IsValid()){ReleaseHeld();return true;}
 AActor* Actor=Focused.Get();if(!Actor||GazeClock<GazeSeconds)return false;
 if(auto* Joint=Constraints.Find(Actor))
 {
  const bool Open=!OpenConstraints.Contains(Actor);if(Open)OpenConstraints.Add(Actor);else OpenConstraints.Remove(Actor);
  if(Tagged(Actor,TEXT("physics_mode:"))==TEXT("slide"))(*Joint)->SetLinearPositionTarget(FVector(Open?22.f:0,0,0));
  else (*Joint)->SetAngularOrientationTarget(FRotator(0,0,Open?65.f:0));
  if(auto* Body=BodyFor(Actor))Body->WakeAllRigidBodies();++ConstraintCount;return true;
 }
 if(Tagged(Actor,TEXT("physics_mode:"))!=TEXT("pickup"))return PushFocused();
 auto* Body=BodyFor(Actor);if(!Body||!Body->IsSimulatingPhysics()||Body->GetMass()>3.f||!Handle)return false;
 Held=Body;InspectOffset=FRotator::ZeroRotator;Body->WakeAllRigidBodies();Handle->GrabComponentAtLocationWithRotation(Body,NAME_None,Body->Bounds.Origin,Body->GetComponentRotation());++GrabCount;return true;
}
void UWordQuestWorldInteraction::ReleaseHeld(bool bThrow)
{
 auto* Body=Held.Get();if(!Body)return;
 if(Handle)Handle->ReleaseComponent();Held.Reset();bInspecting=false;++DropCount;
 if(bThrow&&IsAvailable())if(auto* PC=UGameplayStatics::GetPlayerController(this,0))
 {
  FVector Eye;FRotator Aim;PC->GetPlayerViewPoint(Eye,Aim);Body->AddImpulse(Aim.Vector()*350.f,NAME_None,true);++ThrowCount;
 }
}
void UWordQuestWorldInteraction::InspectHeld(FRotator Delta){if(Held.IsValid())InspectOffset=(InspectOffset+Delta).GetNormalized();}
bool UWordQuestWorldInteraction::PushFocused()
{
 if(!IsAvailable()||!Focused.IsValid()||GazeClock<GazeSeconds)return false;
 auto* Body=BodyFor(Focused.Get());auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!Body||!PC||!Body->IsSimulatingPhysics()||Constraints.Contains(Focused.Get()))return false;
 FVector Eye;FRotator Aim;PC->GetPlayerViewPoint(Eye,Aim);Body->AddImpulse(FVector(Aim.Vector().X,Aim.Vector().Y,0).GetSafeNormal()*90.f,NAME_None,true);++PushCount;return true;
}
void UWordQuestWorldInteraction::Contact(FName Material,const FVector& Position,float Impulse)
{
 OnSurfaceContact.Broadcast(Material,Position,Impulse);
 ++ContactEvents;LastContactMaterial=Material;
 auto* Sound=ContactSounds.Find(Material);if(!Sound||!*Sound)Sound=ContactSounds.Find(TEXT("generic"));
 if(Sound&&*Sound)UGameplayStatics::PlaySoundAtLocation(this,*Sound,Position,FMath::Clamp(Impulse/100.f,.08f,.65f));
}
void UWordQuestWorldInteraction::Hit(UPrimitiveComponent* Component,AActor* Other,UPrimitiveComponent* OtherComponent,FVector NormalImpulse,const FHitResult& Result)
{
 if(!Component||Component->GetOwner()->IsHidden())return;const double Now=GetWorld()->GetTimeSeconds();
 const float Strength=NormalImpulse.Size();if(Strength<5.f)return;
 const double* Last=LastContactTimes.Find(Component->GetOwner());if(Last&&Now-*Last<.15)return;LastContactTimes.Add(Component->GetOwner(),Now);
 Contact(FName(*Tagged(Component->GetOwner(),TEXT("physics_material:"))),Result.ImpactPoint,Strength);
}
void UWordQuestWorldInteraction::ProbeFocusActor(AActor* Actor)
{
 if(Actor){Focused=Actor;GazeClock=GazeSeconds;bProbeFocusLock=true;}
}
void UWordQuestWorldInteraction::EmitFootstep()
{
 auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC||!IsAvailable())return;FVector Eye;FRotator Aim;PC->GetPlayerViewPoint(Eye,Aim);
 FCollisionQueryParams Query(SCENE_QUERY_STAT(MemoryFootstep),false);if(PC->GetPawn())Query.AddIgnoredActor(PC->GetPawn());if(PC->GetViewTarget())Query.AddIgnoredActor(PC->GetViewTarget());FHitResult Ground;
 if(GetWorld()->LineTraceSingleByChannel(Ground,Eye,Eye-FVector(0,0,230),ECC_Visibility,Query))
 {FString Material=Tagged(Ground.GetActor(),TEXT("physics_material:"));Contact(FName(Material.IsEmpty()?TEXT("wood"):*Material),Ground.ImpactPoint,20.f);}
}
FString UWordQuestWorldInteraction::GetInteractionState()const
{
 int32 SourceCount=0,ProxyCount=0;for(const auto& Body:Bodies)if(IsValid(Body.Get())){SourceCount+=Body->GetOwner()->ActorHasTag(TEXT("physics_collision:source_simple"));ProxyCount+=Body->GetOwner()->ActorHasTag(TEXT("physics_collision:box_proxy"));}
 int32 Flying=0;double MaxSpeed=0.;FString FlyingNames;   // Claude: name the offenders so a physics FAIL is diagnosable
for(const auto& BodyRef:Bodies){auto* Body=BodyRef.Get();if(!Body)continue;const double Z=Body->GetComponentLocation().Z;const double Speed=Body->GetPhysicsLinearVelocity().Size();MaxSpeed=FMath::Max(MaxSpeed,Speed);const FTransform* Initial=SpawnTransforms.Find(Body->GetOwner());if(Z<-5.||Z>1000.||Body->GetComponentLocation().ContainsNaN()||(Initial&&FVector::DistSquared(Body->GetComponentLocation(),Initial->GetLocation())>FMath::Square(1800.f))){++Flying;if(Flying<=3)FlyingNames+=FString::Printf(TEXT("%s@%.0f,"),*GetNameSafe(Body->GetOwner()),Z);};}
 return FString::Printf(TEXT("gate=%s focused=%s gaze=%.2f held=%s bodies=%d source_collision=%d proxy_collision=%d joints=%d inspecting=%d grabs=%d drops=%d throws=%d pushes=%d toggles=%d audio=%d contact_events=%d contact_material=%s max_body_speed=%.1f flying=%d flying_bodies=%s"),*Gate,*GetNameSafe(Focused.Get()),GazeClock,*GetNameSafe(Held.Get()),Bodies.Num(),SourceCount,ProxyCount,Constraints.Num(),bInspecting,GrabCount,DropCount,ThrowCount,PushCount,ConstraintCount,ContactSounds.Num(),ContactEvents,*LastContactMaterial.ToString(),MaxSpeed,Flying,*FlyingNames);
}
