#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "WordQuestMemoryGameMode.generated.h"

/** 回忆舞台用：无第三人称身体、只保留极简 HUD 与自由视角。 */
UCLASS()
class WORDQUESTUE_API AWordQuestMemoryGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	UPROPERTY(VisibleAnywhere) TObjectPtr<class UWordQuestMemoryDirector> MemoryDirector;
	UPROPERTY(VisibleAnywhere) TObjectPtr<class UWordQuestMemoryNavigation> MemoryNavigation;
	AWordQuestMemoryGameMode();
};
