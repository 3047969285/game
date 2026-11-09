#include "WordQuestGameMode.h"
#include "WordQuestCharacter.h"
#include "WordQuestHUD.h"
#include "WordQuestOpeningFlow.h"
#include "WordQuestFirstPersonCharacter.h"
#include "WordQuestMemoryNavigation.h"
#include "GameFramework/HUD.h"

AWordQuestGameMode::AWordQuestGameMode()
{
	DefaultPawnClass = AWordQuestCharacter::StaticClass();
	HUDClass = AWordQuestHUD::StaticClass();
	OpeningFlow = CreateDefaultSubobject<UWordQuestOpeningFlow>(TEXT("OpeningFlow"));
}

void AWordQuestGameMode::InitGame(const FString& MapName,const FString& Options,FString& ErrorMessage)
{
 if(MapName.Contains(TEXT("L_Opening2090"))) { HUDClass=AHUD::StaticClass(); DefaultPawnClass=nullptr; }
 const bool bCampus=MapName.Contains(TEXT("L_YTU_Campus"));
 if(bCampus) { HUDClass=AHUD::StaticClass(); DefaultPawnClass=AWordQuestFirstPersonCharacter::StaticClass(); }
 Super::InitGame(MapName,Options,ErrorMessage);
 if(bCampus)
 {
  auto* Navigation=NewObject<UWordQuestMemoryNavigation>(this,TEXT("CampusNavigation"));
  AddInstanceComponent(Navigation);Navigation->RegisterComponent();
 }
}
