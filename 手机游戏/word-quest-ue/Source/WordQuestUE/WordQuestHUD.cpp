#include "WordQuestHUD.h"
#include "Engine/Canvas.h"
#include "Engine/Engine.h"
#include "Engine/Font.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "Dom/JsonObject.h"
#include "Engine/World.h"
#include "GameFramework/Pawn.h"
#include "GameFramework/PlayerController.h"
#include "Engine/EngineTypes.h"
#include "InputCoreTypes.h"

void AWordQuestHUD::BeginPlay()
{
	Super::BeginPlay();
	Rng.Initialize(2026);
	const FString MapName = GetWorld() ? GetWorld()->GetMapName() : FString();
	UE_LOG(LogTemp, Warning, TEXT("[memory-hud] begin map=%s"), *MapName);
	if (MapName.Contains(TEXT("Unit01")))
	{
		LoadMemoryScene(TEXT("unit01_section_a"));
	}
	if (!bMemoryMode)
	{
		LoadRw3();
	}
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

	if (bMemoryMode)
	{
		MemoryClock += GetWorld() ? GetWorld()->GetDeltaSeconds() : 0.f;
		DrawMemoryHUD(CanvasW, CanvasH, BodyFont, SmallFont);
		DrawWordInteraction(CanvasW, CanvasH, BodyFont, SmallFont);
		return;
	}

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

// ───────── 回忆 HUD：英文字幕 + 极简角标（数据来自 Content/Data/Memory/scenes.json） ─────────

void AWordQuestHUD::LoadMemoryScene(const FString& SceneId)
{
	const FString Path = FPaths::Combine(FPaths::ProjectContentDir(), TEXT("Data/Memory/scenes.json"));
	FString Raw;
	if (!FFileHelper::LoadFileToString(Raw, *Path)) { return; }
	TSharedPtr<FJsonObject> Root;
	const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(Raw);
	if (!FJsonSerializer::Deserialize(Reader, Root) || !Root.IsValid()) { return; }
	const TArray<TSharedPtr<FJsonValue>>* Scenes = nullptr;
	if (!Root->TryGetArrayField(TEXT("scenes"), Scenes)) return;
	TSharedPtr<FJsonObject> SceneObj;
	for (const auto& V : *Scenes)
	{
		const TSharedPtr<FJsonObject> Obj = V->AsObject();
		if (Obj.IsValid() && Obj->GetStringField(TEXT("sceneId")) == SceneId) { SceneObj = Obj; break; }
	}
	if (!SceneObj.IsValid()) return;
	const TSharedPtr<FJsonObject> Script = SceneObj->GetObjectField(TEXT("script"));
	if (!Script.IsValid()) return;

	float Cursor = 0.4f;
	auto Push = [&](const FString& En, const FString& Zh)
	{
		if (En.IsEmpty()) return;
		FMemoryLine L;
		L.En = En; L.Zh = Zh; L.Start = Cursor;
		TArray<FString> WordTokens;
		En.ParseIntoArrayWS(WordTokens);
		L.End = Cursor + FMath::Clamp(1.4f + WordTokens.Num() * 0.33f, 2.2f, 8.f);
		Cursor = L.End + 0.25f;
		MemoryLines.Add(L);
	};

	const TArray<TSharedPtr<FJsonValue>>* Beats = nullptr;
	if (Script->TryGetArrayField(TEXT("beats"), Beats))
	{
		for (const auto& BV : *Beats)
		{
			const TSharedPtr<FJsonObject> B = BV->AsObject();
			if (!B.IsValid()) continue;
			const FString Kind = B->GetStringField(TEXT("kind"));
			if (Kind == TEXT("acts")) break;
			if (Kind == TEXT("narrate") || Kind == TEXT("gap")) Push(B->GetStringField(TEXT("text")), B->GetStringField(TEXT("zh")));
		}
	}
	const TArray<TSharedPtr<FJsonValue>>* Acts = nullptr;
	if (Script->TryGetArrayField(TEXT("acts"), Acts))
	{
		for (const auto& AV : *Acts)
		{
			const TSharedPtr<FJsonObject> A = AV->AsObject();
			if (!A.IsValid()) continue;
			const TArray<TSharedPtr<FJsonValue>>* Sentences = nullptr;
			A->TryGetArrayField(TEXT("sentences"), Sentences);
			const TArray<TSharedPtr<FJsonValue>>* Cues = nullptr;
			A->TryGetArrayField(TEXT("cues"), Cues);
			if (!Sentences) continue;
			for (int32 i = 0; i < Sentences->Num(); ++i)
			{
				FString Zh;
				if (Cues && Cues->IsValidIndex(i))
				{
					const TSharedPtr<FJsonObject> C = (*Cues)[i]->AsObject();
					if (C.IsValid()) Zh = C->GetStringField(TEXT("zh"));
				}
				Push((*Sentences)[i]->AsString(), Zh);
			}
		}
	}
	bMemoryMode = MemoryLines.Num() > 0;
	MemoryClock = 0.f; MemoryIndex = 0;
	LoadMemoryWords();
	UE_LOG(LogTemp, Warning, TEXT("[memory-hud] loaded %d lines / %d words from %s"), MemoryLines.Num(), MemoryWords.Num(), *SceneId);
}

void AWordQuestHUD::DrawMemoryHUD(float CanvasW, float CanvasH, UFont* BodyFont, UFont* SmallFont)
{
	DrawRect(FLinearColor(0.f, 0.f, 0.f, 0.42f), 0.f, 0.f, CanvasW, CanvasH * 0.06f);
	DrawRect(FLinearColor(0.f, 0.f, 0.f, 0.42f), 0.f, CanvasH * 0.94f, CanvasW, CanvasH * 0.06f);
	DrawText(TEXT("MEMORY"), FLinearColor(0.75f, 0.9f, 1.f, 0.22f), 22.f, 18.f, SmallFont, 1.f);
	while (MemoryIndex + 1 < MemoryLines.Num() && MemoryClock >= MemoryLines[MemoryIndex].End) ++MemoryIndex;
	if (MemoryLines.IsValidIndex(MemoryIndex))
	{
		const FMemoryLine& L = MemoryLines[MemoryIndex];
		DrawWrappedLine(L.En, CanvasW * 0.5f, CanvasH * 0.80f, CanvasW * 0.78f, BodyFont, FLinearColor(0.96f, 0.97f, 1.f, 0.92f));
		if (!L.Zh.IsEmpty()) DrawText(L.Zh, FLinearColor(0.8f, 0.86f, 0.95f, 0.32f), 24.f, CanvasH * 0.80f + 36.f, SmallFont, 0.9f);
		DrawText(FString::Printf(TEXT("%d / %d"), MemoryIndex + 1, MemoryLines.Num()), FLinearColor(0.8f, 0.9f, 1.f, 0.22f), CanvasW - 80.f, CanvasH * 0.94f + 6.f, SmallFont, 1.f);
	}
}

void AWordQuestHUD::DrawWrappedLine(const FString& Line, float CenterX, float TopY, float MaxWidth, UFont* Font, const FLinearColor& Color)
{
	TArray<FString> Parts; Line.ParseIntoArrayWS(Parts);
	TArray<FString> Lines; FString Current;
	for (const FString& W : Parts)
	{
		const FString Next = Current.IsEmpty() ? W : Current + TEXT(" ") + W;
		float Wx = 0.f, Wy = 0.f; GetTextSize(Next, Wx, Wy, Font, 1.0f);
		if (Wx > MaxWidth && !Current.IsEmpty()) { Lines.Add(Current); Current = W; }
		else Current = Next;
	}
	if (!Current.IsEmpty()) Lines.Add(Current);
	float Y = TopY - (Lines.Num() - 1) * 16.f;
	for (const FString& L : Lines)
	{
		float Wx = 0.f, Wy = 0.f; GetTextSize(L, Wx, Wy, Font, 1.0f);
		DrawText(L, Color, CenterX - Wx * 0.5f, Y, Font, 1.0f);
		Y += 30.f;
	}
}

// ───────── 词物件交互：视线命中 word_* actor → 英文优先词卡 ─────────

void AWordQuestHUD::LoadMemoryWords()
{
	const FString Path = FPaths::Combine(FPaths::ProjectContentDir(), TEXT("Data/vocabulary/college_english_rw3.json"));
	FString Raw;
	if (!FFileHelper::LoadFileToString(Raw, *Path)) return;
	TSharedPtr<FJsonObject> Root;
	const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(Raw);
	if (!FJsonSerializer::Deserialize(Reader, Root) || !Root.IsValid()) return;
	const TArray<TSharedPtr<FJsonValue>>* WordsArray = nullptr;
	if (!Root->TryGetArrayField(TEXT("words"), WordsArray)) return;
	for (const auto& V : *WordsArray)
	{
		const TSharedPtr<FJsonObject> W = V->AsObject();
		if (!W.IsValid()) continue;
		FString Id;
		if (!W->TryGetStringField(TEXT("id"), Id)) continue;
		FMemoryWord Entry;
		W->TryGetStringField(TEXT("word"), Entry.Word);
		W->TryGetStringField(TEXT("phonetic"), Entry.Phonetic);
		W->TryGetStringField(TEXT("example"), Entry.Example);
		W->TryGetStringField(TEXT("meaning"), Entry.Meaning);
		MemoryWords.Add(Id, Entry);
	}
}

void AWordQuestHUD::DrawWordInteraction(float CanvasW, float CanvasH, UFont* BodyFont, UFont* SmallFont)
{
	FocusWordId.Reset();
	if (!PlayerOwner) return;
	FVector ViewLoc; FRotator ViewRot;
	PlayerOwner->GetPlayerViewPoint(ViewLoc, ViewRot);
	FHitResult Hit;
	FCollisionQueryParams Params(SCENE_QUERY_STAT(MemoryWordTrace), false);
	if (APawn* Pawn = PlayerOwner->GetPawn()) Params.AddIgnoredActor(Pawn);
	if (GetWorld()->LineTraceSingleByChannel(Hit, ViewLoc, ViewLoc + ViewRot.Vector() * 600.f, ECC_Visibility, Params))
	{
		if (AActor* HitActor = Hit.GetActor())
		{
			const FString Label = HitActor->GetActorNameOrLabel();
			if (Label.StartsWith(TEXT("word_")))
			{
				FocusWordId = Label.Mid(5);
				const FMemoryWord* W = MemoryWords.Find(FocusWordId);
				if (W)
				{
					const float CardW = FMath::Min(340.f, CanvasW * 0.30f);
					const float CardX = CanvasW - CardW - 28.f;
					const float CardY = CanvasH * 0.30f;
					DrawRect(FLinearColor(0.02f, 0.04f, 0.07f, 0.62f), CardX, CardY, CardW, 134.f);
					DrawText(W->Word, FLinearColor(1.f, 1.f, 1.f, 0.95f), CardX + 14.f, CardY + 10.f, BodyFont, 1.15f);
					if (!W->Phonetic.IsEmpty())
					{
						DrawText(W->Phonetic, FLinearColor(0.7f, 0.82f, 1.f, 0.6f), CardX + 14.f, CardY + 38.f, SmallFont, 0.9f);
					}
					if (!W->Example.IsEmpty())
					{
						DrawText(W->Example, FLinearColor(0.9f, 0.94f, 1.f, 0.82f), CardX + 14.f, CardY + 62.f, SmallFont, 0.9f);
					}
					if (!W->Meaning.IsEmpty())
					{
						DrawText(W->Meaning, FLinearColor(0.85f, 0.9f, 1.f, 0.42f), CardX + 14.f, CardY + 96.f, SmallFont, 0.85f);
					}
					if (PlayerOwner->WasInputKeyJustPressed(EKeys::E))
					{
						TouchedWords.Add(FocusWordId);
					}
					DrawText(TEXT("[E] 记住"), FLinearColor(0.75f, 0.9f, 1.f, 0.35f), CardX + 14.f, CardY + 112.f, SmallFont, 0.8f);
				}
			}
		}
	}
	if (TouchedWords.Num() > 0)
	{
		DrawText(FString::Printf(TEXT("MEMORY · %d"), TouchedWords.Num()), FLinearColor(0.8f, 0.9f, 1.f, 0.25f), CanvasW - 150.f, 20.f, SmallFont, 1.f);
	}
}
