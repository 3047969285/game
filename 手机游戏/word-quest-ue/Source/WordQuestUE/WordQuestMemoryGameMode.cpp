#include "WordQuestMemoryGameMode.h"
#include "WordQuestHUD.h"
#include "WordQuestMemoryDirector.h"
#include "WordQuestMemoryNavigation.h"
#include "GameFramework/HUD.h"
#include "GameFramework/SpectatorPawn.h"
#include "GameFramework/PlayerController.h"

AWordQuestMemoryGameMode::AWordQuestMemoryGameMode()
{
	DefaultPawnClass = ASpectatorPawn::StaticClass();
	PlayerControllerClass = APlayerController::StaticClass();
	HUDClass = AHUD::StaticClass();
	MemoryDirector = CreateDefaultSubobject<UWordQuestMemoryDirector>(TEXT("MemoryDirector"));
	MemoryNavigation = CreateDefaultSubobject<UWordQuestMemoryNavigation>(TEXT("MemoryNavigation"));
}
