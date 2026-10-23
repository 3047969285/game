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

	/** 回忆舞台模式：只画英文字幕/极简角标，不画学习面板 */
	bool IsMemoryMode() const { return bMemoryMode; }
	void LoadMemoryScene(const FString& SceneId);

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

	// ── 回忆 HUD（U1A 垂直切片） ──
	bool bMemoryMode = false;
	struct FMemoryLine
	{
		FString En;
		FString Zh;
		float Start = 0.f;
		float End = 0.f;
	};
	TArray<FMemoryLine> MemoryLines;
	float MemoryClock = 0.f;
	int32 MemoryIndex = 0;
	void DrawMemoryHUD(float CanvasW, float CanvasH, UFont* BodyFont, UFont* SmallFont);
	void DrawWrappedLine(const FString& Line, float CenterX, float TopY, float MaxWidth, UFont* Font, const FLinearColor& Color);
	void DrawWordInteraction(float CanvasW, float CanvasH, UFont* BodyFont, UFont* SmallFont);

	struct FMemoryWord
	{
		FString Word;
		FString Phonetic;
		FString Example;
		FString Meaning;
	};
	TMap<FString, FMemoryWord> MemoryWords;
	TSet<FString> TouchedWords;
	FString FocusWordId;
	void LoadMemoryWords();
};
