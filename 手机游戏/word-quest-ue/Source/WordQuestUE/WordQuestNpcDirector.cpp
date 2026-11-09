#include "WordQuestNpcDirector.h"
#include "WordQuestNpcDialogueClient.h"
#include "WordQuestNpcMotion.h"
#include "WordQuestNpcSpeech.h"
#include "Blueprint/WidgetTree.h"
#include "Components/WidgetComponent.h"
#include "Components/WidgetInteractionComponent.h"
#include "Components/TextBlock.h"
#include "Components/EditableTextBox.h"
#include "Components/Button.h"
#include "Components/VerticalBox.h"
#include "Components/SkeletalMeshComponent.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/Pawn.h"
#include "Kismet/GameplayStatics.h"
#include "EngineUtils.h"
#include "Engine/Engine.h"
#include "Engine/World.h"
#include "TextToSpeechEngineSubsystem.h"
#include "Styling/CoreStyle.h"
#include "WordQuestMemoryDirector.h"

void UWordQuestNpcWorldWidget::Setup(UWordQuestNpcDirector* InHost)
{
 Host=InHost;WidgetTree=NewObject<UWidgetTree>(this,TEXT("NpcWorldTextTree"));auto* Box=WidgetTree->ConstructWidget<UVerticalBox>();WidgetTree->RootWidget=Box;
 auto MakeText=[&](int32 Size){auto* T=WidgetTree->ConstructWidget<UTextBlock>();T->SetFont(FCoreStyle::GetDefaultFontStyle(TEXT("Regular"),Size));T->SetColorAndOpacity(FLinearColor(.72f,.88f,.93f,.95f));T->SetAutoWrapText(true);Box->AddChildToVerticalBox(T);return T;};
 Heading=MakeText(20);Speech=MakeText(27);
 Entry=WidgetTree->ConstructWidget<UEditableTextBox>();auto Style=Entry->GetWidgetStyle();Style.SetFont(FCoreStyle::GetDefaultFontStyle(TEXT("Regular"),24));Style.BackgroundImageNormal.DrawAs=ESlateBrushDrawType::NoDrawType;Style.BackgroundImageHovered.DrawAs=ESlateBrushDrawType::NoDrawType;Style.BackgroundImageFocused.DrawAs=ESlateBrushDrawType::NoDrawType;Style.ForegroundColor=FSlateColor(FLinearColor(.8f,.94f,1.f,.9f));Entry->SetWidgetStyle(Style);Entry->SetHintText(FText::FromString(TEXT("…")));Entry->OnTextCommitted.AddDynamic(this,&UWordQuestNpcWorldWidget::Commit);Box->AddChildToVerticalBox(Entry);
 for(int32 I=0;I<3;++I)
 {
  auto* B=WidgetTree->ConstructWidget<UButton>();auto S=B->GetStyle();S.Normal.DrawAs=S.Hovered.DrawAs=S.Pressed.DrawAs=ESlateBrushDrawType::NoDrawType;B->SetStyle(S);B->SetBackgroundColor(FLinearColor::Transparent);Box->AddChildToVerticalBox(B);
  auto* L=WidgetTree->ConstructWidget<UTextBlock>();L->SetFont(FCoreStyle::GetDefaultFontStyle(TEXT("Regular"),21));L->SetColorAndOpacity(FLinearColor(.68,.84,.88,.8));L->SetAutoWrapText(true);B->AddChild(L);ReplyLabels.Add(L);
  if(I==0)B->OnClicked.AddDynamic(this,&UWordQuestNpcWorldWidget::Reply0);if(I==1)B->OnClicked.AddDynamic(this,&UWordQuestNpcWorldWidget::Reply1);if(I==2)B->OnClicked.AddDynamic(this,&UWordQuestNpcWorldWidget::Reply2);
 }
}
void UWordQuestNpcWorldWidget::SetDialogue(const FString& Name,const FString& Text,const TArray<FString>& Replies){if(Heading)Heading->SetText(FText::FromString(Name));if(Speech)Speech->SetText(FText::FromString(Text));for(int32 I=0;I<ReplyLabels.Num();++I)ReplyLabels[I]->SetText(FText::FromString(Replies.IsValidIndex(I)?Replies[I]:FString()));}
void UWordQuestNpcWorldWidget::FocusEntry(){if(Entry)Entry->SetKeyboardFocus();}
void UWordQuestNpcWorldWidget::Commit(const FText& Text,ETextCommit::Type Method){if(Host&&Method==ETextCommit::OnEnter){Host->SubmitToNpc(FString(),Text.ToString());Entry->SetText(FText::GetEmpty());FocusEntry();}}
void UWordQuestNpcWorldWidget::Reply0(){if(Host)Host->SelectSuggestion(0);}
void UWordQuestNpcWorldWidget::Reply1(){if(Host)Host->SelectSuggestion(1);}
void UWordQuestNpcWorldWidget::Reply2(){if(Host)Host->SelectSuggestion(2);}
UWordQuestNpcDirector::UWordQuestNpcDirector(){PrimaryComponentTick.bCanEverTick=true;}
void UWordQuestNpcDirector::BeginPlay(){Super::BeginPlay();Pointer=NewObject<UWidgetInteractionComponent>(GetOwner(),TEXT("NpcWorldPointer"));Pointer->InteractionSource=EWidgetInteractionSource::Custom;Pointer->InteractionDistance=500;Pointer->RegisterComponent();}
void UWordQuestNpcDirector::EndPlay(const EEndPlayReason::Type Reason){CloseDialogue();for(auto& Pair:Clients)if(Pair.Value)Pair.Value->Cancel();if(Pointer)Pointer->DestroyComponent();Super::EndPlay(Reason);}
FVector UWordQuestNpcDirector::HeadLocation(AActor* Actor)const{if(!Actor)return FVector::ZeroVector;if(auto* Mesh=Actor->FindComponentByClass<USkeletalMeshComponent>())if(Mesh->DoesSocketExist(TEXT("head")))return Mesh->GetSocketLocation(TEXT("head"));return Actor->GetActorLocation()+FVector(0,0,150);}
bool UWordQuestNpcWorldWidget::IsEditingText()const{return Entry&&Entry->HasKeyboardFocus();}
void UWordQuestNpcWorldWidget::SetChoiceFocus(int32 Index){for(int32 I=0;I<ReplyLabels.Num();++I)ReplyLabels[I]->SetColorAndOpacity(I==Index?FLinearColor(.85f,.96f,1.f,1.f):FLinearColor(.68f,.84f,.88f,.8f));}
bool UWordQuestNpcDirector::Open(AActor* Actor,const FString& Role,const FString& Scene)
{
 if(!Actor)return false;
 auto& Client=Clients.FindOrAdd(Role);
 if(!Client){Client=NewObject<UWordQuestNpcDialogueClient>(this);Client->OnText.AddDynamic(this,&UWordQuestNpcDirector::StreamText);Client->OnFinished.AddDynamic(this,&UWordQuestNpcDirector::StreamFinished);}
 if(!Client->Configure(Role,Scene)){State=Client->GetState();return false;}
 Target=Actor;ActiveRole=Role;ActiveScene=Scene;bConversationInputActive=true;State=TEXT("conversation");
 SurfaceActor=GetWorld()->SpawnActor<AActor>();Surface=NewObject<UWidgetComponent>(SurfaceActor,TEXT("NpcWorldSubtitle"));SurfaceActor->SetRootComponent(Surface);Surface->RegisterComponent();Surface->SetWidgetSpace(EWidgetSpace::World);Surface->SetDrawSize(FVector2D(1000,520));Surface->SetRelativeScale3D(FVector(.07));Surface->SetTwoSided(true);Surface->SetBlendMode(EWidgetBlendMode::Transparent);Surface->SetTintColorAndOpacity(FLinearColor(8,8,8,1));Surface->SetCollisionEnabled(ECollisionEnabled::QueryOnly);Surface->SetCollisionResponseToAllChannels(ECR_Ignore);Surface->SetCollisionResponseToChannel(ECC_Visibility,ECR_Block);
 Widget=CreateWidget<UWordQuestNpcWorldWidget>(GetWorld());Widget->Setup(this);Surface->SetWidget(Widget);SurfaceActor->Tags.Add(TEXT("npc_world_dialogue"));
 if(auto* PC=UGameplayStatics::GetPlayerController(this,0)){PC->bShowMouseCursor=true;FInputModeGameAndUI Mode;Mode.SetHideCursorDuringCapture(false);PC->SetInputMode(Mode);}RefreshWidget();Widget->FocusEntry();SpeechChannel=FName(*(TEXT("NPC_")+Role));LastSpokenPrefix.Reset();SpeechQueue.Reset();
 FString VoiceReport;
 if(auto* TTS=GEngine?GEngine->GetEngineSubsystem<UTextToSpeechEngineSubsystem>():nullptr)WordQuestNpcSpeech::ConfigureChannel(TTS,SpeechChannel,Role,VoiceReport);
 if(VoiceReport.StartsWith(TEXT("native_named")))Actor->Tags.Remove(TEXT("needs_voice_backend"));else Actor->Tags.AddUnique(TEXT("needs_voice_backend"));Actor->Tags.AddUnique(TEXT("needs_npc_gaze_rig"));return true;
}
bool UWordQuestNpcDirector::SubmitToNpc(const FString& Role,const FString& Text)
{
 if(!bConversationInputActive||(!Role.IsEmpty()&&Role!=ActiveRole))return false;auto* Client=Clients.FindRef(ActiveRole).Get();if(!Client)return false;LastSpokenPrefix.Reset();SpeechQueue.Reset();if(auto* TTS=GEngine?GEngine->GetEngineSubsystem<UTextToSpeechEngineSubsystem>():nullptr)TTS->StopSpeakingOnChannel(SpeechChannel);const bool Result=Client->Submit(Text);RefreshWidget();return Result;
}
bool UWordQuestNpcDirector::SelectSuggestion(int32 Index){auto* Client=Clients.FindRef(ActiveRole).Get();if(!Client)return false;const auto Replies=Client->GetSuggestions();return Replies.IsValidIndex(Index)&&SubmitToNpc(ActiveRole,Replies[Index]);}
void UWordQuestNpcDirector::RefreshWidget(){auto* Client=Clients.FindRef(ActiveRole).Get();if(Widget&&Client)Widget->SetDialogue(Client->GetDisplayName(),Client->GetVisibleText(),Client->GetSuggestions());}
void UWordQuestNpcDirector::StreamText(FString Role,FString Text){if(Role==ActiveRole){RefreshWidget();QueueSpeech(Text,false);}}
void UWordQuestNpcDirector::StreamFinished(FString Role,FString Status){if(Role==ActiveRole){RefreshWidget();auto* Client=Clients.FindRef(Role).Get();if(Client)QueueSpeech(Client->GetVisibleText(),true);State=Status;}}
void UWordQuestNpcDirector::QueueSpeech(const FString& Text,bool Final)
{
 if(!Text.StartsWith(LastSpokenPrefix))LastSpokenPrefix.Reset();const FString Remaining=Text.Mid(LastSpokenPrefix.Len());int32 End=0;
 for(int32 I=0;I<Remaining.Len();++I)if(Remaining[I]=='.'||Remaining[I]=='!'||Remaining[I]=='?'){if(I+1==Remaining.Len()||FChar::IsWhitespace(Remaining[I+1])){const FString Sentence=Remaining.Mid(End,I-End+1).TrimStartAndEnd();if(!Sentence.IsEmpty())SpeechQueue.Add(Sentence);End=I+1;}}
 if(Final&&End<Remaining.Len()){const FString Tail=Remaining.Mid(End).TrimStartAndEnd();if(!Tail.IsEmpty())SpeechQueue.Add(Tail);End=Remaining.Len();}LastSpokenPrefix+=Remaining.Left(End);
}
void UWordQuestNpcDirector::CloseDialogue()
{
 if(AActor* Actor=Target.Get())if(auto* Motion=Actor->FindComponentByClass<UWordQuestNpcMotion>())Motion->ClearGazeTarget();
 if(bPointerDown&&Pointer)Pointer->ReleasePointerKey(EKeys::LeftMouseButton);bPointerDown=false;
 if(auto* Client=Clients.FindRef(ActiveRole).Get())Client->Cancel();if(auto* TTS=GEngine?GEngine->GetEngineSubsystem<UTextToSpeechEngineSubsystem>():nullptr)if(!SpeechChannel.IsNone()&&TTS->DoesChannelExist(SpeechChannel))TTS->RemoveChannel(SpeechChannel);
 if(SurfaceActor)SurfaceActor->Destroy();SurfaceActor=nullptr;Surface=nullptr;Widget=nullptr;Target.Reset();Candidate.Reset();GazeSeconds=0;Cooldown=1.f;bConversationInputActive=false;SpeechQueue.Reset();LastSpokenPrefix.Reset();ActiveRole.Reset();ActiveScene.Reset();State=TEXT("waiting");
 if(auto* PC=UGameplayStatics::GetPlayerController(this,0)){PC->bShowMouseCursor=false;FInputModeGameOnly Mode;PC->SetInputMode(Mode);}
}
void UWordQuestNpcDirector::TickComponent(float Dt,ELevelTick Type,FActorComponentTickFunction* Fn)
{
 Super::TickComponent(Dt,Type,Fn);auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC||UGameplayStatics::IsGamePaused(this))return;Cooldown=FMath::Max(0.f,Cooldown-Dt);
 if(auto* Director=GetOwner()->FindComponentByClass<UWordQuestMemoryDirector>()){const FString Playback=Director->GetPlaybackState();if(Playback.Contains(TEXT("transition=1"))||Playback.Contains(TEXT("world_input=1"))){if(bConversationInputActive)CloseDialogue();return;}}
 FVector Eye;FRotator View;PC->GetPlayerViewPoint(Eye,View);
 if(bConversationInputActive)
 {
  AActor* Actor=Target.Get();if(!Actor||Actor->IsHidden()||FVector::Dist(Eye,HeadLocation(Actor))>450||PC->WasInputKeyJustPressed(EKeys::Escape)||PC->WasInputKeyJustPressed(EKeys::Gamepad_Special_Right)||PC->WasInputKeyJustPressed(EKeys::Gamepad_FaceButton_Right)){CloseDialogue();return;}
  if(auto* Motion=Actor->FindComponentByClass<UWordQuestNpcMotion>())Motion->SetGazeTarget(Eye);
  const FRotator Look=(Eye-HeadLocation(Actor)).Rotation();LookAtYaw=FMath::Clamp(FMath::FindDeltaAngleDegrees(Actor->GetActorRotation().Yaw,Look.Yaw),-55.f,55.f);LookAtPitch=FMath::Clamp(Look.Pitch,-25.f,25.f);
  if(SurfaceActor){const FVector Location=HeadLocation(Actor)+FVector(0,0,28)+(Eye-HeadLocation(Actor)).GetSafeNormal()*22;SurfaceActor->SetActorLocation(Location);SurfaceActor->SetActorRotation((Eye-Location).Rotation());}
  if(auto* TTS=GEngine?GEngine->GetEngineSubsystem<UTextToSpeechEngineSubsystem>():nullptr)if(SpeechQueue.Num()&&!TTS->IsSpeakingOnChannel(SpeechChannel)){TTS->SpeakOnChannel(SpeechChannel,SpeechQueue[0]);SpeechQueue.RemoveAt(0);}
  float MX=0,MY=0,TX=0,TY=0;bool Touch=false;PC->GetInputTouchState(ETouchIndex::Touch1,TX,TY,Touch);
  const bool HasPointer=Touch||PC->GetMousePosition(MX,MY);if(Touch){MX=TX;MY=TY;}
  FVector Origin,Dir;FHitResult Hit;
  if(HasPointer&&PC->DeprojectScreenPositionToWorld(MX,MY,Origin,Dir))
  {FCollisionQueryParams Query(SCENE_QUERY_STAT(NpcWorldPointer),false);Query.AddIgnoredActor(Actor);GetWorld()->LineTraceSingleByChannel(Hit,Origin,Origin+Dir*600,ECC_Visibility,Query);Pointer->SetCustomHitResult(Hit);}
  const bool Down=Touch||PC->IsInputKeyDown(EKeys::LeftMouseButton);if(Down!=bPointerDown){if(Down)Pointer->PressPointerKey(EKeys::LeftMouseButton);else Pointer->ReleasePointerKey(EKeys::LeftMouseButton);bPointerDown=Down;}
  if(PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Down)||PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Right))FocusedSuggestion=(FocusedSuggestion+1)%3;
  if(PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Up)||PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Left))FocusedSuggestion=(FocusedSuggestion+2)%3;
  if(PC->WasInputKeyJustPressed(EKeys::Gamepad_FaceButton_Bottom))SelectSuggestion(FocusedSuggestion);
  Widget->SetChoiceFocus(FocusedSuggestion);
  for(int32 I=0;I<3;++I)if(PC->WasInputKeyJustPressed(I==0?EKeys::One:I==1?EKeys::Two:EKeys::Three)&&!Widget->IsEditingText())SelectSuggestion(I);return;
 }
 DiscoveryClock-=Dt;if(DiscoveryClock<=0){DiscoveryClock=1.f;Actors.Reset();for(TActorIterator<AActor> It(GetWorld());It;++It)for(FName Tag:It->Tags)if(Tag.ToString().StartsWith(TEXT("actor:"))){AActor* Actor=*It;Actors.Add(Actor);if(!Actor->FindComponentByClass<UWordQuestNpcMotion>()){FString Role=Tag.ToString().Mid(6),Scene;for(FName ActorTag:Actor->Tags){const FString S=ActorTag.ToString();if(S.StartsWith(TEXT("set:")))Scene=S.Mid(4);}if(!Scene.IsEmpty()){auto* Motion=NewObject<UWordQuestNpcMotion>(Actor);Actor->AddInstanceComponent(Motion);Motion->RegisterComponent();Motion->Configure(Role,Scene);}}break;}}
 if(Cooldown>0)return;AActor* Best=nullptr;float Score=.985f;
 for(const auto& Weak:Actors)
 {
  AActor* Actor=Weak.Get();if(!Actor||Actor->IsHidden())continue;const FVector Offset=HeadLocation(Actor)-Eye;const float Distance=Offset.Size();if(Distance<40||Distance>300)continue;const float Dot=FVector::DotProduct(View.Vector(),Offset.GetSafeNormal());if(Dot<=Score)continue;
  FHitResult Hit;FCollisionQueryParams Query(SCENE_QUERY_STAT(NpcGaze),false);Query.AddIgnoredActor(PC->GetPawn());Query.AddIgnoredActor(Actor);if(GetWorld()->LineTraceSingleByChannel(Hit,Eye,HeadLocation(Actor),ECC_Visibility,Query))continue;
  Best=Actor;Score=Dot;
 }
 if(Candidate.Get()!=Best){Candidate=Best;GazeSeconds=0;}if(!Best)return;GazeSeconds+=Dt;if(GazeSeconds<.5f)return;
 FString Role,Scene;for(FName Tag:Best->Tags){const FString S=Tag.ToString();if(S.StartsWith(TEXT("actor:")))Role=S.Mid(6);if(S.StartsWith(TEXT("set:")))Scene=S.Mid(4);}Open(Best,Role,Scene);GazeSeconds=0;Cooldown=1.f;
}
FString UWordQuestNpcDirector::GetNpcState()const{const auto* Client=Clients.FindRef(ActiveRole).Get();return FString::Printf(TEXT("state=%s role=%s input=%d world_widget=%d look_yaw=%.1f look_pitch=%.1f client={%s}"),*State,*ActiveRole,bConversationInputActive,Surface!=nullptr,LookAtYaw,LookAtPitch,Client?*Client->GetState():TEXT("none"));}
