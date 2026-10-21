#pragma once

#include "CoreMinimal.h"
#include "WordQuestData.generated.h"

USTRUCT(BlueprintType)
struct FWordEntry
{
	GENERATED_BODY()

	UPROPERTY(BlueprintReadOnly) FString Word;
	UPROPERTY(BlueprintReadOnly) FString Phonetic;
	UPROPERTY(BlueprintReadOnly) FString Pos;
	UPROPERTY(BlueprintReadOnly) FString Meaning;
	UPROPERTY(BlueprintReadOnly) FString Example;
	UPROPERTY(BlueprintReadOnly) FString UnitId;
	UPROPERTY(BlueprintReadOnly) FString UnitTitle;
	UPROPERTY(BlueprintReadOnly) TArray<FString> Meanings;

	FString BestMeaning(const TArray<FString>& Pool, FRandomStream& Rng) const;
};

UCLASS()
class WORDQUESTUE_API UWordQuestData : public UObject
{
	GENERATED_BODY()

public:
	static bool LoadCourse(const FString& CourseId, TArray<FWordEntry>& OutWords);
	static const TArray<FString>& CourseIds();
};
