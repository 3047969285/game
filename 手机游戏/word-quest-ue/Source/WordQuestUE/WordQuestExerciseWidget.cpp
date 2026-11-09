#include "WordQuestExerciseWidget.h"
#include "WordQuestMemoryDirector.h"
#include "Blueprint/WidgetTree.h"
#include "Components/VerticalBox.h"
#include "Components/HorizontalBox.h"
#include "Components/HorizontalBoxSlot.h"
#include "Slate/WidgetRenderer.h"
#include "Engine/TextureRenderTarget2D.h"
#include "ImageUtils.h"
#include "RenderingThread.h"
#include "Components/VerticalBoxSlot.h"
#include "Components/ScrollBox.h"
#include "Components/PanelWidget.h"
#include "Components/Border.h"
#include "Components/TextBlock.h"
#include "Components/EditableTextBox.h"
#include "Components/SizeBox.h"
#include "Styling/CoreStyle.h"
#include "Rendering/DrawElements.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "HAL/FileManager.h"
#include "Serialization/JsonSerializer.h"
#include "Misc/DateTime.h"
namespace {
const FLinearColor Ink(.86,.87,.8,1),Cold(.48,.64,.67,1),Warm(1,.69,.43,1);
FString Str(TSharedPtr<FJsonObject> O,const FString& K){FString S;if(O)O->TryGetStringField(K,S);return S;}
FString Normal(FString S){S=S.TrimStartAndEnd().ToLower();S.ReplaceInline(TEXT("’"),TEXT("'"));while(S.Contains(TEXT("  ")))S.ReplaceInline(TEXT("  "),TEXT(" "));return S;}
FString Value(TSharedPtr<FJsonValue> V){if(!V||V->IsNull())return TEXT("");if(V->Type==EJson::String)return V->AsString();if(V->Type==EJson::Number)return FString::FromInt(int32(V->AsNumber()));if(V->Type==EJson::Array){TArray<FString> A;for(auto X:V->AsArray())A.Add(Value(X));return FString::Join(A,TEXT(" | "));}return TEXT("");}
}
void UWordQuestMemoryButton::Press(){if(Host)Host->HandleAction(Value);}
void UWordQuestExerciseWidget::Setup(UWordQuestMemoryDirector* D){Director=D;Rebuild();}
void UWordQuestExerciseWidget::AddText(const FString& Text,int32 Size){auto* T=WidgetTree->ConstructWidget<UTextBlock>();T->SetText(FText::FromString(Text));T->SetColorAndOpacity(Ink);T->SetAutoWrapText(true);auto Font=FCoreStyle::GetDefaultFontStyle(TEXT("Regular"),Size);T->SetFont(Font);auto* Slot=Body->AddChildToVerticalBox(T);Slot->SetPadding(FMargin(4,6));}
void UWordQuestExerciseWidget::AddButton(const FString& Text,int32 Number){auto* B=WidgetTree->ConstructWidget<UWordQuestMemoryButton>();B->Host=this;B->Value=Number;B->SetBackgroundColor(FLinearColor(.015,.025,.04,.95));auto Style=B->GetStyle();Style.Normal=*FCoreStyle::Get().GetBrush(TEXT("WhiteBrush"));Style.Normal.DrawAs=ESlateBrushDrawType::Border;Style.Normal.Margin=FMargin(.02f);Style.Hovered=Style.Normal;Style.Pressed=Style.Normal;Style.Normal.TintColor=FSlateColor(Cold*.4f);Style.Hovered.TintColor=FSlateColor(Cold);Style.Pressed.TintColor=FSlateColor(Cold);B->SetStyle(Style);B->OnClicked.AddDynamic(B,&UWordQuestMemoryButton::Press);
 auto* T=WidgetTree->ConstructWidget<UTextBlock>();T->SetText(FText::FromString(Text));T->SetAutoWrapText(true);T->SetColorAndOpacity(Ink);T->SetFont(FCoreStyle::GetDefaultFontStyle(TEXT("Regular"),19));T->SetMargin(FMargin(14,12));B->AddChild(T);auto* Slot=Body->AddChildToVerticalBox(B);Slot->SetPadding(FMargin(2,5));auto* Line=WidgetTree->ConstructWidget<UBorder>();Line->SetBrushColor(FLinearColor(.48,.64,.67,.28));Line->SetPadding(FMargin(0));auto* Height=WidgetTree->ConstructWidget<USizeBox>();Height->SetHeightOverride(1);Line->AddChild(Height);Body->AddChild(Line);}
void UWordQuestExerciseWidget::Rebuild(){
 if(!Body){
 WidgetTree=NewObject<UWidgetTree>(this,TEXT("MemoryWidgetTree"));
 auto* Frame=WidgetTree->ConstructWidget<UBorder>(UBorder::StaticClass(),TEXT("MemoryFrame"));WidgetTree->RootWidget=Frame;
 auto* Limit=WidgetTree->ConstructWidget<USizeBox>(USizeBox::StaticClass(),TEXT("MemoryLimit"));Frame->AddChild(Limit);
 auto* Scroll=WidgetTree->ConstructWidget<UScrollBox>();Limit->AddChild(Scroll);Body=WidgetTree->ConstructWidget<UVerticalBox>();Scroll->AddChild(Body);
 }else Body->ClearChildren();
 auto* Frame=Cast<UBorder>(WidgetTree->FindWidget(TEXT("MemoryFrame")));Frame->SetBrushColor(FLinearColor(.004,.006,.011,bExercise?.96f:.15f));Frame->SetPadding(FMargin(24,18));Frame->SetVerticalAlignment(bExercise?VAlign_Fill:VAlign_Bottom);
 auto* Limit=Cast<USizeBox>(WidgetTree->FindWidget(TEXT("MemoryLimit")));Limit->SetMaxDesiredHeight(bExercise?8192:370);
 Input=nullptr;Feedback=nullptr;LinkLeft=nullptr;LinkRight=nullptr; AddText(bExercise?TEXT("MEMORY RECALL / FRAGMENT"):TEXT("MEMORY RECALL / TEXTBOOK"),14);
 if(bExercise)DrawItem();else{
 AddText(Title,22);AddText(Sentence,25);if(!Chinese.IsEmpty())AddText(Chinese,19);if(!WordCard.IsEmpty())AddText(WordCard,22);
 AddButton(TEXT("CONTINUE / 点击继续"),-1);AddButton(TEXT("中文 / EN"),-4);
 }
 // Rebuild the live Slate tree, not merely the UObject tree after AddToViewport.
 Body->SetVisibility(ESlateVisibility::Collapsed);Frame->SetBrushColor(FLinearColor::Transparent);SetVisibility(ESlateVisibility::HitTestInvisible);
 InvalidateLayoutAndVolatility();if(Director)Director->RebuildWorldFragments();
}
void UWordQuestExerciseWidget::ShowMemory(const FString& T,const FString& S,const FString& Zh,const FString& W){bExercise=false;Title=T;Sentence=S;Chinese=Zh;WordCard=W;Rebuild();}
bool UWordQuestExerciseWidget::ShowExercise(TSharedPtr<FJsonObject> E,int32 N,int32 End){const TArray<TSharedPtr<FJsonValue>>* List=nullptr;if(!E||!E->TryGetArrayField(TEXT("items"),List)||List->IsEmpty())return false;
 ExerciseData=E;Items=*List;ItemIndex=0;LastItem=Items.Num()-1;
 if(N>0){bool Found=false;for(int32 I=0;I<Items.Num();I++)if(int32(Items[I]->AsObject()->GetNumberField(TEXT("n")))==N){ItemIndex=LastItem=I;Found=true;break;}if(!Found)return false;if(End>N){bool LastFound=false;for(int32 I=ItemIndex;I<Items.Num();I++)if(int32(Items[I]->AsObject()->GetNumberField(TEXT("n")))==End){LastItem=I;LastFound=true;break;}if(!LastFound)return false;}}
 ChoiceBank.Reset();const TArray<TSharedPtr<FJsonValue>>* Bank=nullptr;if(E->TryGetArrayField(TEXT("bank"),Bank))for(auto V:*Bank)ChoiceBank.Add(V->AsString());
 if(Str(E,TEXT("kind"))==TEXT("word_building")){
 TArray<FString> Parts;for(const FString& W:ChoiceBank){bool Split=false;for(const FString& Suffix:TArray<FString>{TEXT("ance"),TEXT("ence"),TEXT("tion"),TEXT("ment"),TEXT("ity"),TEXT("ed")})if(W.EndsWith(Suffix)&&W.Len()>Suffix.Len()+2){Parts.AddUnique(W.LeftChop(Suffix.Len()));Parts.AddUnique(TEXT("+")+Suffix);Split=true;break;}if(!Split)Parts.AddUnique(W);}ChoiceBank=Parts;
 }
 if(Str(E,TEXT("kind"))==TEXT("collocation")&&ChoiceBank.IsEmpty())for(auto V:Items){FString A=Value(V->AsObject()->TryGetField(TEXT("answer")));if(!A.IsEmpty())ChoiceBank.AddUnique(A);}
 TranslationLines.Reset();TranslationLineIndex=0;if(Str(E,TEXT("kind"))==TEXT("translation"))Str(Items[ItemIndex]->AsObject(),TEXT("prompt")).ParseIntoArray(TranslationLines,TEXT("。"),true);
 bClozeGroup=Str(E,TEXT("kind"))==TEXT("banked_cloze")&&N==0;
 bExercise=true;Selected=-1;Blanks.Reset();BuildTokens.Reset();Matches.Reset();LeftMatch=-1;ActiveBlank=0;bAccepted=false;LastResult.Reset();Rebuild();return true;}
void UWordQuestExerciseWidget::DrawItem(){auto Item=Items[ItemIndex]->AsObject();FString Kind=Str(ExerciseData,TEXT("kind"));AddText(Kind.ToUpper(),16);if(!LastResult.IsEmpty())AddText(LastResult,20);AddText(Str(ExerciseData,TEXT("instructions")),19);
 if(!Str(ExerciseData,TEXT("passage")).IsEmpty()){FString Passage=Str(ExerciseData,TEXT("passage"));if(bClozeGroup)for(int32 I=0;I<Blanks.Num();I++)Passage.ReplaceInline(*FString::Printf(TEXT("{{%d}}"),I+1),Blanks[I].IsEmpty()?TEXT("____"):*Blanks[I]);AddText(Passage,21);if(bClozeGroup&&bAccepted)if(auto* T=Cast<UTextBlock>(Body->GetChildAt(Body->GetChildrenCount()-1)))T->SetColorAndOpacity(FLinearColor(.5,.85,.92));}
 AddText(FString::Printf(TEXT("%d / %d"),ItemIndex+1,Items.Num()),14);if(Kind==TEXT("translation")&&TranslationLines.IsValidIndex(TranslationLineIndex))AddText(FString::Printf(TEXT("SENTENCE %d / %d\n%s。"),TranslationLineIndex+1,TranslationLines.Num(),*TranslationLines[TranslationLineIndex]),23);else AddText(Str(Item,TEXT("prompt")),23);
 const TArray<TSharedPtr<FJsonValue>>* Options=nullptr;
 if(Item->TryGetArrayField(TEXT("options"),Options)&&!Options->IsEmpty()){
 for(int32 I=0;I<Options->Num();I++)AddButton((Selected==I?TEXT("> "):TEXT("— "))+(*Options)[I]->AsString(),I);
 }else{
 const TArray<TSharedPtr<FJsonValue>>* Bank=nullptr;ExerciseData->TryGetArrayField(TEXT("bank"),Bank);
 bool Fill=Kind==TEXT("banked_cloze")||Kind==TEXT("words_in_use")||Kind==TEXT("expressions_in_use");
 if(Fill&&Bank){auto Answer=Item->TryGetField(TEXT("answer"));int32 Count=bClozeGroup?Items.Num():(Answer&&Answer->Type==EJson::Array?Answer->AsArray().Num():1);
 if(Blanks.Num()!=Count)Blanks.SetNum(Count);
 for(int32 I=0;I<Count;I++)AddButton(FString::Printf(TEXT("%s BLANK %d  %s"),ActiveBlank==I?TEXT(">"):TEXT(" "),I+1,Blanks[I].IsEmpty()?TEXT("____"):*Blanks[I]),200+I);
 for(int32 I=0;I<Bank->Num();I++)AddButton((*Bank)[I]->AsString(),100+I);
 // Word form remains editable; selecting a bank base is not automatically accepted as an inflection.
 Input=WidgetTree->ConstructWidget<UEditableTextBox>();Input->SetForegroundColor(Ink);{auto S=Input->GetWidgetStyle();S.BackgroundImageNormal.TintColor=FSlateColor(FLinearColor(.01,.02,.035,1));S.BackgroundImageFocused.TintColor=S.BackgroundImageNormal.TintColor;S.BackgroundImageHovered.TintColor=S.BackgroundImageNormal.TintColor;S.ForegroundColor=FSlateColor(Ink);Input->SetWidgetStyle(S);}Input->SetHintText(FText::FromString(TEXT("Adjust the word form, then CHECK")));Input->SetText(FText::FromString(Blanks.IsValidIndex(ActiveBlank)?Blanks[ActiveBlank]:TEXT("")));Body->AddChild(Input);
 }else if(Kind==TEXT("word_building")){
 AddText(TEXT("ROOT + AFFIX → WORD"),17);for(int32 I=0;I<ChoiceBank.Num();I++)AddButton(ChoiceBank[I],3000+I);
 AddText(FString::Join(BuildTokens,TEXT(" + ")),21);Input=WidgetTree->ConstructWidget<UEditableTextBox>();Input->SetForegroundColor(Ink);{auto S=Input->GetWidgetStyle();S.BackgroundImageNormal.TintColor=FSlateColor(FLinearColor(.01,.02,.035,1));S.BackgroundImageFocused.TintColor=S.BackgroundImageNormal.TintColor;S.BackgroundImageHovered.TintColor=S.BackgroundImageNormal.TintColor;S.ForegroundColor=FSlateColor(Ink);Input->SetWidgetStyle(S);}Input->SetHintText(FText::FromString(TEXT("Combine a root and affix / type the resulting form")));Input->SetText(FText::FromString(FString::Join(BuildTokens,TEXT(""))));Body->AddChild(Input);AddButton(TEXT("CLEAR ROOT + AFFIX"),-5);
 }else if(Kind==TEXT("collocation")&&!ChoiceBank.IsEmpty()){
 AddText(TEXT("LEFT COLUMN → RIGHT COLUMN"),17);
 auto* Parent=Body.Get();auto* Row=WidgetTree->ConstructWidget<UHorizontalBox>();Parent->AddChild(Row);
 auto* Left=WidgetTree->ConstructWidget<UVerticalBox>();auto* Right=WidgetTree->ConstructWidget<UVerticalBox>();Row->AddChildToHorizontalBox(Left)->SetSize(FSlateChildSize(ESlateSizeRule::Fill));Row->AddChildToHorizontalBox(Right)->SetSize(FSlateChildSize(ESlateSizeRule::Fill));
 Body=Left;AddButton(Str(Item,TEXT("prompt")),1000+ItemIndex);LinkLeft=Cast<UButton>(Body->GetChildAt(Body->GetChildrenCount()-2));Body=Right;
 for(int32 I=0;I<ChoiceBank.Num();I++){AddButton(ChoiceBank[I],2000+I);if(Matches.Contains(ItemIndex)&&Matches.FindRef(ItemIndex)==I)LinkRight=Cast<UButton>(Body->GetChildAt(Body->GetChildrenCount()-2));}Body=Parent;
 }else{
 Input=WidgetTree->ConstructWidget<UEditableTextBox>();Input->SetForegroundColor(Ink);{auto S=Input->GetWidgetStyle();S.BackgroundImageNormal.TintColor=FSlateColor(FLinearColor(.01,.02,.035,1));S.BackgroundImageFocused.TintColor=S.BackgroundImageNormal.TintColor;S.BackgroundImageHovered.TintColor=S.BackgroundImageNormal.TintColor;S.ForegroundColor=FSlateColor(Ink);Input->SetWidgetStyle(S);}Input->SetHintText(FText::FromString(Kind==TEXT("translation")?TEXT("Your English translation"):TEXT("Your answer / notebook")));Body->AddChild(Input);
 }
 }
 Feedback=WidgetTree->ConstructWidget<UTextBlock>();Feedback->SetAutoWrapText(true);Feedback->SetColorAndOpacity(Warm);Feedback->SetText(FText::FromString(LastResult));Body->AddChild(Feedback);
 AddButton(TEXT("CHECK / SAVE"),-2);if(bAccepted)AddButton(TranslationLines.IsValidIndex(TranslationLineIndex+1)?TEXT("NEXT SENTENCE"):(ItemIndex<LastItem&&!bClozeGroup?TEXT("NEXT FRAGMENT"):TEXT("RESTORE MEMORY / CONTINUE")),-3);
}
FString UWordQuestExerciseWidget::AnswerString()const{if(Input)return Input->GetText().ToString();return Selected>=0?FString::FromInt(Selected):TEXT("");}
void UWordQuestExerciseWidget::HandleAction(int32 V){if(!Director)return;
 if(V>=10000||V==-30||V==-40){Director->HandleWorldAction(V);return;}
 if(V==-1){Director->Advance();return;}if(V==-4){Director->SetChineseEnabled(Chinese.IsEmpty());return;}
 if(!bExercise)return;if(V==-2){Submit();return;}if(V==-3&&bAccepted){if(TranslationLines.IsValidIndex(TranslationLineIndex+1)){TranslationLineIndex++;bAccepted=false;LastResult.Reset();Rebuild();return;}if(ItemIndex<LastItem&&!bClozeGroup){ItemIndex++;Selected=-1;Blanks.Reset();BuildTokens.Reset();bAccepted=false;LastResult.Reset();Rebuild();}else {bExercise=false;Director->ExerciseCompleted();}return;}
 if(V==-5){BuildTokens.Reset();Rebuild();return;}
 if(V>=3000){if(ChoiceBank.IsValidIndex(V-3000)){FString Token=ChoiceBank[V-3000];Token.RemoveFromStart(TEXT("+"));BuildTokens.Add(Token);}}
 else if(V>=2000){if(LeftMatch==ItemIndex&&ChoiceBank.IsValidIndex(V-2000)){Matches.Add(ItemIndex,V-2000);Selected=V-2000;}}
 else if(V>=1000){LeftMatch=V-1000;}
 else if(V>=200){if(Input&&Blanks.IsValidIndex(ActiveBlank))Blanks[ActiveBlank]=Input->GetText().ToString();ActiveBlank=V-200;}
 else if(V>=100){const auto& Bank=ExerciseData->GetArrayField(TEXT("bank"));if(Input&&Blanks.IsValidIndex(ActiveBlank))Blanks[ActiveBlank]=Input->GetText().ToString();if(Blanks.IsValidIndex(ActiveBlank)&&Bank.IsValidIndex(V-100))Blanks[ActiveBlank]=Bank[V-100]->AsString();}
 else Selected=V;
 Rebuild();
}
void UWordQuestExerciseWidget::Submit(){auto Item=Items[ItemIndex]->AsObject();FString Kind=Str(ExerciseData,TEXT("kind"));FString Answer=AnswerString();auto Expected=Item->TryGetField(TEXT("answer"));
 bool Open=Kind==TEXT("translation")||Kind==TEXT("critical")||Kind==TEXT("structure_writing")||Kind==TEXT("pre_reading")||(Kind==TEXT("understanding")&&!Item->HasField(TEXT("options")))||!Expected||Expected->IsNull()||Str(Item,TEXT("answer_source"))==TEXT("open");
 if(Open){if(Answer.TrimStartAndEnd().IsEmpty()){LastResult=TEXT("Write a response before saving.");}else{if(!PersistNote(Answer)){LastResult=TEXT("Notebook could not be saved. Your response is still available; please retry.");if(Feedback)Feedback->SetText(FText::FromString(LastResult));return;}bAccepted=true;LastResult=TEXT("SAVED TO NOTEBOOK · Compare and reflect");if(Expected&&!Expected->IsNull()&&(Kind!=TEXT("translation")||TranslationLineIndex+1>=TranslationLines.Num()))LastResult+=TEXT("\nREFERENCE: ")+Value(Expected);if(!Str(ExerciseData,TEXT("sample")).IsEmpty())LastResult+=TEXT("\n")+Str(ExerciseData,TEXT("sample"));}}
 else{
 bool Correct=false;
 if(Expected->Type==EJson::Number)Correct=Selected==int32(Expected->AsNumber());
 else if(!Blanks.IsEmpty()){
 if(Input&&Blanks.IsValidIndex(ActiveBlank))Blanks[ActiveBlank]=Answer;
 if(bClozeGroup){Correct=Blanks.Num()==Items.Num();for(int32 I=0;Correct&&I<Blanks.Num();I++)Correct=Normal(Blanks[I])==Normal(Value(Items[I]->AsObject()->TryGetField(TEXT("answer"))));}
 else if(Expected->Type==EJson::Array){auto Values=Expected->AsArray();Correct=Values.Num()==Blanks.Num();for(int32 I=0;Correct&&I<Blanks.Num();I++)Correct=Normal(Blanks[I])==Normal(Value(Values[I]));}
 else Correct=Normal(Blanks[0])==Normal(Value(Expected));
 }else if(Kind==TEXT("collocation")&&Matches.Contains(ItemIndex)){Correct=ChoiceBank.IsValidIndex(Selected)&&Normal(ChoiceBank[Selected])==Normal(Value(Expected));}
 else Correct=Normal(Answer)==Normal(Value(Expected));
 bAccepted=Correct;LastResult=Correct?TEXT("RESTORED · Correct"):TEXT("Not yet · Check the word form and try again");if(Correct&&!Str(Item,TEXT("explanation_zh")).IsEmpty())LastResult+=TEXT("\n")+Str(Item,TEXT("explanation_zh"));
 }
 if(Director)Director->NotifyExerciseAttempt(bAccepted);Rebuild();
}
bool UWordQuestExerciseWidget::PersistNote(const FString& Answer){FString Path=FPaths::ProjectSavedDir()/(FPlatformMisc::GetEnvironmentVariable(TEXT("WQ_TEXTBOOK_ENGINE_QA"))==TEXT("1")?TEXT("Player/Notebook.qa.json"):TEXT("Player/Notebook.json"));FString Text;TSharedPtr<FJsonObject> Root=MakeShared<FJsonObject>();if(FFileHelper::LoadFileToString(Text,*Path)){TSharedPtr<FJsonObject> Existing;if(FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Text),Existing)&&Existing)Root=Existing;else return false;}
 TArray<TSharedPtr<FJsonValue>> Notes;const TArray<TSharedPtr<FJsonValue>>* Old=nullptr;if(Root->TryGetArrayField(TEXT("notes"),Old))Notes=*Old;
 auto Note=MakeShared<FJsonObject>();Note->SetStringField(TEXT("exercise"),Str(ExerciseData,TEXT("id")));Note->SetNumberField(TEXT("item"),Items[ItemIndex]->AsObject()->GetNumberField(TEXT("n")));Note->SetStringField(TEXT("answer"),Answer);if(!TranslationLines.IsEmpty())Note->SetNumberField(TEXT("translation_line"),TranslationLineIndex+1);Note->SetStringField(TEXT("savedAt"),FDateTime::UtcNow().ToIso8601());Notes.Add(MakeShared<FJsonValueObject>(Note));Root->SetArrayField(TEXT("notes"),Notes);
 Text.Reset();FJsonSerializer::Serialize(Root,TJsonWriterFactory<>::Create(&Text));IFileManager::Get().MakeDirectory(*FPaths::GetPath(Path),true);if(!FFileHelper::SaveStringToFile(Text,*(Path+TEXT(".tmp"))))return false;return IFileManager::Get().Move(*Path,*(Path+TEXT(".tmp")),true,true);
}
bool UWordQuestExerciseWidget::ProbeAnswer(){if(!ExerciseData||!Items.IsValidIndex(ItemIndex))return false;auto Item=Items[ItemIndex]->AsObject();auto Expected=Item->TryGetField(TEXT("answer"));FString Kind=Str(ExerciseData,TEXT("kind"));
 // Reject a wrong/empty attempt through the real submit handler before completing the question.
 if(Expected&&!Expected->IsNull()&&Expected->Type==EJson::Number){Selected=(int32(Expected->AsNumber())+1)%4;}else if(Input)Input->SetText(FText::GetEmpty());
 Submit();if(bAccepted)return false;
 if(Expected&&Expected->Type==EJson::Number)HandleAction(int32(Expected->AsNumber()));
 else if(!Blanks.IsEmpty()){if(bClozeGroup){for(int32 I=0;I<Blanks.Num();I++)Blanks[I]=Value(Items[I]->AsObject()->TryGetField(TEXT("answer")));}else if(Expected&&Expected->Type==EJson::Array){for(int32 I=0;I<Blanks.Num();I++)Blanks[I]=Value(Expected->AsArray()[I]);}else Blanks[0]=Value(Expected);if(Input)Input->SetText(FText::FromString(Blanks[ActiveBlank]));}
 else if(Input&&Kind==TEXT("word_building")){
 FString Target=Value(Expected);bool Combined=false;for(int32 I=0;I<ChoiceBank.Num()&&!Combined;I++)if(!ChoiceBank[I].StartsWith(TEXT("+"))&&Target.StartsWith(ChoiceBank[I]))for(int32 J=0;J<ChoiceBank.Num();J++)if(ChoiceBank[J]==TEXT("+")+Target.Mid(ChoiceBank[I].Len())){HandleAction(3000+I);HandleAction(3000+J);Combined=true;break;}if(!Combined)Input->SetText(FText::FromString(Target));
 }
 else if(Input)Input->SetText(FText::FromString(Expected&&!Expected->IsNull()?Value(Expected):TEXT("PIE validation note: I choose a phone-free conversation.")));
 else if(Kind==TEXT("collocation")){HandleAction(1000+ItemIndex);for(int32 I=0;I<ChoiceBank.Num();I++)if(Normal(ChoiceBank[I])==Normal(Value(Expected))){HandleAction(2000+I);break;}}
 Submit();if(bAccepted&&TranslationLines.IsValidIndex(TranslationLineIndex+1)){HandleAction(-3);return ProbeAnswer();}return bAccepted;
}
void UWordQuestExerciseWidget::SetDissolve(float Amount){Dissolve=Amount;InvalidateLayoutAndVolatility();}
TArray<FWordQuestMemoryElement> UWordQuestExerciseWidget::WorldElements() const
{
 TArray<FWordQuestMemoryElement> Elements;
 if(!bExercise)
 {
  if(!Sentence.IsEmpty())Elements.Add({Sentence,MIN_int32,25,false});
  if(!Chinese.IsEmpty())Elements.Add({Chinese,MIN_int32,17,false});
  return Elements;
 }
 TFunction<void(UWidget*)> Visit=[&](UWidget* Widget)
 {
  if(auto* Button=Cast<UWordQuestMemoryButton>(Widget))
  {
   auto* Text=Cast<UTextBlock>(Button->GetContent());if(!Text)return;
   FString Label=Text->GetText().ToString();
   if(Button->Value==-2)Label=TEXT("Let this fragment settle");
   else if(Button->Value==-3)Label=TEXT("Continue remembering");
   else if(Button->Value==-5)Label=TEXT("Release these syllables");
   Label.RemoveFromStart(TEXT("> "));Label.RemoveFromStart(TEXT("— "));
   Elements.Add({Label,Button->Value,20,false});return;
  }
  if(auto* Editor=Cast<UEditableTextBox>(Widget)){Elements.Add({Editor->GetText().ToString(),MIN_int32,21,true});return;}
  if(auto* Text=Cast<UTextBlock>(Widget))
  {
   const FString Label=Text->GetText().ToString();
   if(!Label.IsEmpty()&&!Label.StartsWith(TEXT("MEMORY RECALL /"))&&Label!=Str(ExerciseData,TEXT("kind")).ToUpper())Elements.Add({Label,MIN_int32,Label.Len()>240?18:22,false});
   return;
  }
  if(auto* Panel=Cast<UPanelWidget>(Widget))for(int32 I=0;I<Panel->GetChildrenCount();I++)Visit(Panel->GetChildAt(I));
 };
 Visit(Body);return Elements;
}
void UWordQuestExerciseWidget::SetWorldAnswer(const FString& Answer){if(Input)Input->SetText(FText::FromString(Answer));}
int32 UWordQuestExerciseWidget::NativePaint(const FPaintArgs& Args,const FGeometry& Geo,const FSlateRect& Clip,FSlateWindowElementList& Elements,int32 Layer,const FWidgetStyle& Style,bool ParentEnabled)const
{
 int32 L=Super::NativePaint(Args,Geo,Clip,Elements,Layer,Style,ParentEnabled);
 const FVector2D Size=Geo.GetLocalSize(),Center(Size.X-40,40);const float Radius=11;
 TArray<FVector2D> Ring;for(int32 I=0;I<=64;I++){float A=2*PI*I/64;Ring.Add(Center+FVector2D(FMath::Cos(A),FMath::Sin(A))*Radius);}
 FSlateDrawElement::MakeLines(Elements,++L,Geo.ToPaintGeometry(),Ring,ESlateDrawEffect::None,FLinearColor(.72,.82,.84,.1),true,.7);
 TArray<FVector2D> Restored;for(int32 I=0;I<=FMath::CeilToInt(64*Completeness);I++){float A=-PI*.5+2*PI*I/64;Restored.Add(Center+FVector2D(FMath::Cos(A),FMath::Sin(A))*Radius);}
 if(Restored.Num()>1)FSlateDrawElement::MakeLines(Elements,++L,Geo.ToPaintGeometry(),Restored,ESlateDrawEffect::None,FLinearColor(.72,.82,.84,.26),true,.8);
 return L;
}

bool UWordQuestExerciseWidget::ExportResponsiveUI(int32 Width,int32 Height,const FString& Name){
 if(Width<320||Height<320||Width>4096||Height>4096||Name.Contains(TEXT(".."))||Name.Contains(TEXT("/")))return false;
 FWidgetRenderer Renderer(true,true);auto* Target=Renderer.DrawWidget(TakeWidget(),FVector2D(Width,Height));if(!Target)return false;
 FlushRenderingCommands();TArray<FColor> Pixels;if(!Target->GameThread_GetRenderTargetResource()->ReadPixels(Pixels)||Pixels.Num()!=Width*Height)return false;
 TArray64<uint8> PNG;FImageUtils::PNGCompressImageArray(Width,Height,Pixels,PNG);FString Folder=FPaths::ProjectDir()/TEXT("Docs/qa/c9-exercises");IFileManager::Get().MakeDirectory(*Folder,true);return FFileHelper::SaveArrayToFile(PNG,*(Folder/(Name+TEXT(".png"))));
}
