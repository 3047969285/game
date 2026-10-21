#include "WordQuestHUD.h"
#include "Engine/Canvas.h"
#include "Engine/Engine.h"
#include "Engine/Font.h"

void AWordQuestHUD::BeginPlay()
{
	Super::BeginPlay();
	Rng.Initialize(2026);
	LoadRw3();
}

void AWordQuestHUD::LoadRw3()
{
	AllWords.Reset();
	UWordQuestData::LoadCourse(TEXT("college_english_rw3"), AllWords);
	SwitchUnit(0);
}

void AWordQuestHUD::SwitchUnit(int32 NewUnitIndex)
{
	UnitIndex = FMath::Clamp(NewUnitIndex, 0, 5);
	Words.Reset();
	const FString Prefix = FString::Printf(TEXT("unit%02d"), UnitIndex + 1);
	for (const FWordEntry& E : AllWords)
	{
		if (E.UnitId.IsEmpty() || E.UnitId.StartsWith(Prefix))
		{
			Words.Add(E);
		}
	}
	if (Words.Num() == 0)
	{
		Words = AllWords;
	}
	WordIndex = 0;
	Score = 0;
	Streak = 0;
	BestStreak = 0;
	Chosen = -1;
	bAnswered = false;
	BuildQuestion();
}

FString AWordQuestHUD::UnitTitle() const
{
	if (AllWords.Num() == 0)
	{
		return TEXT("词库加载中…");
	}
	for (const FWordEntry& E : AllWords)
	{
		if (E.UnitId == FString::Printf(TEXT("unit%02d"), UnitIndex + 1) && !E.UnitTitle.IsEmpty())
		{
			return E.UnitTitle;
		}
	}
	return FString::Printf(TEXT("Unit %d"), UnitIndex + 1);
}

void AWordQuestHUD::BuildQuestion()
{
	Options.Reset();
	Chosen = -1;
	bAnswered = false;
	if (Words.Num() == 0)
	{
		return;
	}
	WordIndex = WordIndex % Words.Num();
	const FWordEntry& W = Words[WordIndex];
	TArray<FString> Empty;
	const FString Correct = W.BestMeaning(Empty, Rng);
	Options.Add(Correct);
	int32 Guard = 0;
	while (Options.Num() < 4 && Guard++ < 300)
	{
		const int32 Other = Rng.RandRange(0, Words.Num() - 1);
		if (Other == WordIndex)
		{
			continue;
		}
		const FString D = Words[Other].Meaning.Len() > 0 ? Words[Other].Meaning : TEXT("—");
		if (!Options.Contains(D))
		{
			Options.Add(D);
		}
	}
	while (Options.Num() < 4)
	{
		Options.Add(TEXT("—"));
	}
	for (int32 i = Options.Num() - 1; i > 0; --i)
	{
		const int32 j = Rng.RandRange(0, i);
		Options.Swap(i, j);
	}
	CorrectOption = Options.IndexOfByKey(Correct);
}

void AWordQuestHUD::Answer(int32 OptionIndex)
{
	if (bAnswered || !Words.IsValidIndex(WordIndex) || !Options.IsValidIndex(OptionIndex))
	{
		return;
	}
	bAnswered = true;
	Chosen = OptionIndex;
	if (OptionIndex == CorrectOption)
	{
		Score += 10 + Streak * 2;
		++Streak;
		BestStreak = FMath::Max(BestStreak, Streak);
	}
	else
	{
		Streak = 0;
	}
}

void AWordQuestHUD::Next()
{
	if (!bAnswered)
	{
		Answer(CorrectOption);
		return;
	}
	++WordIndex;
	BuildQuestion();
}

void AWordQuestHUD::DrawHUD()
{
	Super::DrawHUD();
	if (!Canvas)
	{
		return;
	}
	const float CanvasW = Canvas->SizeX;
	const float CanvasH = Canvas->SizeY;
	UFont* TitleFont = GEngine ? GEngine->GetLargeFont() : nullptr;
	UFont* BodyFont = GEngine ? GEngine->GetMediumFont() : nullptr;
	UFont* SmallFont = GEngine ? GEngine->GetSmallFont() : nullptr;

	DrawRect(FLinearColor(0.015f, 0.025f, 0.05f, 0.92f), 46.f, 40.f, CanvasW - 92.f, CanvasH - 80.f);
	DrawRect(FLinearColor(0.10f, 0.45f, 0.90f, 0.95f), 46.f, 40.f, CanvasW - 92.f, 4.f);

	DrawText(TEXT("大学英语读写3 · 词场学习 UE5"), FLinearColor(0.85f, 0.92f, 1.f, 1.f), 78.f, 62.f, TitleFont, 1.1f);
	DrawText(FString::Printf(TEXT("Unit %d  %s"), UnitIndex + 1, *UnitTitle()), FLinearColor(0.45f, 0.85f, 1.f, 1.f), 80.f, 116.f, BodyFont, 1.0f);

	const FString ScoreLine = FString::Printf(TEXT("得分 %d    连对 %d    最高连对 %d    本单元进度 %d/%d"),
		Score, Streak, BestStreak, Words.Num() > 0 ? WordIndex + 1 : 0, Words.Num());
	DrawText(ScoreLine, FLinearColor(0.75f, 0.78f, 0.85f, 1.f), 80.f, 152.f, BodyFont, 1.0f);
	DrawText(TEXT("F1–F6 切换单元"), FLinearColor(0.5f, 0.55f, 0.65f, 1.f), CanvasW - 260.f, 116.f, SmallFont, 1.0f);

	if (!Words.IsValidIndex(WordIndex))
	{
		DrawText(TEXT("词库加载失败：检查 Content/Data/vocabulary/college_english_rw3.json"),
			FLinearColor(1.f, 0.6f, 0.4f, 1.f), 80.f, 220.f, BodyFont);
		return;
	}

	const FWordEntry& W = Words[WordIndex];
	float Y = 232.f;
	DrawText(W.Word, FLinearColor(1.f, 1.f, 1.f, 1.f), 80.f, Y, TitleFont, 2.2f);
	Y += 88.f;
	if (W.Phonetic.Len() > 0)
	{
		DrawText(W.Phonetic, FLinearColor(0.65f, 0.7f, 0.8f, 1.f), 84.f, Y, BodyFont, 1.1f);
		Y += 38.f;
	}
	if (W.Pos.Len() > 0)
	{
		DrawText(W.Pos, FLinearColor(0.55f, 0.9f, 0.65f, 1.f), 84.f, Y, BodyFont, 1.0f);
	}
	Y += 58.f;

	DrawText(TEXT("选择正确中文释义："), FLinearColor(0.8f, 0.82f, 0.9f, 1.f), 80.f, Y, BodyFont, 1.05f);
	Y += 42.f;
	for (int32 i = 0; i < Options.Num(); ++i)
	{
		const bool bCorrect = bAnswered && i == CorrectOption;
		const bool bWrongPick = bAnswered && i == Chosen && i != CorrectOption;
		FLinearColor C(0.86f, 0.9f, 1.f, 1.f);
		if (bCorrect) C = FLinearColor(0.35f, 1.f, 0.5f, 1.f);
		else if (bWrongPick) C = FLinearColor(1.f, 0.35f, 0.35f, 1.f);
		else if (bAnswered) C = FLinearColor(0.55f, 0.58f, 0.65f, 1.f);
		DrawText(FString::Printf(TEXT("%d)  %s"), i + 1, *Options[i]), C, 100.f, Y, BodyFont, 1.1f);
		Y += 44.f;
	}

	if (bAnswered && W.Example.Len() > 0)
	{
		Y += 4.f;
		DrawText(W.Example, FLinearColor(0.7f, 0.72f, 0.8f, 1.f), 84.f, Y, SmallFont, 1.0f);
	}

	const FString Hint = bAnswered
		? TEXT("Enter 下一题    1-4 继续作答    F1–F6 切换单元")
		: TEXT("1-4 选择答案    Enter 显示答案    F1–F6 切换单元");
	DrawText(Hint, FLinearColor(0.55f, 0.6f, 0.7f, 1.f), 80.f, CanvasH - 104.f, SmallFont, 1.0f);
	DrawText(TEXT("WASD 移动 · 鼠标环顾 · 第三人称探索 Unit 场景"), FLinearColor(0.45f, 0.5f, 0.6f, 1.f), 80.f, CanvasH - 78.f, SmallFont, 1.0f);
}
