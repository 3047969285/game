#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "WordQuestNpcMotion.generated.h"

class USkeletalMeshComponent;

/** Non-invasive NPC presentation. Never changes the face or body animation blueprint. */
UCLASS(ClassGroup=(WordQuest), meta=(BlueprintSpawnableComponent))
class WORDQUESTUE_API UWordQuestNpcMotion : public UActorComponent
{
 GENERATED_BODY()
public:
 UWordQuestNpcMotion();
 virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* TickFunction) override;
 virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;
 UFUNCTION(BlueprintCallable) bool Configure(const FString& Role, const FString& Scene);
 UFUNCTION(BlueprintCallable) void SetGazeTarget(FVector Location);
 UFUNCTION(BlueprintCallable) void ClearGazeTarget();
 UFUNCTION(BlueprintPure) FString GetMotionState() const;
 static FString PoseForActivity(const FString& Activity);
private:
 void CollectMeshes();
 bool ApplyPose(const FString& Activity);
 bool SetMorph(FName Name, float Value);
 UPROPERTY() TArray<TObjectPtr<USkeletalMeshComponent>> Meshes;
 FString PoseName, CurrentRole, CurrentScene;
 FVector GazeTarget = FVector::ZeroVector;
 FRotator SmoothedLook = FRotator::ZeroRotator;
 float Clock = 0.f, NextBlink = 3.f, BlinkElapsed = -1.f;
 bool bGazeActive = false, bPoseApplied = false, bBlinkAvailable = false, bBreathAvailable = false, bEyeMorphAvailable = false;
};
