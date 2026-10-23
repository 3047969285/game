#pragma once
#include "WordQuestCharacter.h"
#include "WordQuestAnimationPreview.generated.h"
class UAnimSequence;
class USkeletalMesh;

/** Offline archetype animation preview; never represents an auto-rigged identity. */
UCLASS(Blueprintable)
class WORDQUESTUE_API AWordQuestAnimationPreview : public AWordQuestCharacter
{
    GENERATED_BODY()
public:
    AWordQuestAnimationPreview();
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Animation Preview") TObjectPtr<USkeletalMesh> PreviewMesh;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Animation Preview") TObjectPtr<UAnimSequence> Idle;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Animation Preview") TObjectPtr<UAnimSequence> Walk;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Animation Preview") TObjectPtr<UAnimSequence> Sit;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Animation Preview") bool bCycleInEditor = true;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Animation Preview") bool bSeated = false;
    UFUNCTION(BlueprintCallable, Category="Animation Preview") TMap<FName,FTransform> EvaluatePreview(FName State, float Seconds);
    virtual void OnConstruction(const FTransform& Transform) override;
    virtual void Tick(float DeltaSeconds) override;
    virtual bool ShouldTickIfViewportsOnly() const override { return true; }
private:
    float PreviewTime = 0;
};
