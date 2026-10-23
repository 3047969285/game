#include "WordQuestMemoryFragment.h"
#include "WordQuestExerciseWidget.h"
#include "Blueprint/WidgetTree.h"
#include "Components/WidgetComponent.h"
#include "Components/SceneComponent.h"
#include "Components/StaticMeshComponent.h"
#include "Engine/StaticMesh.h"
#include "Components/TextBlock.h"
#include "Components/Button.h"
#include "Components/Border.h"
#include "Components/EditableTextBox.h"
#include "Components/VerticalBox.h"
#include "Components/HorizontalBox.h"
#include "Materials/MaterialInstanceDynamic.h"
#include "Styling/CoreStyle.h"
#include "Misc/Paths.h"

void UWordQuestMemoryFragmentWidget::Setup(UWordQuestExerciseWidget* Controller,const FWordQuestMemoryElement& Element)
{
 Host=Controller;Action=Element.Action;
 WidgetTree=NewObject<UWidgetTree>(this,TEXT("WorldMemoryTree"));
 auto* Root=WidgetTree->ConstructWidget<UBorder>();Root->SetBrushColor(FLinearColor::Transparent);Root->SetPadding(FMargin(18,12));WidgetTree->RootWidget=Root;
 const FLinearColor Ink(.925f,.929f,.898f,.94f);
 FSlateFontInfo Font(FPaths::EngineContentDir()/TEXT("Slate/Fonts/DroidSansMono.ttf"),Element.FontSize);
 if(Element.bInput)
 {
  Editor=WidgetTree->ConstructWidget<UEditableTextBox>();Editor->SetText(FText::FromString(Element.Text));Editor->SetForegroundColor(Ink);
  auto Style=Editor->GetWidgetStyle();Style.SetFont(Font);Style.BackgroundImageNormal.DrawAs=ESlateBrushDrawType::NoDrawType;Style.BackgroundImageHovered.DrawAs=ESlateBrushDrawType::NoDrawType;Style.BackgroundImageFocused.DrawAs=ESlateBrushDrawType::NoDrawType;Style.ForegroundColor=FSlateColor(Ink);Editor->SetWidgetStyle(Style);
  Editor->OnTextChanged.AddDynamic(this,&UWordQuestMemoryFragmentWidget::Changed);Root->AddChild(Editor);
 }
 else if(!Element.Highlights.IsEmpty())
 {
  // 世界内句子：按词排版，命中的 word form 用冷光色标亮（Claude text_words 方案）
  auto* Box=WidgetTree->ConstructWidget<UVerticalBox>();
  TArray<FString> Words;Element.Text.ParseIntoArrayWS(Words);
  TArray<TArray<FString>> Lines;TArray<FString> Line;int32 Used=0;
  for(const FString& W:Words){if(Used+W.Len()+1>72&&Line.Num()){Lines.Add(Line);Line.Reset();Used=0;}Line.Add(W);Used+=W.Len()+1;}
  if(Line.Num())Lines.Add(Line);
  auto Normal=[](FString S){S.ToLowerInline();FString Out;for(TCHAR C:S)if(FChar::IsAlnum(C))Out.AppendChar(C);return Out;};
  for(const auto& Row:Lines)
  {
   auto* H=WidgetTree->ConstructWidget<UHorizontalBox>();
   for(const FString& W:Row)
   {
    bool bHot=false;const FString N=Normal(W);
    for(const FString& Form:Element.Highlights)if(Normal(Form)==N){bHot=true;break;}
    auto* Part=WidgetTree->ConstructWidget<UTextBlock>();Part->SetText(FText::FromString(W+TEXT(" ")));Part->SetFont(Font);
    Part->SetColorAndOpacity(FSlateColor(bHot?FLinearColor(.55f,.95f,1.f,1.f):Ink));
    if(bHot){FSlateFontInfo Bold=Font;Bold.Size=Font.Size+1;Part->SetFont(Bold);}
    H->AddChild(Part);
   }
   Box->AddChild(H);
  }
  Root->AddChild(Box);
 }
 else
 {
  Label=WidgetTree->ConstructWidget<UTextBlock>();Label->SetText(FText::FromString(Element.Text));Label->SetFont(Font);Label->SetAutoWrapText(true);Label->SetColorAndOpacity(Ink);Label->SetJustification(ETextJustify::Left);
  if(Action!=MIN_int32)
  {
   auto* Button=WidgetTree->ConstructWidget<UButton>();auto Style=Button->GetStyle();Style.Normal.DrawAs=ESlateBrushDrawType::NoDrawType;Style.Hovered.DrawAs=ESlateBrushDrawType::NoDrawType;Style.Pressed.DrawAs=ESlateBrushDrawType::NoDrawType;Button->SetStyle(Style);Button->SetBackgroundColor(FLinearColor::Transparent);Button->OnClicked.AddDynamic(this,&UWordQuestMemoryFragmentWidget::Press);Button->AddChild(Label);Root->AddChild(Button);
  }
  else Root->AddChild(Label);
 }
}
void UWordQuestMemoryFragmentWidget::Press(){if(Host)Host->HandleAction(Action);}
void UWordQuestMemoryFragmentWidget::Changed(const FText& Text){if(Host)Host->SetWorldAnswer(Text.ToString());}
void UWordQuestMemoryFragmentWidget::SetIntensity(float Alpha){SetRenderOpacity(FMath::Clamp(Alpha,0.f,1.f));}
void UWordQuestMemoryFragmentWidget::SetText(const FString& Text){if(Label)Label->SetText(FText::FromString(Text));}
void UWordQuestMemoryFragmentWidget::FocusInput(){if(Editor)Editor->SetKeyboardFocus();}
UWidget* UWordQuestMemoryFragmentWidget::GetInputWidget()const{return Editor.Get();}

AWordQuestMemoryFragment::AWordQuestMemoryFragment()
{
 PrimaryActorTick.bCanEverTick=false;
 RootComponent=CreateDefaultSubobject<USceneComponent>(TEXT("Anchor"));
 Glass=CreateDefaultSubobject<UStaticMeshComponent>(TEXT("OpticalGlass"));Glass->SetupAttachment(RootComponent);Glass->SetCollisionEnabled(ECollisionEnabled::NoCollision);Glass->SetCastShadow(false);
 Surface=CreateDefaultSubobject<UWidgetComponent>(TEXT("WorldGlyphs"));Surface->SetupAttachment(RootComponent);Surface->SetWidgetSpace(EWidgetSpace::World);Surface->SetTwoSided(true);Surface->SetDrawAtDesiredSize(false);Surface->SetPivot(FVector2D(.5,.5));Surface->SetTickMode(ETickMode::Enabled);Surface->SetTickWhenOffscreen(true);Surface->SetWindowFocusable(true);Surface->SetCollisionEnabled(ECollisionEnabled::QueryOnly);Surface->SetCollisionResponseToAllChannels(ECR_Ignore);Surface->SetCollisionResponseToChannel(ECC_Visibility,ECR_Block);Surface->SetBlendMode(EWidgetBlendMode::Transparent);Surface->SetRelativeLocation(FVector(1,0,0));Surface->PrimaryComponentTick.bTickEvenWhenPaused=true;
 Tags.Add(TEXT("memory_world_surface"));
}
void AWordQuestMemoryFragment::Setup(UWordQuestExerciseWidget* Host,const FWordQuestMemoryElement& Element,bool bGlass,FVector2D Pixels)
{
 Action=Element.Action;bInput=Element.bInput;bHasGlass=bGlass;HighlightWords=Element.HighlightWords;
 Surface->SetTintColorAndOpacity(FLinearColor(8.f,8.f,8.f,1.f));
 Surface->SetDrawSize(Pixels);Surface->SetRelativeScale3D(FVector(.075f));
 Content=CreateWidget<UWordQuestMemoryFragmentWidget>(GetWorld());Content->Setup(Host,Element);Surface->SetWidget(Content);
 Glass->SetVisibility(bGlass);
 if(bGlass)
 {
  Glass->SetStaticMesh(LoadObject<UStaticMesh>(nullptr,TEXT("/Engine/BasicShapes/Cube.Cube")));Glass->SetRelativeScale3D(FVector(.006f,Pixels.X*.00075f,Pixels.Y*.00075f));
  UMaterialInterface* Base=LoadObject<UMaterialInterface>(nullptr,TEXT("/Game/Memory/Materials/M_MemoryFragmentGlass.M_MemoryFragmentGlass"));
  if(!Base)Base=LoadObject<UMaterialInterface>(nullptr,TEXT("/Game/Memory/Materials/MI_Reveal_MI_tv_M_tv_glass.MI_Reveal_MI_tv_M_tv_glass"));
  if(Base){auto* MI=UMaterialInstanceDynamic::Create(Base,this);MI->SetVectorParameterValue(TEXT("BaseColor"),FLinearColor(.45,.63,.68));MI->SetScalarParameterValue(TEXT("Opacity"),.045);MI->SetScalarParameterValue(TEXT("Roughness"),.18);MI->SetScalarParameterValue(TEXT("MemoryReveal"),1);Glass->SetMaterial(0,MI);}
  else {bHasGlass=false;Glass->SetVisibility(false);Tags.Add(TEXT("needs_fragment_material"));}
 }
 RestLocation=GetActorLocation();
}
void AWordQuestMemoryFragment::SetIntensity(float Alpha){if(Content)Content->SetIntensity(Alpha);Glass->SetVisibility(bHasGlass&&Alpha>.05f);}
void AWordQuestMemoryFragment::SetText(const FString& Text){if(Content)Content->SetText(Text);}
void AWordQuestMemoryFragment::FocusInput(){if(Content)Content->FocusInput();}
UWidget* AWordQuestMemoryFragment::GetInputWidget()const{return Content?Content->GetInputWidget():nullptr;}

bool AWordQuestMemoryFragment::IsWorldSpace() const { return Surface && bWorldSpace; }
