#include "WordQuestData.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "Dom/JsonObject.h"
#include "Dom/JsonValue.h"

FString FWordEntry::BestMeaning(const TArray<FString>& Pool, FRandomStream& Rng) const
{
	if (Meanings.Num() > 0)
	{
		const int32 Pick = Rng.RandRange(0, Meanings.Num() - 1);
		return Meanings[Pick].TrimStartAndEnd();
	}
	return Meaning;
}

const TArray<FString>& UWordQuestData::CourseIds()
{
	static const TArray<FString> Ids = { TEXT("cet4"), TEXT("cet6"), TEXT("college_english_rw3") };
	return Ids;
}

bool UWordQuestData::LoadCourse(const FString& CourseId, TArray<FWordEntry>& OutWords)
{
	OutWords.Reset();
	const FString Path = FPaths::ProjectContentDir() / TEXT("Data/vocabulary") / (CourseId + TEXT(".json"));
	FString Raw;
	if (!FFileHelper::LoadFileToString(Raw, *Path))
	{
		UE_LOG(LogTemp, Error, TEXT("[WordQuest] cannot read vocabulary file: %s"), *Path);
		return false;
	}
	TSharedPtr<FJsonObject> Root;
	const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(Raw);
	if (!FJsonSerializer::Deserialize(Reader, Root) || !Root.IsValid())
	{
		UE_LOG(LogTemp, Error, TEXT("[WordQuest] invalid JSON: %s"), *Path);
		return false;
	}
	const TArray<TSharedPtr<FJsonValue>>* Words = nullptr;
	if (!Root->TryGetArrayField(TEXT("words"), Words) || !Words)
	{
		UE_LOG(LogTemp, Error, TEXT("[WordQuest] missing words array: %s"), *Path);
		return false;
	}
	for (const TSharedPtr<FJsonValue>& V : *Words)
	{
		const TSharedPtr<FJsonObject> O = V.IsValid() ? V->AsObject() : nullptr;
		if (!O.IsValid())
		{
			continue;
		}
		FWordEntry E;
		E.Word = O->GetStringField(TEXT("word"));
		O->TryGetStringField(TEXT("phonetic"), E.Phonetic);
		O->TryGetStringField(TEXT("pos"), E.Pos);
		O->TryGetStringField(TEXT("meaning"), E.Meaning);
		O->TryGetStringField(TEXT("example"), E.Example);
		O->TryGetStringField(TEXT("unit_id"), E.UnitId);
		O->TryGetStringField(TEXT("unit_title"), E.UnitTitle);
		const TArray<TSharedPtr<FJsonValue>>* M = nullptr;
		if (O->TryGetArrayField(TEXT("meanings"), M) && M)
		{
			for (const TSharedPtr<FJsonValue>& MV : *M)
			{
				E.Meanings.Add(MV->AsString());
			}
		}
		if (E.Word.Len() > 0 && (E.Meaning.Len() > 0 || E.Meanings.Num() > 0))
		{
			OutWords.Add(E);
		}
	}
	UE_LOG(LogTemp, Warning, TEXT("[WordQuest] loaded %s: %d words from %s"), *CourseId, OutWords.Num(), *Path);
	return OutWords.Num() > 0;
}
