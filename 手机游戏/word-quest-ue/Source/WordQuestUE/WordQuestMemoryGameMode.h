#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "WordQuestMemoryGameMode.generated.h"

/** 回忆舞台用：人眼第一人称，世界空间交互。 */
UCLASS()
class WORDQUESTUE_API AWordQuestMemoryGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	UPROPERTY(VisibleAnywhere) TObjectPtr<class UWordQuestMemoryDirector> MemoryDirector;
	UPROPERTY(VisibleAnywhere) TObjectPtr<class UWordQuestMemoryNavigation> MemoryNavigation;
	UPROPERTY(VisibleAnywhere) TObjectPtr<class UWordQuestWorldInteraction> WorldInteraction;
	UPROPERTY(VisibleAnywhere) TObjectPtr<class UWordQuestNpcDirector> NpcDirector;
	AWordQuestMemoryGameMode();
};
