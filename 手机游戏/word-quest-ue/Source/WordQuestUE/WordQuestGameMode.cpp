#include "WordQuestGameMode.h"
#include "WordQuestCharacter.h"
#include "WordQuestHUD.h"

AWordQuestGameMode::AWordQuestGameMode()
{
	DefaultPawnClass = AWordQuestCharacter::StaticClass();
	HUDClass = AWordQuestHUD::StaticClass();
}
