#include "WordQuestMemoryGameMode.h"
#include "WordQuestHUD.h"
#include "WordQuestMemoryDirector.h"
#include "WordQuestMemoryNavigation.h"
#include "WordQuestFirstPersonCharacter.h"
#include "WordQuestWorldInteraction.h"
#include "WordQuestNpcDirector.h"
#include "GameFramework/HUD.h"
#include "GameFramework/SpectatorPawn.h"
#include "GameFramework/PlayerController.h"

AWordQuestMemoryGameMode::AWordQuestMemoryGameMode()
{
	DefaultPawnClass = AWordQuestFirstPersonCharacter::StaticClass();
	PlayerControllerClass = APlayerController::StaticClass();
	HUDClass = AHUD::StaticClass();
	MemoryDirector = CreateDefaultSubobject<UWordQuestMemoryDirector>(TEXT("MemoryDirector"));
	MemoryNavigation = CreateDefaultSubobject<UWordQuestMemoryNavigation>(TEXT("MemoryNavigation"));
	WorldInteraction = CreateDefaultSubobject<UWordQuestWorldInteraction>(TEXT("WorldInteraction"));
	NpcDirector = CreateDefaultSubobject<UWordQuestNpcDirector>(TEXT("NpcDirector"));
}
