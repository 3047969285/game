#include "WordQuestAnimationPreview.h"
#include "Animation/AnimSequence.h"
#include "Animation/AnimSingleNodeInstance.h"
#include "Components/SkeletalMeshComponent.h"
#include "Engine/World.h"

AWordQuestAnimationPreview::AWordQuestAnimationPreview()
{
    PrimaryActorTick.bCanEverTick=true;
    GetMesh()->VisibilityBasedAnimTickOption=EVisibilityBasedAnimTickOption::AlwaysTickPoseAndRefreshBones;
}

void AWordQuestAnimationPreview::OnConstruction(const FTransform& Transform)
{
    Super::OnConstruction(Transform);
    if(PreviewMesh){
        GetMesh()->SetSkeletalMeshAsset(PreviewMesh);
        GetMesh()->SetRelativeLocation(FVector(0,0,-96));
        GetMesh()->SetAnimationMode(EAnimationMode::AnimationSingleNode);
        if(Idle)GetMesh()->PlayAnimation(Idle,true);
    }
}

TMap<FName,FTransform> AWordQuestAnimationPreview::EvaluatePreview(FName State,float Seconds)
{
    UAnimSequence* Animation=State==TEXT("walk")?Walk.Get():State==TEXT("sit")?Sit.Get():Idle.Get();
    TMap<FName,FTransform> Result;
    if(!PreviewMesh || !Animation || !FMath::IsFinite(Seconds))return Result;
    auto* Mesh=GetMesh();
    if(Mesh->GetSkeletalMeshAsset()!=PreviewMesh)Mesh->SetSkeletalMeshAsset(PreviewMesh);
    if(!Mesh->GetSingleNodeInstance() || Mesh->GetSingleNodeInstance()->GetCurrentAsset()!=Animation)Mesh->PlayAnimation(Animation,true);
    Mesh->SetPosition(FMath::Fmod(FMath::Max(Seconds,0.f),FMath::Max(.001f,Animation->GetPlayLength())),false);
    Mesh->TickAnimation(0,false);Mesh->RefreshBoneTransforms();Mesh->UpdateBounds();
    for(const FName Bone : {FName(TEXT("pelvis")),FName(TEXT("head")),FName(TEXT("foot_l")),FName(TEXT("foot_r")),FName(TEXT("hand_l")),FName(TEXT("hand_r"))})
        if(Mesh->GetBoneIndex(Bone)!=INDEX_NONE)Result.Add(Bone,Mesh->GetSocketTransform(Bone));
    return Result;
}

void AWordQuestAnimationPreview::Tick(float DeltaSeconds)
{
    Super::Tick(DeltaSeconds);
    if(!PreviewMesh)return;
    PreviewTime+=DeltaSeconds;
    const bool Editor=GetWorld()&&!GetWorld()->IsGameWorld();
    if(Editor && !bCycleInEditor)return;
    const FName State=Editor?(FMath::Fmod(PreviewTime,18.f)<6?TEXT("idle"):FMath::Fmod(PreviewTime,18.f)<12?TEXT("walk"):TEXT("sit")):
        bSeated?TEXT("sit"):GetVelocity().SizeSquared2D()>100?TEXT("walk"):TEXT("idle");
    EvaluatePreview(State,PreviewTime);
}
