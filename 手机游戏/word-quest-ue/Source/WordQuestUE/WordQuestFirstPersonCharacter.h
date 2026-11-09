#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "WordQuestFirstPersonCharacter.generated.h"

/** Human-sized locomotion. Authored cinematic cameras remain independent. */
UCLASS()
class WORDQUESTUE_API AWordQuestFirstPersonCharacter : public ACharacter
{
 GENERATED_BODY()
public:
 AWordQuestFirstPersonCharacter();
 virtual void Tick(float Dt) override;
 virtual void EndPlay(const EEndPlayReason::Type Reason) override;
 UFUNCTION(BlueprintCallable) void PlaceView(FVector EyePosition,FRotator Rotation);
 UFUNCTION(BlueprintCallable) void SetHorizontalFov(float Degrees);
 UFUNCTION(BlueprintCallable) void SetHeadBobEnabled(bool Enabled);
 UFUNCTION(BlueprintCallable) void SetCrouching(bool Enabled);
 /** Only an explicitly delivered assembled class is accepted; no source asset is changed. */
 UFUNCTION(BlueprintCallable) bool InstallFirstPersonBody(TSubclassOf<AActor> AssembledClass,FTransform FeetTransform,FName BodyComponentName,const TArray<FName>& HeadComponents);
 UFUNCTION(BlueprintCallable) void RemoveFirstPersonBody();
 UFUNCTION(BlueprintPure) FString GetFirstPersonState() const;
 UFUNCTION(BlueprintPure) FVector GetEyeWorldLocation() const;
 UPROPERTY(VisibleAnywhere,BlueprintReadOnly) TObjectPtr<class UCineCameraComponent> EyeCamera;
 UPROPERTY(EditAnywhere,BlueprintReadWrite,Category="Comfort") bool bHeadBobEnabled=true;
 UPROPERTY(EditAnywhere,BlueprintReadOnly,Category="Comfort") float StandingEyeHeight=172.f;
 UPROPERTY(EditAnywhere,BlueprintReadOnly,Category="Comfort") float CrouchingEyeHeight=112.f;
 UPROPERTY(EditAnywhere,BlueprintReadOnly,Category="Comfort",meta=(ClampMin="1.6",ClampMax="2.0")) float WalkingStepHz=1.8f;
 UPROPERTY(EditAnywhere,BlueprintReadOnly,Category="FirstPersonBody") FName FirstPersonHeadBone=TEXT("head");
private:
 UPROPERTY(Transient) TObjectPtr<AActor> FirstPersonBodyActor;
 FTransform BodyFeetTransform=FTransform::Identity;
 FString BodyState=TEXT("missing_delivered_body");
 float EyeHeight=172.f,StepPhase=0.f,BobZ=0.f,BobY=0.f;
};
