#pragma once
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "WordQuestMemoryNavigation.generated.h"

/** Moves the runtime memory view, leaving authored shot actors untouched. */
UCLASS(ClassGroup=(WordQuest), meta=(BlueprintSpawnableComponent))
class WORDQUESTUE_API UWordQuestMemoryNavigation : public UActorComponent
{
 GENERATED_BODY()
public:
 UWordQuestMemoryNavigation();
 virtual void TickComponent(float DeltaTime,ELevelTick TickType,FActorComponentTickFunction* Fn) override;
 UFUNCTION(BlueprintPure) FString GetNavigationState() const;
 UPROPERTY(EditAnywhere,BlueprintReadWrite,Category="Navigation") bool bEnabled=true;
 UPROPERTY(EditAnywhere,Category="Navigation") float WalkSpeed=280.f;
private:
 TWeakObjectPtr<AActor> ActiveView;
 TArray<TWeakObjectPtr<AActor>> NonSolidEnvironment;
 FVector Velocity=FVector::ZeroVector;
 FRotator DesiredRotation=FRotator::ZeroRotator,LastAppliedRotation=FRotator::ZeroRotator;
 FVector2D TouchOrigin=FVector2D::ZeroVector,LastTouch=FVector2D::ZeroVector;
 bool bTouchDown=false,bTouchLooking=false,bBlocked=false,bNavigating=false;
 float EyeAboveFloor=160.f;
 int32 ViewChanges=0,CollisionCount=0;
 FString Gate=TEXT("waiting");
 FString LastHit;
};
