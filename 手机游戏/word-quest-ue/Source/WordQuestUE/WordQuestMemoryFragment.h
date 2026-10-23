#pragma once
#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "GameFramework/Actor.h"
#include "WordQuestMemoryFragment.generated.h"

class UWordQuestExerciseWidget;
class UWidgetComponent;
class UStaticMeshComponent;
class UEditableTextBox;
class UTextBlock;

/** Semantic content, kept separate from the screen-space progress ring. */
struct FWordQuestMemoryElement
{
 FString Text;
 int32 Action=MIN_int32;
 int32 FontSize=22;
 bool bInput=false;
 TArray<FString> Highlights;      // 需要标亮的词形（大小写/标点不敏感匹配）
 TArray<FString> HighlightWords;  // 与 Highlights 对应的 New words 词条
};

UCLASS()
class WORDQUESTUE_API UWordQuestMemoryFragmentWidget : public UUserWidget
{
 GENERATED_BODY()
public:
 void Setup(UWordQuestExerciseWidget* Controller,const FWordQuestMemoryElement& Element);
 void SetIntensity(float Alpha);
 void SetText(const FString& Text);
 void FocusInput();
 UWidget* GetInputWidget() const;
private:
 UFUNCTION() void Press();
 UFUNCTION() void Changed(const FText& Text);
 UPROPERTY() TObjectPtr<UWordQuestExerciseWidget> Host;
 UPROPERTY() TObjectPtr<UEditableTextBox> Editor;
 UPROPERTY() TObjectPtr<UTextBlock> Label;
 int32 Action=MIN_int32;
};

/** A real world-space surface: independent optical glass pieces, never a viewport panel. */
UCLASS()
class WORDQUESTUE_API AWordQuestMemoryFragment : public AActor
{
 GENERATED_BODY()
public:
 AWordQuestMemoryFragment();
 void Setup(UWordQuestExerciseWidget* Host,const FWordQuestMemoryElement& Element,bool bGlass,FVector2D Pixels=FVector2D(1000,180));
 void SetIntensity(float Alpha);
 void SetText(const FString& Text);
 void FocusInput();
 UWidget* GetInputWidget() const;
 int32 GetAction() const {return Action;}
 /** 验证用：该碎片是否真的挂在世界空间（World space widget）。 */
 bool IsWorldSpace() const;
 void SetHighlightWords(const TArray<FString>& Words) { HighlightWords=Words; }
 const TArray<FString>& GetHighlightWords() const { return HighlightWords; }
 bool IsInput() const {return bInput;}
 FVector RestLocation=FVector::ZeroVector;
 UPROPERTY() TObjectPtr<UWidgetComponent> Surface;
 UPROPERTY() TObjectPtr<UStaticMeshComponent> Glass;
private:
 UPROPERTY() TObjectPtr<UWordQuestMemoryFragmentWidget> Content;
 int32 Action=MIN_int32;
 bool bInput=false,bHasGlass=false,bWorldSpace=true;
 TArray<FString> HighlightWords;
};
