#pragma once
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "Blueprint/UserWidget.h"
#include "WordQuestNpcDirector.generated.h"

class UWordQuestNpcDialogueClient;
class UWidgetComponent;
class UTextBlock;
class UEditableTextBox;
class UWidgetInteractionComponent;
class UWordQuestNpcDirector;

UCLASS()
class WORDQUESTUE_API UWordQuestNpcWorldWidget : public UUserWidget
{
 GENERATED_BODY()
public:
 void Setup(UWordQuestNpcDirector* InHost);
 void SetDialogue(const FString& Name,const FString& Text,const TArray<FString>& Suggestions);
 void FocusEntry();
 bool IsEditingText() const;
 void SetChoiceFocus(int32 Index);
private:
 UFUNCTION() void Commit(const FText& Text,ETextCommit::Type Method);
 UFUNCTION() void Reply0();
 UFUNCTION() void Reply1();
 UFUNCTION() void Reply2();
 UPROPERTY() TObjectPtr<UWordQuestNpcDirector> Host;
 UPROPERTY() TObjectPtr<UTextBlock> Heading;
 UPROPERTY() TObjectPtr<UTextBlock> Speech;
 UPROPERTY() TObjectPtr<UEditableTextBox> Entry;
 UPROPERTY() TArray<TObjectPtr<UTextBlock>> ReplyLabels;
};

/** Thin world-space conversation coordinator. Authored character meshes stay untouched. */
UCLASS(ClassGroup=(WordQuest),meta=(BlueprintSpawnableComponent))
class WORDQUESTUE_API UWordQuestNpcDirector : public UActorComponent
{
 GENERATED_BODY()
public:
 UWordQuestNpcDirector();
 virtual void BeginPlay()override;
 virtual void EndPlay(const EEndPlayReason::Type Reason)override;
 virtual void TickComponent(float Dt,ELevelTick Type,FActorComponentTickFunction* Fn)override;
 UFUNCTION(BlueprintCallable) bool SubmitToNpc(const FString& Role,const FString& Text);
 UFUNCTION(BlueprintCallable) bool SelectSuggestion(int32 Index);
 UFUNCTION(BlueprintCallable) void CloseDialogue();
 UFUNCTION(BlueprintPure) bool IsInputActive()const{return bConversationInputActive;}
 UFUNCTION(BlueprintPure) FString GetNpcState()const;
 UPROPERTY(BlueprintReadOnly) bool bConversationInputActive=false;
 UPROPERTY(BlueprintReadOnly) float LookAtYaw=0,LookAtPitch=0;
private:
 UFUNCTION() void StreamText(FString Role,FString Text);
 UFUNCTION() void StreamFinished(FString Role,FString Status);
 bool Open(AActor* Actor,const FString& Role,const FString& Scene);
 void RefreshWidget();
 void QueueSpeech(const FString& Text,bool bFinal);
 FVector HeadLocation(AActor* Actor)const;
 UPROPERTY() TMap<FString,TObjectPtr<UWordQuestNpcDialogueClient>> Clients;
 UPROPERTY() TObjectPtr<AActor> SurfaceActor;
 UPROPERTY() TObjectPtr<UWidgetComponent> Surface;
 UPROPERTY() TObjectPtr<UWordQuestNpcWorldWidget> Widget;
 UPROPERTY() TObjectPtr<UWidgetInteractionComponent> Pointer;
 TWeakObjectPtr<AActor> Target,Candidate;
 FString ActiveRole,ActiveScene,State=TEXT("waiting");
 TArray<FString> SpeechQueue;
 FString LastSpokenPrefix;
 int32 FocusedSuggestion=0;
 FVector2D PointerOrigin=FVector2D::ZeroVector;
 float GazeSeconds=0,Cooldown=0,DiscoveryClock=0;
 bool bPointerDown=false;
 FName SpeechChannel;
 TArray<TWeakObjectPtr<AActor>> Actors;
};
