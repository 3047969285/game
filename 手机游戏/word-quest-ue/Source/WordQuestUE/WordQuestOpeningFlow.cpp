#include "WordQuestOpeningFlow.h"
#include "Camera/CameraActor.h"
#include "Blueprint/WidgetTree.h"
#include "Components/WidgetComponent.h"
#include "Components/TextBlock.h"
#include "Styling/CoreStyle.h"
#include "Dom/JsonObject.h"

#include "Engine/World.h"
#include "EngineUtils.h"
#include "GameFramework/PlayerController.h"
#include "InputCoreTypes.h"
#include "Kismet/GameplayStatics.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"

void UWordQuestOpeningTextWidget::SetLine(const FString& Value, bool bOption)
{
 if (!Label)
 {
  WidgetTree=NewObject<UWidgetTree>(this,TEXT("OpeningWorldTextTree"));
  Label=WidgetTree->ConstructWidget<UTextBlock>();
  WidgetTree->RootWidget=Label;
  Label->SetJustification(ETextJustify::Center);
  Label->SetAutoWrapText(true);
  Label->SetMargin(FMargin(12,8));
  Label->SetShadowOffset(FVector2D(1,2));
  Label->SetShadowColorAndOpacity(FLinearColor(.005,.015,.03,.7));
 }
 // Composite Slate font invokes the engine's localized fallback for CJK glyphs.
 Label->SetFont(FCoreStyle::GetDefaultFontStyle(TEXT("Regular"),bOption?34:36));
 Label->SetColorAndOpacity(FSlateColor(FLinearColor(.65,.88,1.f,.94)));
 Label->SetText(FText::FromString(Value));
}

UWordQuestOpeningFlow::UWordQuestOpeningFlow() { PrimaryComponentTick.bCanEverTick = true; }
void UWordQuestOpeningFlow::Fail(const FString& Reason)
{
 Phase = TEXT("error"); Error = Reason;
 UE_LOG(LogTemp, Error, TEXT("OpeningFlow: %s"), *Reason);
}
bool UWordQuestOpeningFlow::LoadScript()
{
 FString Raw; TSharedPtr<FJsonObject> Root;
 if (!FFileHelper::LoadFileToString(Raw, *(FPaths::ProjectContentDir()/TEXT("Data/memory/acts.json"))) ||
 !FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Raw), Root) || !Root.IsValid()) { Fail(TEXT("invalid_acts_json")); return false; }
 const TSharedPtr<FJsonObject>* Prologue;
 if (!Root->TryGetObjectField(TEXT("prologue"), Prologue) || (*Prologue)->GetStringField(TEXT("stage")) != TEXT("apartment2090")) { Fail(TEXT("missing_apartment2090_prologue")); return false; }
 const TArray<TSharedPtr<FJsonValue>>* Values;
 if (!(*Prologue)->TryGetArrayField(TEXT("lines"), Values) || Values->Num() == 0) { Fail(TEXT("missing_prologue_lines")); return false; }
 const TArray<TSharedPtr<FJsonValue>>* Actors;
 bool bOldActor = false;
 if ((*Prologue)->TryGetArrayField(TEXT("actors"), Actors))
  for (const auto& Actor : *Actors)
  {
   const auto Object = Actor->AsObject(); FString Id;
   if (Object.IsValid() && Object->TryGetStringField(TEXT("id"), Id) && Id == TEXT("old2090")) bOldActor=true;
  }
 if (!bOldActor) { Fail(TEXT("missing_old2090_script_actor")); return false; }
 bool bChoice = false;
 for (const auto& Value : *Values)
 {
  const auto Object = Value->AsObject(); FString Kind, Text, Zh;
  if (!Object.IsValid() || !Object->TryGetStringField(TEXT("kind"), Kind) || !Object->TryGetStringField(TEXT("text"), Text) || !Object->TryGetStringField(TEXT("zh"), Zh)) { Fail(TEXT("invalid_prologue_line")); return false; }
  if (Kind == TEXT("choice"))
  {
   const TArray<TSharedPtr<FJsonValue>>* Options;
   if (!Object->TryGetArrayField(TEXT("options"), Options) || Options->Num() != 2) { Fail(TEXT("invalid_recall_choice")); return false; }
   for (int32 I=0; I<2; ++I)
   {
    const auto Option = (*Options)[I]->AsObject(); FString Label, Reply; bool Correct;
    if (!Option.IsValid() || !Option->TryGetStringField(TEXT("label"),Label) || !Option->TryGetStringField(TEXT("reply"),Reply) || !Option->TryGetBoolField(TEXT("correct"),Correct) || Correct != (I==0)) { Fail(TEXT("invalid_recall_option")); return false; }
   }
   bChoice = true;
  }
  else if (Kind != TEXT("narrate") || bChoice) { Fail(TEXT("unsupported_prologue_order")); return false; }
  Lines.Add(Object);
 }
 if (!bChoice || Lines.Last()->GetStringField(TEXT("kind")) != TEXT("choice")) { Fail(TEXT("missing_recall_choice")); return false; }
 return true;
}
void UWordQuestOpeningFlow::BeginPlay()
{
 Super::BeginPlay(); AActor* AnchorActor = nullptr; int32 Cameras=0, Anchors=0;
 for (TActorIterator<AActor> It(GetWorld()); It; ++It)
 {
  if (It->ActorHasTag(TEXT("opening_camera"))) { Camera=Cast<ACameraActor>(*It); ++Cameras; }
  if (It->ActorHasTag(TEXT("opening_memory_anchor"))) { AnchorActor=*It; ++Anchors; }
 }
 if (Cameras==0 && Anchors==0)
 {
  if (GetWorld()->GetMapName().Contains(TEXT("Opening2090")) || GetWorld()->GetMapName().EndsWith(TEXT("L_Main"))) Fail(TEXT("missing_opening_scene_tags"));
  return;
 }
 if (Cameras!=1 || Anchors!=1 || !Camera || !AnchorActor) { Fail(TEXT("opening_requires_unique_camera_and_anchor")); return; }
 if (!LoadScript()) return;
 Controller=UGameplayStatics::GetPlayerController(GetWorld(),0);
 if (!Controller) { Fail(TEXT("missing_player_controller")); return; }
 // The anchor remains an authored scene prerequisite. Place its text in a readable
 // world-space plane once, rather than following the camera like a screen HUD.
 Anchor=Camera->GetActorLocation()+Camera->GetActorForwardVector()*170.f+Camera->GetActorUpVector()*8.f;
 CameraStart=Camera->GetActorTransform();
 PreviousView=Controller->GetViewTarget(); Controller->SetViewTargetWithBlend(Camera,1.f);
 Controller->SetIgnoreMoveInput(true); Controller->SetIgnoreLookInput(true); Controller->bShowMouseCursor=true;
 Phase=TEXT("narration"); ShowLine();
}
void UWordQuestOpeningFlow::EndPlay(const EEndPlayReason::Type Reason)
{
 for (auto Text : Texts) if (IsValid(Text)) Text->Destroy();
 if (Controller) { Controller->SetIgnoreMoveInput(false); Controller->SetIgnoreLookInput(false); if (PreviousView) Controller->SetViewTarget(PreviousView); }
 Super::EndPlay(Reason);
}
void UWordQuestOpeningFlow::SetText(int32 Index, const FString& Value, const FVector& Position)
{
 while (Texts.Num()<=Index)
 {
  auto* Actor=GetWorld()->SpawnActor<AActor>();
  if (!Actor) return;
  auto* Render=NewObject<UWidgetComponent>(Actor,TEXT("OpeningWorldText"));
  Actor->AddInstanceComponent(Render); Actor->SetRootComponent(Render);
  Render->SetWidgetSpace(EWidgetSpace::World);
  Render->SetBlendMode(EWidgetBlendMode::Transparent);
  Render->SetTwoSided(true); Render->SetDrawSize(FVector2D(Index==0?1100:400,Index==0?420:120));
  Render->SetPivot(FVector2D(.5,.5)); Render->SetCollisionEnabled(ECollisionEnabled::NoCollision);
  Render->SetTintColorAndOpacity(FLinearColor(8.f,8.f,8.f,1.f));
  auto* Widget=CreateWidget<UWordQuestOpeningTextWidget>(Controller,UWordQuestOpeningTextWidget::StaticClass());
  if (!Widget) { Actor->Destroy(); return; }
  Widget->SetLine(TEXT(""),Index!=0); Render->SetWidget(Widget);
  Render->RegisterComponent(); Actor->SetActorScale3D(FVector(.09));
  Texts.Add(Actor);
 }
 auto* Text=Texts[Index].Get(); if (!Text) return;
 Text->SetActorLocation(Position); Text->SetActorRotation((Camera->GetActorLocation()-Position).Rotation());
 if (auto* Render=Text->FindComponentByClass<UWidgetComponent>())
  if (auto* Widget=Cast<UWordQuestOpeningTextWidget>(Render->GetUserWidgetObject())) Widget->SetLine(Value,Index!=0);
}
void UWordQuestOpeningFlow::ShowLine()
{
 Elapsed=0; const auto& Entry=Lines[Line];
 SetText(0,Entry->GetStringField(TEXT("text"))+TEXT("\n")+Entry->GetStringField(TEXT("zh")),Anchor);
 if (Entry->GetStringField(TEXT("kind"))==TEXT("choice"))
 {
  Phase=TEXT("waiting"); const auto Options=Entry->GetArrayField(TEXT("options"));
  for (int32 I=0; I<2; ++I) SetText(I+1,Options[I]->AsObject()->GetStringField(TEXT("label")),Anchor+Camera->GetActorRightVector()*(I==0?-24.f:24.f)-Camera->GetActorUpVector()*26.f);
 }
 UE_LOG(LogTemp,Display,TEXT("OpeningFlow %s"),*GetOpeningState());
}
FString UWordQuestOpeningFlow::GetOpeningState() const { return FString::Printf(TEXT("phase=%s line=%d error=%s"),*Phase,Line,*Error); }
void UWordQuestOpeningFlow::AdvanceOpening()
{
 if (Phase==TEXT("narration")) { if (Line+1<Lines.Num()) { ++Line; ShowLine(); } }
 else if (Phase==TEXT("waiting")) { if (Choice==0) ConfirmRecall(); else WaitBeforeRecall(); }
}
void UWordQuestOpeningFlow::ConfirmRecall() { if (Phase==TEXT("waiting")) BeginRecall(); }
void UWordQuestOpeningFlow::WaitBeforeRecall()
{
 if (Phase!=TEXT("waiting")) return;
 Phase=TEXT("pause"); Elapsed=0;
 SetText(0,Lines.Last()->GetArrayField(TEXT("options"))[1]->AsObject()->GetStringField(TEXT("reply")),Anchor);
 for (int32 I=1; I<Texts.Num(); ++I) SetText(I,TEXT(""),Texts[I]->GetActorLocation());
}
void UWordQuestOpeningFlow::SkipOpening() { if (Phase==TEXT("narration") || Phase==TEXT("waiting") || Phase==TEXT("pause")) BeginRecall(); }
void UWordQuestOpeningFlow::BeginRecall()
{
 Phase=TEXT("transition"); Elapsed=0; CameraStart=Camera->GetActorTransform();
 for (int32 I=1; I<Texts.Num(); ++I) SetText(I,TEXT(""),Texts[I]->GetActorLocation());
}
void UWordQuestOpeningFlow::SelectAt(float X,float Y)
{
 if (Phase!=TEXT("waiting")) { AdvanceOpening(); return; }
 FVector Origin, Direction; if (!Controller->DeprojectScreenPositionToWorld(X,Y,Origin,Direction)) return;
 int32 Selected=-1; float BestDistance=TNumericLimits<float>::Max();
 for (int32 I=1; I<Texts.Num(); ++I) if (Texts[I])
 {
  const auto* Text=Texts[I].Get(); const FVector Normal=Text->GetActorForwardVector();
  const float Denominator=FVector::DotProduct(Direction,Normal);
  if (FMath::Abs(Denominator)<KINDA_SMALL_NUMBER) continue;
  const float Distance=FVector::DotProduct(Text->GetActorLocation()-Origin,Normal)/Denominator;
  if (Distance<=0 || Distance>=BestDistance) continue;
  const FVector Local=Text->GetActorTransform().InverseTransformPosition(Origin+Direction*Distance);
  // WidgetComponent lies in its local Y/Z plane; dimensions match DrawSize.
  if (FMath::Abs(Local.Y)<=200.f && FMath::Abs(Local.Z)<=60.f)
  { BestDistance=Distance; Selected=I-1; }
 }
 if (Selected>=0) { Choice=Selected; AdvanceOpening(); }
}
void UWordQuestOpeningFlow::TickComponent(float Dt,ELevelTick Type,FActorComponentTickFunction* Fn)
{
 Super::TickComponent(Dt,Type,Fn);
 if (!Controller || Phase==TEXT("error") || Phase==TEXT("inactive") || Phase==TEXT("loading")) return;
 Elapsed+=Dt;
 if (Phase==TEXT("transition"))
 {
  const float T=FMath::Clamp(Elapsed/3.f,0.f,1.f); const float Smooth=T*T*(3-2*T);
  // Stay within the authored camera envelope; never move through scene geometry.
  const FVector Start=CameraStart.GetLocation(), End=Start+CameraStart.GetRotation().GetForwardVector()*12.f;
  FHitResult Hit; FCollisionQueryParams Params; Params.AddIgnoredActor(Camera);
  if (!GetWorld()->LineTraceSingleByChannel(Hit,Start,End,ECC_Visibility,Params)) Camera->SetActorLocation(FMath::Lerp(Start,End,Smooth));
  SetText(0,FString::Printf(TEXT("2090  →  %04d\n%s"),FMath::RoundToInt(FMath::Lerp(2090.f,2026.f,Smooth)),(FMath::FloorToInt(Elapsed*10)%2)?TEXT("━━━━━━━━━━━━"):TEXT("────────────")),Anchor+FVector(0,0,20.f*FMath::Sin(T*PI)));
  if (Elapsed>=3.f) { Phase=TEXT("loading"); UGameplayStatics::OpenLevel(this,FName(TEXT("/Game/Memory/Scenes/U01/L_U01_A"))); }
  return;
 }
 if (Phase==TEXT("pause") && Elapsed>=4.f) { Choice=0; ShowLine(); }
 if (Phase==TEXT("narration") && Elapsed>=FMath::Max(6.f,Lines[Line]->GetStringField(TEXT("text")).Len()/12.f)) AdvanceOpening();
 if (Controller->WasInputKeyJustPressed(EKeys::Left) || Controller->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Left)) Choice=0;
 if (Controller->WasInputKeyJustPressed(EKeys::Right) || Controller->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Right)) Choice=1;
 if (Controller->WasInputKeyJustPressed(EKeys::Enter) || Controller->WasInputKeyJustPressed(EKeys::SpaceBar) || Controller->WasInputKeyJustPressed(EKeys::Gamepad_FaceButton_Bottom)) AdvanceOpening();
 if (Controller->WasInputKeyJustPressed(EKeys::Escape) || Controller->WasInputKeyJustPressed(EKeys::Gamepad_Special_Right)) SkipOpening();
 if (Controller->WasInputKeyJustPressed(EKeys::LeftMouseButton)) { float X,Y; if (Controller->GetMousePosition(X,Y)) SelectAt(X,Y); }
 float X,Y; bool Down=false; Controller->GetInputTouchState(ETouchIndex::Touch1,X,Y,Down);
 if (Down && !bTouchWasDown) SelectAt(X,Y); bTouchWasDown=Down;
}
