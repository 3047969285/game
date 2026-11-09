#pragma once
#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "Components/Button.h"
#include "Dom/JsonObject.h"
#include "WordQuestMemoryFragment.h"
#include "WordQuestExerciseWidget.generated.h"
class UWordQuestMemoryDirector;
class UVerticalBox;
class UEditableTextBox;
class UTextBlock;
class UWordQuestExerciseWidget;

UCLASS()
class WORDQUESTUE_API UWordQuestMemoryButton : public UButton
{
 GENERATED_BODY()
public:
 UPROPERTY() TObjectPtr<UWordQuestExerciseWidget> Host;
 int32 Value=0;
 UFUNCTION() void Press();
};

UCLASS()
class WORDQUESTUE_API UWordQuestExerciseWidget : public UUserWidget
{
 GENERATED_BODY()
public:
 void Setup(UWordQuestMemoryDirector* InDirector);
 void ShowMemory(const FString& Title,const FString& Sentence,const FString& Zh,const FString& Word);
 bool ShowExercise(TSharedPtr<FJsonObject> Exercise,int32 ItemNumber=0,int32 LastNumber=0);
 void HandleAction(int32 Value);
 void SetDissolve(float Amount);
 bool ProbeAnswer();
 bool ExportResponsiveUI(int32 Width,int32 Height,const FString& Name);
 TArray<FWordQuestMemoryElement> WorldElements() const;
 void SetWorldAnswer(const FString& Answer);
 void SetCompleteness(float Value){Completeness=FMath::Clamp(Value,0.f,1.f);InvalidateLayoutAndVolatility();}
 FString Result() const {return LastResult;}
 bool IsExercise() const {return bExercise;}
protected:
 virtual int32 NativePaint(const FPaintArgs&,const FGeometry&,const FSlateRect&,FSlateWindowElementList&,int32,const FWidgetStyle&,bool) const override;
private:
 void Rebuild();
 void DrawItem();
 void Submit();
 bool PersistNote(const FString& Answer);
 void AddText(const FString& Text,int32 Size=20);
 void AddButton(const FString& Text,int32 Value);
 FString AnswerString() const;
 UPROPERTY() TObjectPtr<UWordQuestMemoryDirector> Director;
 UPROPERTY() TObjectPtr<UVerticalBox> Body;
 UPROPERTY() TObjectPtr<UEditableTextBox> Input;
 UPROPERTY() TObjectPtr<UTextBlock> Feedback;
 UPROPERTY() TObjectPtr<UButton> LinkLeft;
 UPROPERTY() TObjectPtr<UButton> LinkRight;
 TSharedPtr<FJsonObject> ExerciseData;
 TArray<TSharedPtr<FJsonValue>> Items;
 int32 ItemIndex=0, LastItem=0, Selected=-1, ActiveBlank=0, LeftMatch=-1;
 TArray<FString> Blanks, BuildTokens, ChoiceBank, TranslationLines;
 int32 TranslationLineIndex=0;
 TMap<int32,int32> Matches;
 bool bExercise=false,bAccepted=false,bClozeGroup=false;
 float Dissolve=0;
 float Completeness=0;
 FString Title,Sentence,Chinese,WordCard,LastResult;
};
