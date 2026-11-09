#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "WordQuestWorldInteraction.generated.h"

class UBoxComponent;
class UPrimitiveComponent;
class UPhysicsHandleComponent;
class UPhysicsConstraintComponent;
class UPhysicalMaterial;
class USoundBase;
class UMaterialInterface;

DECLARE_DYNAMIC_MULTICAST_DELEGATE_ThreeParams(FWordQuestSurfaceContact,FName,Material,FVector,Location,float,Impulse);

/** Runtime-only Chaos bodies: authored meshes/materials remain read-only. */
UCLASS(ClassGroup=(WordQuest),meta=(BlueprintSpawnableComponent))
class WORDQUESTUE_API UWordQuestWorldInteraction : public UActorComponent
{
 GENERATED_BODY()
public:
 UWordQuestWorldInteraction();
 virtual void BeginPlay() override;
 virtual void EndPlay(const EEndPlayReason::Type Reason) override;
 virtual void TickComponent(float DeltaTime,ELevelTick TickType,FActorComponentTickFunction* Fn) override;
 UFUNCTION(BlueprintCallable) bool Interact();
 UFUNCTION(BlueprintCallable) void ReleaseHeld(bool bThrow=false);
 UFUNCTION(BlueprintCallable) void InspectHeld(FRotator Delta);
 UFUNCTION(BlueprintCallable) bool PushFocused();
 UFUNCTION(BlueprintCallable) void EmitFootstep();
 UFUNCTION(BlueprintCallable) void ProbeFocusActor(AActor* Actor);
 UFUNCTION(BlueprintCallable) void ProbeReleaseFocus(){bProbeFocusLock=false;}
 UFUNCTION(BlueprintPure) FString GetInteractionState() const;
 UFUNCTION(BlueprintPure) bool IsHolding() const { return Held.IsValid(); }
 UFUNCTION(BlueprintPure) bool IsInspecting() const { return bInspecting; }
 UPROPERTY(EditAnywhere,BlueprintReadWrite,Category="Interaction") bool bEnabled=true;
 UPROPERTY(EditAnywhere,Category="Interaction") float ReachCm=190.f;
 UPROPERTY(EditAnywhere,Category="Interaction") float HoldDistanceCm=65.f;
 UPROPERTY(EditAnywhere,Category="Interaction") float GazeSeconds=.3f;
 UPROPERTY(EditAnywhere,Category="Interaction") TMap<FName,TObjectPtr<USoundBase>> ContactSounds;
 UPROPERTY(BlueprintAssignable) FWordQuestSurfaceContact OnSurfaceContact;
private:
 UPROPERTY(Transient) TObjectPtr<UPhysicsHandleComponent> Handle;
 UPROPERTY(Transient) TObjectPtr<UMaterialInterface> HintMaterial;
 UPROPERTY(Transient) TArray<TObjectPtr<UPrimitiveComponent>> Bodies;
 UPROPERTY(Transient) TArray<TObjectPtr<UBoxComponent>> RoomFloorColliders;
 UPROPERTY(Transient) TMap<TObjectPtr<AActor>,TObjectPtr<UPhysicsConstraintComponent>> Constraints;
 UPROPERTY(Transient) TMap<FName,TObjectPtr<UPhysicalMaterial>> PhysicalMaterials;
 TWeakObjectPtr<AActor> Focused;
 TWeakObjectPtr<UPrimitiveComponent> Held;
 TMap<TWeakObjectPtr<AActor>,FTransform> SpawnTransforms;
 TMap<TWeakObjectPtr<AActor>,double> LastContactTimes;
 TSet<TWeakObjectPtr<AActor>> OpenConstraints;
 FRotator InspectOffset=FRotator::ZeroRotator;
 float GazeClock=0.f,TouchClock=0.f,TouchUpSpeed=0.f;
 bool bTouchDown=false,bTouchHandled=false,bTouchHolding=false,bInspecting=false,bTwoTouches=false,bProbeFocusLock=false;
 FVector2D TouchStart=FVector2D::ZeroVector,LastTouch=FVector2D::ZeroVector,LastTouchCentre=FVector2D::ZeroVector;
 FString Gate=TEXT("waiting");
 int32 GrabCount=0,DropCount=0,ThrowCount=0,PushCount=0,ConstraintCount=0,ContactEvents=0;
 FName LastContactMaterial=TEXT("none");
 void PrepareBody(AActor* Actor);
 UPrimitiveComponent* BodyFor(AActor* Actor) const;
 void ClearFocus();
 bool IsAvailable() const;
 void Contact(FName Material,const FVector& Position,float Impulse);
 UFUNCTION() void Hit(UPrimitiveComponent* Component,AActor* Other,UPrimitiveComponent* OtherComponent,FVector NormalImpulse,const FHitResult& Result);
};
