#pragma once
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "Blueprint/UserWidget.h"
#include "WordQuestOpeningFlow.generated.h"

class ACameraActor;
class UTextBlock;

UCLASS()
class WORDQUESTUE_API UWordQuestOpeningTextWidget : public UUserWidget
{
 GENERATED_BODY()
public:
 void SetLine(const FString& Value, bool bOption);
private:
 UPROPERTY() TObjectPtr<UTextBlock> Label;
};
class APlayerController;
class FJsonObject;

UCLASS(ClassGroup=(WordQuest), meta=(BlueprintSpawnableComponent))
class WORDQUESTUE_API UWordQuestOpeningFlow : public UActorComponent
{
 GENERATED_BODY()
public:
 UWordQuestOpeningFlow();
 virtual void BeginPlay() override;
 virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;
 virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;
 UFUNCTION(BlueprintPure) FString GetOpeningState() const;
 UFUNCTION(BlueprintCallable) void AdvanceOpening();
 UFUNCTION(BlueprintCallable) void ConfirmRecall();
 UFUNCTION(BlueprintCallable) void WaitBeforeRecall();
 UFUNCTION(BlueprintCallable) void SkipOpening();
private:
 FString Phase = TEXT("inactive");
 FString Error;
 int32 Line = 0;
 int32 Choice = 0;
 float Elapsed = 0;
 bool bTouchWasDown = false;
 TArray<TSharedPtr<FJsonObject>> Lines;
 UPROPERTY() TObjectPtr<ACameraActor> Camera;
 UPROPERTY() TObjectPtr<APlayerController> Controller;
 UPROPERTY() TObjectPtr<AActor> PreviousView;
 UPROPERTY() TArray<TObjectPtr<AActor>> Texts;
 FVector Anchor = FVector::ZeroVector;
 FTransform CameraStart;
 bool LoadScript();
 void ShowLine();
 void SetText(int32 Index, const FString& Value, const FVector& Position);
 void BeginRecall();
 void Fail(const FString& Reason);
 void SelectAt(float X, float Y);
};
