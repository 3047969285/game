#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "WordQuestGameMode.generated.h"

UCLASS()
class WORDQUESTUE_API AWordQuestGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	AWordQuestGameMode();
	virtual void InitGame(const FString& MapName,const FString& Options,FString& ErrorMessage) override;
private:
	UPROPERTY() TObjectPtr<class UWordQuestOpeningFlow> OpeningFlow;
};
