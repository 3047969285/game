#pragma once

#include "CoreMinimal.h"
#include "GameFramework/HUD.h"
#include "WordQuestData.h"
#include "WordQuestHUD.generated.h"

UCLASS()
class WORDQUESTUE_API AWordQuestHUD : public AHUD
{
	GENERATED_BODY()

public:
	virtual void BeginPlay() override;
	virtual void DrawHUD() override;

	void Answer(int32 OptionIndex);
	void Next();
	void SwitchUnit(int32 NewUnitIndex);

private:
	void LoadRw3();
	void BuildQuestion();
	FString UnitTitle() const;

	TArray<FWordEntry> AllWords;
	TArray<FWordEntry> Words;
	TArray<FString> Options;
	int32 CorrectOption = 0;
	int32 WordIndex = 0;
	int32 Score = 0;
	int32 Streak = 0;
	int32 BestStreak = 0;
	int32 Chosen = -1;
	bool bAnswered = false;
	int32 UnitIndex = 0;
	FRandomStream Rng;
};
