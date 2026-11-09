#pragma once
#include "CoreMinimal.h"
#include "UObject/Object.h"
#include "TimerManager.h"
#include "Interfaces/IHttpRequest.h"
#include "WordQuestNpcProtocol.h"
#include "WordQuestNpcDialogueClient.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FWordQuestNpcText,FString,Role,FString,Text);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FWordQuestNpcFinished,FString,Role,FString,Status);

/** Developer client: credentials never enter reflected properties, prompts, reports or saves. */
UCLASS(BlueprintType)
class WORDQUESTUE_API UWordQuestNpcDialogueClient : public UObject
{
 GENERATED_BODY()
public:
 UFUNCTION(BlueprintCallable) bool Configure(const FString& InRole,const FString& InScene);
 UFUNCTION(BlueprintCallable) bool Submit(const FString& PlayerText);
 UFUNCTION(BlueprintCallable) void Cancel();
 UFUNCTION(BlueprintCallable) bool RememberFact(const FString& Fact);
 UFUNCTION(BlueprintPure) FString GetState()const;
 UFUNCTION(BlueprintPure) TArray<FString> GetSuggestions()const{return Suggestions;}
 UFUNCTION(BlueprintPure) FString GetDisplayName()const{return DisplayName;}
 UFUNCTION(BlueprintPure) FString GetVisibleText()const{return VisibleText;}
 UFUNCTION(BlueprintPure) bool IsBusy()const{return bBusy;}
 UPROPERTY(BlueprintAssignable) FWordQuestNpcText OnText;
 UPROPERTY(BlueprintAssignable) FWordQuestNpcFinished OnFinished;
 virtual void BeginDestroy()override;
 virtual UWorld* GetWorld()const override;
private:
 bool StartRequest(bool Repair);
 void Receive(const TArray<uint8>& Data,uint64 Ticket);
 void Complete(bool bSuccess,int32 HttpCode,uint64 Ticket);
 void Fallback(const FString& Code);
 void Publish();
 void SaveMemory();
 void SettleBudget();
 FString Safe(const FString& Value)const;
 FString Role,Scene,DisplayName,SystemPrompt,State=TEXT("unconfigured"),VisibleText,PlayerTurn;
 FString Secret,RepairReply;
 TArray<FString> TargetWords,TurnFocus;
 TArray<FString> FallbackLines,Suggestions;
 TArray<TPair<FString,FString>> History;
 FWordQuestNpcSseDecoder Decoder;
 TSharedPtr<IHttpRequest,ESPMode::ThreadSafe> Request;
 FTimerHandle Deadline;
 uint64 Generation=0;
 double Started=0,FirstTokenMs=-1,FirstVisibleMs=-1;
 int32 LastTokens=0,ReservedTokens=0,HistoryRounds=6,FallbackIndex=0,RetryCount=0,TurnIndex=0;
 bool bBusy=false,bConfigured=false,bUsageKnown=false;
};
