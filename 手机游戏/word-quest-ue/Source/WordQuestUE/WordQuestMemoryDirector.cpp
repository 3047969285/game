#include "WordQuestMemoryDirector.h"
#include "WordQuestExerciseWidget.h"
#include "WordQuestMemoryFragment.h"
#include "Blueprint/UserWidget.h"
#include "WordQuestRenderDiagnostics.h"
#include "Components/WidgetInteractionComponent.h"
#include "Components/WidgetComponent.h"
#include "Components/StaticMeshComponent.h"
#include "Engine/StaticMesh.h"
#include "GameFramework/Pawn.h"
#include "GameFramework/PlayerInput.h"
#include "Camera/PlayerCameraManager.h"
#include "Camera/CameraActor.h"
#include "Camera/CameraComponent.h"
#include "UnrealClient.h"
#include "Sound/SoundWaveProcedural.h"
#include "InputCoreTypes.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "Misc/App.h"
#include "HAL/FileManager.h"
#include "Serialization/JsonSerializer.h"
#include "Kismet/GameplayStatics.h"
#include "EngineUtils.h"
#include "Engine/PostProcessVolume.h"
#include "Engine/PointLight.h"
#include "Components/PointLightComponent.h"
#include "Components/PrimitiveComponent.h"
#include "Components/MeshComponent.h"
#include "Materials/MaterialInstanceDynamic.h"
#include "Camera/CameraActor.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/WorldSettings.h"
#include "UnrealClient.h"

namespace {
TSharedPtr<FJsonObject> ReadJson(const FString& Relative)
{
 FString Text; TSharedPtr<FJsonObject> Result;
 if(FFileHelper::LoadFileToString(Text,*(FPaths::ProjectContentDir()/Relative)))
  FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Text),Result);
 return Result;
}
FString Field(TSharedPtr<FJsonObject> Object,const FString& Key)
{
 FString Value; if(Object) Object->TryGetStringField(Key,Value); return Value;
}
void SplitSentences(const FString& Paragraph,TArray<FString>& Out)
{
 FString Current;
 for(int32 Index=0;Index<Paragraph.Len();Index++)
 {
  const TCHAR C=Paragraph[Index]; Current.AppendChar(C);
  if((C=='.'||C=='?'||C=='!')&&(Index+1==Paragraph.Len()||FChar::IsWhitespace(Paragraph[Index+1])))
  { if(!Current.TrimStartAndEnd().IsEmpty())Out.Add(Current.TrimStartAndEnd());Current.Reset(); }
 }
 if(!Current.TrimStartAndEnd().IsEmpty())Out.Add(Current.TrimStartAndEnd());
}
}
UWordQuestMemoryDirector::UWordQuestMemoryDirector()
{
 PrimaryComponentTick.bCanEverTick=true;
 PrimaryComponentTick.bTickEvenWhenPaused=true;
}
void UWordQuestMemoryDirector::BeginPlay()
{
 Super::BeginPlay();auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC)return;
 UI=CreateWidget<UWordQuestExerciseWidget>(PC);UI->Setup(this);UI->AddToViewport(50);
 PC->bShowMouseCursor=false;PC->SetTickableWhenPaused(true);FInputModeGameOnly Mode;PC->SetInputMode(Mode);
 WorldPointer=NewObject<UWidgetInteractionComponent>(GetOwner(),TEXT("MemoryWorldPointer"));WorldPointer->InteractionSource=EWidgetInteractionSource::Custom;WorldPointer->InteractionDistance=1800;WorldPointer->bShowDebug=false;WorldPointer->PrimaryComponentTick.bTickEvenWhenPaused=true;WorldPointer->RegisterComponent();
 Grade=GetWorld()->SpawnActor<APostProcessVolume>();Grade->bUnbound=true;Grade->Priority=100;
 if(!LoadArticle()){SetMessage(Error);return;}
 // Asset completeness belongs to the delivery checker. It must remain FAIL in
 // reports without replacing a playable article with an opaque preparation screen.
 int32 UnfinishedAssets=0;
 for(TActorIterator<AActor> It(GetWorld());It;++It)
  if(It->ActorHasTag(TEXT("needs_final_asset")))++UnfinishedAssets;
 if(UnfinishedAssets>0)
  UE_LOG(LogTemp,Warning,TEXT("WQ_VISUAL_QUALITY_FAIL unfinished_assets=%d; article remains playable"),UnfinishedAssets);
 EnterScene();
}
void UWordQuestMemoryDirector::EndPlay(const EEndPlayReason::Type Reason)
{
 UGameplayStatics::SetGamePaused(this,false);ClearWorldFragments(false);for(auto A:FadingFragments)if(A)A->Destroy();for(auto A:MemoryDust)if(A)A->Destroy();if(WordFragment)WordFragment->Destroy();if(TransitionFragment)TransitionFragment->Destroy();if(Scanline)Scanline->Destroy();if(WorldPointer)WorldPointer->DestroyComponent();if(ViewCamera){ViewCamera->Destroy();ViewCamera=nullptr;}if(UI)UI->RemoveFromParent();Super::EndPlay(Reason);
}
bool UWordQuestMemoryDirector::LoadArticle()
{
 const FString Map=GetWorld()->GetMapName();const int32 At=Map.Find(TEXT("L_U"));
 if(At==INDEX_NONE){Error=TEXT("This level is not a textbook article.");return false;}
 Unit=FCString::Atoi(*Map.Mid(At+3,2));Section=TEXT("section_")+Map.Mid(At+6,1).ToLower();
 auto Data=ReadJson(FString::Printf(TEXT("Data/memory/textbook_scenes/unit%02d.json"),Unit));
 const TArray<TSharedPtr<FJsonValue>>* Articles=nullptr;
 if(!Data||!Data->TryGetArrayField(TEXT("articles"),Articles)){Error=TEXT("Article scene data is unavailable.");return false;}
 for(auto Value:*Articles)
 {
  auto Article=Value->AsObject();
  if(Field(Article,TEXT("section"))==Section){Scenes=Article->GetArrayField(TEXT("scenes"));break;}
 }
 auto ArticleBook=ReadJson(FString::Printf(TEXT("Data/textbook/rw3/articles/unit%02d.json"),Unit));
 const TArray<TSharedPtr<FJsonValue>>* Texts=nullptr;
 bool bFoundArticleText=false;
 if(ArticleBook&&ArticleBook->TryGetArrayField(TEXT("texts"),Texts))for(auto Value:*Texts)
 {
  auto Text=Value->AsObject();
  if(Field(Text,TEXT("section"))!=Section)continue;
  const TArray<TSharedPtr<FJsonValue>>* SourceParagraphs=nullptr;
  if(!Text->TryGetArrayField(TEXT("paragraphs"),SourceParagraphs))break;
  for(const auto& Paragraph:*SourceParagraphs)
  {
   if(Paragraph->Type!=EJson::String){Paragraphs.Reset();break;}
   Paragraphs.Add(Paragraph->AsString());
  }
  bFoundArticleText=!Paragraphs.IsEmpty();
  break;
 }
 auto Book=ReadJson(TEXT("Data/content/textbook_units.json"));
 if(Book)for(auto Value:Book->GetArrayField(TEXT("units")))
 {
  auto Candidate=Value->AsObject();
  if(Field(Candidate,TEXT("unit_id"))==FString::Printf(TEXT("unit%02d"),Unit)){UnitData=Candidate;break;}
 }
 if(!bFoundArticleText||!UnitData||Scenes.IsEmpty())
 {Error=TEXT("Textbook paragraphs or scene mapping are missing.");return false;}
 const TArray<TSharedPtr<FJsonValue>>* Values=nullptr;
 if(UnitData->TryGetArrayField(TEXT("vocabulary"),Values))for(auto Value:*Values)
 {auto Word=Value->AsObject();const FString Key=Field(Word,TEXT("word")).ToLower();Meanings.Add(Key,Field(Word,TEXT("meaning_cn")));Phonetics.Add(Key,Field(Word,TEXT("phonetic")));}
 auto Questions=ReadJson(FString::Printf(TEXT("Data/textbook/rw3/exercises/unit%02d.json"),Unit));Values=nullptr;
 if(Questions&&Questions->TryGetArrayField(TEXT("exercises"),Values))Exercises=*Values;
 return !Paragraphs.IsEmpty();
}
void UWordQuestMemoryDirector::EnterScene()
{
 if(!Scenes.IsValidIndex(SceneIndex)){bCompleted=true;if(UI)UI->SetCompleteness(1);SetMessage(TEXT("Memory restored."));return;}
 auto Scene=Scenes[SceneIndex]->AsObject();const FString Id=Field(Scene,TEXT("id"));
 Sentences.Reset();ChineseSentences.Reset();ExerciseReferences.Reset();SentenceIndex=0;ExerciseIndex=0;LayerReveal=LayerTarget=0;
 for(auto Value:Scene->GetArrayField(TEXT("paragraphs")))
 {
  const int32 Index=int32(Value->AsNumber())-1;
  if(!Paragraphs.IsValidIndex(Index))
  {Error=FString::Printf(TEXT("Missing textbook paragraph %d for %s; awaiting source data correction."),Index+1,*Id);SetMessage(Error);return;}
  const int32 Before=Sentences.Num();SplitSentences(Paragraphs[Index],Sentences);
  for(int32 S=Before;S<Sentences.Num();S++)SentenceParagraphs.Add(Index+1);
 }
 const TArray<TSharedPtr<FJsonValue>>* Refs=nullptr;
 if(Scene->TryGetArrayField(TEXT("exercises"),Refs))for(auto V:*Refs)ExerciseReferences.Add(V->AsString());
 const FName Set(*(TEXT("set:")+Id));const FName Shot(*(TEXT("shot:")+Field(Scene->GetArrayField(TEXT("shots"))[0]->AsObject(),TEXT("name"))));
 for(TActorIterator<AActor> It(GetWorld());It;++It)
 {
  AActor* Actor=*It;bool HasSet=false;
  for(FName Tag:Actor->Tags)if(Tag.ToString().StartsWith(TEXT("set:")))HasSet=true;
  if(!HasSet)continue;
  const bool Active=Actor->ActorHasTag(Set);Actor->SetActorHiddenInGame(!Active);Actor->SetActorEnableCollision(Active);
  // Hidden actors alone do not isolate global atmosphere and light proxies.
  // Mirror the checker: only the current set contributes sky/fog/light rendering.
  if(auto* Root=Actor->GetRootComponent())Root->SetVisibility(Active,true);
  if(auto* PP=Cast<APostProcessVolume>(Actor))PP->bEnabled=Active;

 }
 if(auto* PC=UGameplayStatics::GetPlayerController(this,0))
 {
  const TArray<TSharedPtr<FJsonValue>>* Shots=nullptr;
  if(Scene->TryGetArrayField(TEXT("shots"),Shots)&&Shots->Num()>0)
  {
   auto ShotObj=(*Shots)[0]->AsObject();
   const TArray<TSharedPtr<FJsonValue>>* P=nullptr;const TArray<TSharedPtr<FJsonValue>>* L=nullptr;
   if(ShotObj->TryGetArrayField(TEXT("pos"),P)&&ShotObj->TryGetArrayField(TEXT("look"),L)&&P->Num()>=3&&L->Num()>=3)
   {
    // 场景 JSON 的 shots 坐标是米，关卡里每个 set 沿 X 间隔 6000 cm（见 checker 的 saved_camera）
    const double SetOffsetX=SceneIndex*6000.0;
    const FVector Pos(SetOffsetX+(*P)[0]->AsNumber()*100.0,(*P)[1]->AsNumber()*100.0,(*P)[2]->AsNumber()*100.0);
    const FVector Look(SetOffsetX+(*L)[0]->AsNumber()*100.0,(*L)[1]->AsNumber()*100.0,(*L)[2]->AsNumber()*100.0);
    const FRotator Rot=(Look-Pos).Rotation();
    if(ViewCamera){ViewCamera->Destroy();ViewCamera=nullptr;}
    ViewCamera=GetWorld()->SpawnActor<ACameraActor>(Pos,Rot);
    if(ViewCamera)
    {
     const float Fov=ShotObj->HasField(TEXT("fov"))?ShotObj->GetNumberField(TEXT("fov")):60.f;
     if(auto* Cam=ViewCamera->GetCameraComponent()){Cam->SetFieldOfView(Fov>1?Fov:60.f);Cam->SetConstraintAspectRatio(false);}
     if(PC->PlayerCameraManager)PC->PlayerCameraManager->SetFOV(Fov>1?Fov:60.f);
     if(APawn* Pawn=PC->GetPawn()){Pawn->TeleportTo(Pos,Rot);PC->SetControlRotation(Rot);}
     PC->SetViewTargetWithBlend(ViewCamera,.65f);LastPlayerPosition=Pos;
     UE_LOG(LogTemp,Display,TEXT("[C13] view camera %s pos=%.0f,%.0f,%.0f"),*Id,Pos.X,Pos.Y,Pos.Z);
    }
   }
  }
 }
 UpdateLayers(0);UE_LOG(LogTemp,Display,TEXT("[C8] enter %s sentences=%d"),*Id,Sentences.Num());DisplaySentence();
}
void UWordQuestMemoryDirector::DisplaySentence()
{
 SentenceClock=0;ReadingGaze=0;if(!Sentences.IsValidIndex(SentenceIndex)){FinishScene();return;}
 CurrentSentence=Sentences[SentenceIndex];ReloadCurrentHighlights();auto Scene=Scenes[SceneIndex]->AsObject();
 if(Section==TEXT("section_b"))
 {
  const FString Lower=CurrentSentence.ToLower();
  bool Now=Lower.Contains(TEXT("now"))||Lower.Contains(TEXT("today"))||Lower.Contains(TEXT("these days"));
  double Trigger=0;if(Scene->TryGetNumberField(TEXT("now_sentence"),Trigger))Now=SentenceIndex+1>=int32(Trigger);
  if(Now)LayerTarget=1;
 }
 UI->ShowMemory(Field(Scene,TEXT("title")),CurrentSentence,bChinese?TEXT("中文译文尚未提供"):TEXT(""),TEXT(""));MatchWords(CurrentSentence);
}
void UWordQuestMemoryDirector::MatchWords(const FString& Sentence)
{
 for(auto Light:WordLights)if(Light)Light->Destroy();WordLights.Reset();
 if(WordFragment){WordFragment->Destroy();WordFragment=nullptr;}GazeActor.Reset();GazeWord.Reset();GazeClock=HoldClock=0;
 for(TActorIterator<AActor> It(GetWorld());It;++It)
 {
  TArray<UPrimitiveComponent*> Primitives;It->GetComponents(Primitives);
  for(auto* C:Primitives)C->SetRenderCustomDepth(false);
 }
}
void UWordQuestMemoryDirector::UpdateLayers(float Reveal)
{
 if(!Scenes.IsValidIndex(SceneIndex))return;
 const FName Set(*(TEXT("set:")+Field(Scenes[SceneIndex]->AsObject(),TEXT("id"))));
 for(TActorIterator<AActor> It(GetWorld());It;++It)
 {
  auto* Actor=*It;if(!Actor->ActorHasTag(Set))continue;
  const bool Then=Actor->ActorHasTag(TEXT("layer:then")),Now=Actor->ActorHasTag(TEXT("layer:now"));if(!Then&&!Now)continue;
  float Amount=Now?Reveal:1-Reveal;Actor->SetActorHiddenInGame(Amount<.001f);Actor->SetActorEnableCollision(Amount>.5f);
  TArray<UMeshComponent*> Meshes;Actor->GetComponents(Meshes);
  for(auto* Mesh:Meshes)for(int32 Index=0;Index<Mesh->GetNumMaterials();Index++)
  {auto* MID=Cast<UMaterialInstanceDynamic>(Mesh->GetMaterial(Index));if(!MID)MID=Mesh->CreateDynamicMaterialInstance(Index);if(MID)MID->SetScalarParameterValue(TEXT("MemoryReveal"),Amount);}
 }
}
void UWordQuestMemoryDirector::TickComponent(float Delta,ELevelTick Tick,FActorComponentTickFunction* Function)
{
 Super::TickComponent(Delta,Tick,Function);if(!UI)return;
 const float Real=FMath::Min(float(FApp::GetDeltaTime()),.1f);
 TickWorldInteraction(Real);
 if(!FadingFragments.IsEmpty())
 {
  FadeClock+=Real;const float Remaining=1-FMath::Clamp(FadeClock/1.15f,0.f,1.f);
  for(int32 I=0;I<FadingFragments.Num();I++)if(auto A=FadingFragments[I]){A->SetIntensity(Remaining);A->SetActorLocation(A->GetActorLocation()+FVector(0,0,Real*(4+I%4)));}
  for(int32 I=0;I<MemoryDust.Num();I++)if(auto A=MemoryDust[I]){A->SetActorLocation(A->GetActorLocation()+FVector(FMath::Sin(I*.7f)*8,FMath::Cos(I*.9f)*8,10+I%8)*Real);A->SetActorScale3D(FVector(.004f*Remaining));}
  if(Remaining<=0){for(auto A:FadingFragments)if(A)A->Destroy();FadingFragments.Reset();for(auto A:MemoryDust)if(A)A->Destroy();MemoryDust.Reset();}
 }
 if(DistortionClock>0){DistortionClock=FMath::Max(0.f,DistortionClock-Real);if(Grade){Grade->Settings.bOverride_SceneFringeIntensity=true;Grade->Settings.SceneFringeIntensity=DistortionClock*4;Grade->Settings.bOverride_FilmGrainIntensity=true;Grade->Settings.FilmGrainIntensity=DistortionClock*.18;}}
 if(ConvergeClock>0){ConvergeClock=FMath::Max(0.f,ConvergeClock-Real);for(auto A:Fragments)if(A)A->SetActorLocation(FMath::Lerp(A->RestLocation,A->RestLocation+FVector(0,0,8),FMath::Sin((1-ConvergeClock/.6f)*PI)));}
 if(!Error.IsEmpty()||bCompleted||bDirectoryOpen)return;
 if(bTransition)
 {
  TransitionClock+=Real;const float Progress=FMath::Clamp(TransitionClock/3.f,0.f,1.f);const float Envelope=FMath::Sin(Progress*PI);UI->SetDissolve(Envelope);
  if(Grade){Grade->Settings.bOverride_SceneFringeIntensity=true;Grade->Settings.SceneFringeIntensity=Envelope*.8;Grade->Settings.bOverride_FilmGrainIntensity=true;Grade->Settings.FilmGrainIntensity=Envelope*.05;}
  if(Scanline&&UGameplayStatics::GetPlayerCameraManager(this,0)){auto* Camera=UGameplayStatics::GetPlayerCameraManager(this,0);Scanline->SetActorLocation(Camera->GetCameraLocation()+Camera->GetCameraRotation().Vector()*100+FRotationMatrix(Camera->GetCameraRotation()).GetUnitAxis(EAxis::Z)*FMath::Lerp(90.f,-90.f,Progress));}
  if(TransitionFragment)TransitionFragment->SetText(FString::Printf(TEXT("MEMORY RECALL\n%04d  /  Destination: 2026"),FMath::RoundToInt(FMath::Lerp(2090.f,2026.f,Progress))));
  if(TransitionClock>=1.5f&&!bTransitionCut){bTransitionCut=true;SceneIndex++;EnterScene();}
  if(Progress>=1){bTransition=false;UI->SetDissolve(0);if(TransitionFragment){TransitionFragment->Destroy();TransitionFragment=nullptr;}if(Scanline){Scanline->Destroy();Scanline=nullptr;}if(Grade)Grade->Settings.SceneFringeIntensity=0;}return;
 }
 if(UGameplayStatics::IsGamePaused(this))return;
 if(!FMath::IsNearlyEqual(LayerReveal,LayerTarget,.001f)){LayerReveal=FMath::FInterpConstantTo(LayerReveal,LayerTarget,Real,.65f);UpdateLayers(LayerReveal);}
 SentenceClock+=Real;
 const auto* PC=UGameplayStatics::GetPlayerController(this,0);const FVector Position=PC&&PC->GetPawn()?PC->GetPawn()->GetActorLocation():LastPlayerPosition;
 if(SentenceClock>FMath::Max(3.5f,CurrentSentence.Len()*.055f)&&(ReadingGaze>.6f||FVector::Dist(Position,LastPlayerPosition)>24)){LastPlayerPosition=Position;Advance();}
 UI->SetCompleteness((SceneIndex+(Sentences.IsEmpty()?0.f:float(SentenceIndex)/Sentences.Num()))/FMath::Max(1,Scenes.Num()));
}
void UWordQuestMemoryDirector::Advance(){if(bTransition||bCompleted||!Error.IsEmpty()||UGameplayStatics::IsGamePaused(this))return;SentenceIndex++;DisplaySentence();}
void UWordQuestMemoryDirector::FinishScene()
{
 if(ExerciseReferences.IsValidIndex(ExerciseIndex))
 {if(!OpenExercise(ExerciseReferences[ExerciseIndex])){Error=TEXT("Exercise unavailable: ")+ExerciseReferences[ExerciseIndex];SetMessage(Error);}return;}
 BeginTransition();
}
void UWordQuestMemoryDirector::BeginTransition()
{
 if(SceneIndex+1>=Scenes.Num()){bCompleted=true;if(UI)UI->SetCompleteness(1);SetMessage(TEXT("Memory restored."));return;}
 bTransition=true;bTransitionCut=false;TransitionClock=0;
 ClearWorldFragments(true);
 auto* PC=UGameplayStatics::GetPlayerController(this,0);if(PC&&PC->PlayerCameraManager)
 {
  APlayerCameraManager* Camera=PC->PlayerCameraManager;const FVector Location=Camera->GetCameraLocation()+Camera->GetCameraRotation().Vector()*155;
  TransitionFragment=GetWorld()->SpawnActor<AWordQuestMemoryFragment>(Location,(Camera->GetCameraLocation()-Location).Rotation());
  TransitionFragment->Setup(UI,{TEXT("MEMORY RECALL\n2090  /  Destination: 2026"),-30,26,false},false,FVector2D(1250,260));
  Scanline=GetWorld()->SpawnActor<AActor>(Location,Camera->GetCameraRotation());auto* Strip=NewObject<UStaticMeshComponent>(Scanline);Scanline->SetRootComponent(Strip);Strip->SetStaticMesh(LoadObject<UStaticMesh>(nullptr,TEXT("/Engine/BasicShapes/Cube.Cube")));Strip->SetCollisionEnabled(ECollisionEnabled::NoCollision);Strip->SetCastShadow(false);Strip->RegisterComponent();Scanline->SetActorScale3D(FVector(.001f,2.7f,.0015f));
  if(auto* Parent=LoadObject<UMaterialInterface>(nullptr,TEXT("/Game/Memory/Materials/M_TextbookRevealSolid.M_TextbookRevealSolid"))){auto* Glow=UMaterialInstanceDynamic::Create(Parent,this);Glow->SetVectorParameterValue(TEXT("BaseColor"),FLinearColor(.4,.65,.7));Glow->SetVectorParameterValue(TEXT("EmissiveColor"),FLinearColor(.6,.9,1));Glow->SetScalarParameterValue(TEXT("MemoryReveal"),1);Strip->SetMaterial(0,Glow);}

 }

}
bool UWordQuestMemoryDirector::OpenExercise(const FString& Reference)
{
 FString Id=Reference,Numbers;int32 First=0,Last=0;
 if(Reference.Split(TEXT("#"),&Id,&Numbers))
 {FString A,B;if(Numbers.Split(TEXT("-"),&A,&B)){First=FCString::Atoi(*A);Last=FCString::Atoi(*B);if(First<1||Last<First)return false;}else{First=FCString::Atoi(*Numbers);if(First<1)return false;}}
 for(auto Value:Exercises)
 {
  auto Exercise=Value->AsObject();if(Field(Exercise,TEXT("id"))!=Id)continue;
  if(!UI->ShowExercise(Exercise,First,Last))return false;
  UGameplayStatics::SetGamePaused(this,true);if(Grade){Grade->Settings.bOverride_ColorSaturation=true;Grade->Settings.ColorSaturation=FVector4(.12,.12,.12,1);}return true;
 }
 return false;
}
void UWordQuestMemoryDirector::ExerciseCompleted()
{
 UGameplayStatics::SetGamePaused(this,false);if(Grade)Grade->Settings.ColorSaturation=FVector4(1,1,1,1);bEditingWorldText=false;ExerciseIndex++;FinishScene();
}
void UWordQuestMemoryDirector::SetChineseEnabled(bool Enabled){bChinese=Enabled;if(UI&&!UI->IsExercise())DisplaySentence();}
void UWordQuestMemoryDirector::SetMessage(const FString& Message){if(UI)UI->ShowMemory(TEXT("MEMORY RECALL"),Message,TEXT(""),TEXT(""));}
FString UWordQuestMemoryDirector::GetPlaybackState()const
{
 int32 WorldFragments=0,WorldSpace=0,SentenceFragments=0,ChoiceFragments=0,QuestionFragments=0;
 for(auto A:Fragments)if(A){WorldFragments++;if(A->IsWorldSpace())WorldSpace++;
  if(A->ActorHasTag(TEXT("memory_sentence")))SentenceFragments++;
  if(A->ActorHasTag(TEXT("memory_choice_fragment")))ChoiceFragments++;
  if(A->ActorHasTag(TEXT("memory_question")))QuestionFragments++;}
 return FString::Printf(TEXT("unit=%d section=%s scene=%d sentence=%d paused=%d transition=%d world_fragments=%d world_space_fragments=%d word_fragment=%d sentence_fragments=%d choice_fragments=%d question_fragments=%d screen_ui=%d progress_ring=%d world_input=%d gaze=%s gaze_clock=%.2f hold_clock=%.2f remembered=%d distortion=%.2f error=%s"),
  Unit,*Section,SceneIndex,SentenceIndex,UGameplayStatics::IsGamePaused(this),bTransition,WorldFragments,WorldSpace,WordFragment?1:0,SentenceFragments,ChoiceFragments,QuestionFragments,CountVisibleScreenWidgets(),(UI&&UI->IsInViewport())?1:0,bEditingWorldText,*GazeWord,GazeClock,HoldClock,RememberedWords.Num(),DistortionClock,*Error);
}
FString UWordQuestMemoryDirector::GetImmersiveState()const
{
 int32 HighlightedFragments=0;
 for(auto A:Fragments)if(A&&A->GetHighlightWords().Num()>0)HighlightedFragments++;
 FString GazeName=TEXT("none");if(AActor* GazePtr=GazeActor.Get())GazeName=GazePtr->GetName();
 return GetPlaybackState()+FString::Printf(TEXT(" gaze_override=%d gaze_actor=%s fading_fragments=%d memory_dust=%d transition_cut=%d directory_open=%d highlight_forms=%d highlight_words=%d highlighted_fragments=%d"),bProbeGazeOverride?1:0,*GazeName,FadingFragments.Num(),MemoryDust.Num(),bTransitionCut?1:0,bDirectoryOpen?1:0,CurrentHighlightForms.Num(),CurrentHighlightWords.Num(),HighlightedFragments);
}
int32 UWordQuestMemoryDirector::CountVisibleScreenWidgets()const
{
 int32 Count=0;
 for(TObjectIterator<UUserWidget> It;It;++It)
 {
  UUserWidget* W=*It;
  if(!W||!W->IsInViewport())continue;
  if(Cast<UWordQuestExerciseWidget>(W))continue; // 后端控制器：只画完整度环，不算屏幕 UI
  const ESlateVisibility V=W->GetVisibility();
  if(V==ESlateVisibility::Collapsed||V==ESlateVisibility::Hidden)continue;
  Count++;
 }
 return Count;
}
FString UWordQuestMemoryDirector::GetViewHit()const
{
 auto* PC=UGameplayStatics::GetPlayerController(this,0);
 if(!PC||!PC->PlayerCameraManager)return TEXT("none");
 FVector Start=PC->PlayerCameraManager->GetCameraLocation(),Dir=PC->PlayerCameraManager->GetCameraRotation().Vector();
 FHitResult Hit;FCollisionQueryParams Query(SCENE_QUERY_STAT(MemoryGazeDebug),true);if(PC->GetPawn())Query.AddIgnoredActor(PC->GetPawn());
 const FString Where=FString::Printf(TEXT("cam=%.0f,%.0f,%.0f dir=%.2f,%.2f,%.2f "),Start.X,Start.Y,Start.Z,Dir.X,Dir.Y,Dir.Z);
 if(!GetWorld()||!GetWorld()->LineTraceSingleByChannel(Hit,Start,Start+Dir*1500,ECC_Visibility,Query))return Where+TEXT("none");
 FString Tags;for(FName Tag:Hit.GetActor()->Tags)Tags+=Tag.ToString()+TEXT(";");
 return Where+Hit.GetActor()->GetActorLabel()+TEXT("|")+Tags;
}
bool UWordQuestMemoryDirector::AimAtWordTag(const FString& Word)
{
 auto* PC=UGameplayStatics::GetPlayerController(this,0);
 if(!PC||!PC->PlayerCameraManager||Word.IsEmpty())return false;
 for(TActorIterator<AActor> It(GetWorld());It;++It)
 {
  for(FName Tag:It->Tags)
  {
   FString Candidate=Tag.ToString();
   if(!Candidate.RemoveFromStart(TEXT("word:")))continue;
   if(Candidate.StartsWith(TEXT("rw3_u"))&&Candidate.Len()>8)Candidate=Candidate.Mid(8);
   Candidate.ReplaceInline(TEXT("_"),TEXT(" "));
   if(!Candidate.Equals(Word,ESearchCase::IgnoreCase)&&!Candidate.Contains(Word,ESearchCase::IgnoreCase))continue;
   FVector Origin,Extent;It->GetActorBounds(false,Origin,Extent);
   if(ViewCamera){ViewCamera->SetActorRotation((Origin-ViewCamera->GetActorLocation()).Rotation());PC->SetViewTargetWithBlend(ViewCamera,0.1f);return true;}
   PC->SetControlRotation((Origin-PC->PlayerCameraManager->GetCameraLocation()).Rotation());
   return true;
  }
 }
 return false;
}
void UWordQuestMemoryDirector::ProbeSetHolding(bool bHolding){bProbeHolding=bHolding;}
bool UWordQuestMemoryDirector::SkipTransition(){if(!bTransition)return false;TransitionClock=3;return true;}
bool UWordQuestMemoryDirector::RunExerciseProbe(const FString& Kind)
{
 for(auto Value:Exercises){auto Exercise=Value->AsObject();if(Field(Exercise,TEXT("kind"))==Kind&&UI->ShowExercise(Exercise,Kind==TEXT("banked_cloze")?0:1)){UGameplayStatics::SetGamePaused(this,true);return UI->ProbeAnswer();}}return false;
}
FString UWordQuestMemoryDirector::GetExerciseResult()const{return UI?UI->Result():TEXT("No UI");}
void UWordQuestMemoryDirector::FinishExerciseProbe(){if(UI)UI->HandleAction(-3);}
bool UWordQuestMemoryDirector::CaptureEvidence(const FString& Name){return CaptureResponsiveUI(1280,720,Name);}
bool UWordQuestMemoryDirector::CaptureTo(const FString& Folder,int32 Width,int32 Height,const FString& Name)
{
 if(Name.Contains(TEXT(".."))||Name.Contains(TEXT("/"))||Folder.Contains(TEXT(".."))||Width<320||Height<320||Width>4096||Height>4096)return false;
 const FString Absolute=FPaths::ProjectDir()/Folder;IFileManager::Get().MakeDirectory(*Absolute,true);
 return UWordQuestRenderDiagnostics::RequestWorldCapture(this,Width,Height,Absolute/(Name+TEXT(".png")));
}
bool UWordQuestMemoryDirector::CaptureResponsiveUI(int32 Width,int32 Height,const FString& Name)
{return CaptureTo(TEXT("Docs/qa/c9-exercises"),Width,Height,Name);}
bool UWordQuestMemoryDirector::CaptureEvidenceIn(const FString& Folder,const FString& Name)
{return CaptureTo(Folder,1280,720,Name);}
bool UWordQuestMemoryDirector::CaptureScreenEvidenceIn(const FString& Folder,const FString& Name)
{
 // 视口截图：包含玩家视角和世界内 Widget（字幕/断片/玻璃质感），SceneCapture2D 拍不到 Slate Widget。
 if(Name.Contains(TEXT(".."))||Name.Contains(TEXT("/"))||Folder.Contains(TEXT("..")))return false;
 const FString Absolute=FPaths::ConvertRelativePathToFull(FPaths::ProjectDir()/Folder/(Name+TEXT(".png")));
 IFileManager::Get().MakeDirectory(*FPaths::GetPath(Absolute),true);
 FScreenshotRequest::RequestScreenshot(Absolute,true,false);
 return true;
}
bool UWordQuestMemoryDirector::CaptureResponsiveEvidenceIn(const FString& Folder,int32 Width,int32 Height,const FString& Name)
{return CaptureTo(Folder,Width,Height,Name);}

void UWordQuestMemoryDirector::ClearWorldFragments(bool Dissolve)
{
 if(Dissolve)
 {
  for(auto A:FadingFragments)if(A)A->Destroy();FadingFragments.Reset();
  for(auto A:MemoryDust)if(A)A->Destroy();MemoryDust.Reset();
  for(auto A:Fragments)if(A){A->Surface->SetCollisionEnabled(ECollisionEnabled::NoCollision);FadingFragments.Add(A);}
  FadeClock=0;
  if(!FadingFragments.IsEmpty())
  {
   const FVector Center=FadingFragments[0]->GetActorLocation();auto* Mesh=LoadObject<UStaticMesh>(nullptr,TEXT("/Engine/BasicShapes/Sphere.Sphere"));
   auto* Parent=LoadObject<UMaterialInterface>(nullptr,TEXT("/Game/Memory/Materials/M_TextbookRevealSolid.M_TextbookRevealSolid"));
   UMaterialInstanceDynamic* Glow=Parent?UMaterialInstanceDynamic::Create(Parent,this):nullptr;
   if(Glow){Glow->SetVectorParameterValue(TEXT("BaseColor"),FLinearColor(.5,.7,.75));Glow->SetVectorParameterValue(TEXT("EmissiveColor"),FLinearColor(.3,.6,.7));Glow->SetScalarParameterValue(TEXT("MemoryReveal"),1);}
   for(int32 I=0;I<32;I++)
   {
    const FVector Position=Center+FVector(FMath::Sin(I*2.4f)*14,FMath::Cos(I*1.7f)*48,(I%7)*3);auto* Dust=GetWorld()->SpawnActor<AActor>();
    auto* C=NewObject<UStaticMeshComponent>(Dust);Dust->SetRootComponent(C);C->SetStaticMesh(Mesh);C->SetCollisionEnabled(ECollisionEnabled::NoCollision);C->SetCastShadow(false);if(Glow)C->SetMaterial(0,Glow);C->RegisterComponent();Dust->SetActorLocation(Position);Dust->SetActorScale3D(FVector(.004f));Dust->Tags.Add(TEXT("memory_light_dust"));MemoryDust.Add(Dust);
   }
  }
 }
 else for(auto A:Fragments)if(A)A->Destroy();
 Fragments.Reset();FocusedFragment=0;
}
void UWordQuestMemoryDirector::RebuildWorldFragments()
{
 if(!UI||bDirectoryOpen)return;
 auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC||!PC->PlayerCameraManager)return;
 ClearWorldFragments(true);
 const FVector Eye=(!UI->IsExercise()&&!AnchorEye.IsZero())?AnchorEye:(PC->GetPawn()?PC->GetPawn()->GetPawnViewLocation():PC->PlayerCameraManager->GetCameraLocation());const FRotator View=(!UI->IsExercise()&&!AnchorEye.IsZero())?AnchorView:(PC->GetPawn()?PC->GetControlRotation():PC->PlayerCameraManager->GetCameraRotation());const FVector Forward=View.Vector(),Right=FRotationMatrix(View).GetUnitAxis(EAxis::Y),Up=FRotationMatrix(View).GetUnitAxis(EAxis::Z);
 FVector Anchor=Eye+Forward*(UI->IsExercise()?240.f:285.f);
 auto Elements=UI->WorldElements();
 if(!UI->IsExercise())
 {
  for(auto& Element:Elements)
   if(Element.Text==CurrentSentence){Element.Highlights=CurrentHighlightForms;Element.HighlightWords=CurrentHighlightWords;break;}
 }
 if(!UI->IsExercise()&&Scenes.IsValidIndex(SceneIndex))
 {
  const FName Set(*(TEXT("set:")+Field(Scenes[SceneIndex]->AsObject(),TEXT("id"))));
  for(TActorIterator<AActor> It(GetWorld());It;++It)
  {
   if(!It->ActorHasTag(Set)||It->IsHidden())continue;
   for(FName Tag:It->Tags)
   {
    FString Role=Tag.ToString();if(Role.RemoveFromStart(TEXT("actor:"))&&CurrentSentence.Contains(Role,ESearchCase::IgnoreCase))
    {Anchor=It->GetActorLocation()+FVector(0,0,145)+Right*65;break;}
    FString Word=Tag.ToString();if(Word.RemoveFromStart(TEXT("word:"))&&CurrentSentence.Contains(Word,ESearchCase::IgnoreCase))
    {FVector Origin,Extent;It->GetActorBounds(false,Origin,Extent);Anchor=Origin+FVector(0,0,FMath::Min(Extent.Z,70.)+32)+Right*38;break;}
   }
  }
  int32 Row=0;
  for(const auto& Element:Elements)
  {
   FVector Location=Anchor-Up*(Row++*30+22);auto* A=GetWorld()->SpawnActor<AWordQuestMemoryFragment>(Location,(Eye-Location).Rotation());
   A->Setup(UI,Element,false,FVector2D(1100,FMath::Clamp(140.f+Element.Text.Len()*1.3f,180.f,520.f)));A->Tags.Add(TEXT("memory_sentence"));Fragments.Add(A);
  }
  return;
 }
 FString Question;TArray<FWordQuestMemoryElement> Actions;
 for(const auto& Element:Elements)
 {
  if(Element.Action==MIN_int32&&!Element.bInput)
  {
   if(Element.Text.Contains(TEXT(" / "))&&Element.Text.Len()<12)continue;
   if(!Question.IsEmpty())Question+=TEXT("\n\n");Question+=Element.Text;
  }
  else Actions.Add(Element);
 }
 if(!Question.IsEmpty())
 {
  const FVector Location=Anchor+Up*65;auto* A=GetWorld()->SpawnActor<AWordQuestMemoryFragment>(Location,(Eye-Location).Rotation());A->Setup(UI,{Question,MIN_int32,20,false},true,FVector2D(1700,FMath::Clamp(180.f+Question.Len()*.48f,280.f,760.f)));A->Tags.Add(TEXT("memory_question"));Fragments.Add(A);
 }
 const int32 Columns=Actions.Num()>8?3:2;
 for(int32 I=0;I<Actions.Num();I++)
 {
  const int32 Col=I%Columns,Row=I/Columns;const float X=(Col-(Columns-1)*.5f)*83.f;
  FVector Location=Anchor+Right*X+Up*(-8-Row*22.f)+Forward*((I%3)-1)*4.f;
  auto* A=GetWorld()->SpawnActor<AWordQuestMemoryFragment>(Location,(Eye-Location).Rotation());
  A->Setup(UI,Actions[I],true,FVector2D(1000,240));A->Tags.Add(Actions[I].bInput?TEXT("memory_world_input"):TEXT("memory_choice_fragment"));Fragments.Add(A);
 }
}
void UWordQuestMemoryDirector::ReloadCurrentHighlights()
{
 CurrentHighlightForms.Reset();CurrentHighlightWords.Reset();
 if(!Scenes.IsValidIndex(SceneIndex)||!SentenceParagraphs.IsValidIndex(SentenceIndex))return;
 const int32 ParagraphIndex=SentenceParagraphs[SentenceIndex];
 auto Scene=Scenes[SceneIndex]->AsObject();
 const TArray<TSharedPtr<FJsonValue>>* Entries=nullptr;
 if(!Scene->TryGetArrayField(TEXT("text_words"),Entries))return;
 for(const auto& Value:*Entries)
 {
  auto Entry=Value->AsObject();
  if(int32(Entry->GetNumberField(TEXT("paragraph")))!=ParagraphIndex)continue;
  const FString Form=Entry->GetStringField(TEXT("form"));
  const FString Word=Entry->GetStringField(TEXT("word"));
  if(Form.IsEmpty()||!CurrentSentence.Contains(Form,ESearchCase::IgnoreCase))continue;
  if(!CurrentHighlightForms.Contains(Form)){CurrentHighlightForms.Add(Form);CurrentHighlightWords.Add(Word);}
 }
}
bool UWordQuestMemoryDirector::ProbeGazeSentenceFragment()
{
 for(auto A:Fragments)
  if(A&&A->ActorHasTag(TEXT("memory_sentence")))
  {
   const TArray<FString>& Words=A->GetHighlightWords();
   if(Words.Num()>0){GazeActor=A;GazeWord=Words[0];GazeClock=0;HoldClock=0;bProbeGazeOverride=true;return true;}
  }
 return false;
}
bool UWordQuestMemoryDirector::AimAtSentenceFragment()
{
 auto* PC=UGameplayStatics::GetPlayerController(this,0);
 if(!PC||!PC->PlayerCameraManager)return false;
 for(TActorIterator<AActor> It(GetWorld());It;++It)
 {
  if(!It->ActorHasTag(TEXT("memory_sentence")))continue;
  const FVector To=It->GetActorLocation();
  if(ViewCamera)
  {
   ViewCamera->SetActorRotation((To-ViewCamera->GetActorLocation()).Rotation());
   PC->SetViewTargetWithBlend(ViewCamera,0.1f);
   return true;
  }
  PC->SetControlRotation((To-PC->PlayerCameraManager->GetCameraLocation()).Rotation());
  return true;
 }
 return false;
}
void UWordQuestMemoryDirector::PersistRememberedWord(const FString& Word)
{
 const bool QA=FPlatformMisc::GetEnvironmentVariable(TEXT("WQ_TEXTBOOK_ENGINE_QA"))==TEXT("1");
 FString Path=FPaths::ProjectSavedDir()/(QA?TEXT("Player/Notebook.qa.json"):TEXT("Player/Notebook.json"));
 FString Text;TSharedPtr<FJsonObject> Root=MakeShared<FJsonObject>();
 if(FFileHelper::LoadFileToString(Text,*Path))
 {
  TSharedPtr<FJsonObject> Existing;
  if(FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Text),Existing)&&Existing)Root=Existing;
 }
 TArray<TSharedPtr<FJsonValue>> Words;
 const TArray<TSharedPtr<FJsonValue>>* Old=nullptr;
 if(Root->TryGetArrayField(TEXT("words"),Old))Words=*Old;
 auto Entry=MakeShared<FJsonObject>();
 Entry->SetStringField(TEXT("word"),Word);
 Entry->SetStringField(TEXT("phonetic"),Phonetics.FindRef(Word.ToLower()));
 Entry->SetStringField(TEXT("meaning"),Meanings.FindRef(Word.ToLower()));
 Entry->SetStringField(TEXT("savedAt"),FDateTime::UtcNow().ToIso8601());
 Words.Add(MakeShared<FJsonValueObject>(Entry));
 Root->SetArrayField(TEXT("words"),Words);
 Text.Reset();FJsonSerializer::Serialize(Root,TJsonWriterFactory<>::Create(&Text));
 IFileManager::Get().MakeDirectory(*FPaths::GetPath(Path),true);
 if(FFileHelper::SaveStringToFile(Text,*(Path+TEXT(".tmp"))))IFileManager::Get().Move(*Path,*(Path+TEXT(".tmp")),true,true);
}
void UWordQuestMemoryDirector::NotifyExerciseAttempt(bool Accepted)
{
 if(Accepted)ConvergeClock=.6f;else DistortionClock=.75f;
}
void UWordQuestMemoryDirector::ShowWord(AActor* Actor,const FString& Word)
{
 if(!Actor)return;if(WordFragment){WordFragment->Destroy();WordFragment=nullptr;}
 auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC||!PC->PlayerCameraManager)return;
 FVector Origin,Extent;Actor->GetActorBounds(false,Origin,Extent);const FVector Eye=PC->PlayerCameraManager->GetCameraLocation();const FVector Location=Origin+(Eye-Origin).GetSafeNormal()*FMath::Min(Extent.Size(),65.)+FVector(0,0,18);
 FString Text=TEXT("────────────\n")+Word+TEXT("  ")+Phonetics.FindRef(Word.ToLower())+TEXT("\n")+Meanings.FindRef(Word.ToLower());
 if(!bFirstWordHint){Text+=TEXT("\nRest your attention here. Hold to remember.");bFirstWordHint=true;}
 WordFragment=GetWorld()->SpawnActor<AWordQuestMemoryFragment>(Location,(Eye-Location).Rotation());WordFragment->Setup(UI,{Text,MIN_int32,20,false},false,FVector2D(1000,310));WordFragment->Tags.Add(TEXT("memory_word"));WordFragment->Surface->SetCollisionEnabled(ECollisionEnabled::NoCollision);
 TArray<UPrimitiveComponent*> Components;Actor->GetComponents(Components);for(auto* C:Components){C->SetRenderCustomDepth(true);C->SetCustomDepthStencilValue(1);}
}
void UWordQuestMemoryDirector::TickWorldInteraction(float Real)
{
 auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC||!PC->PlayerCameraManager)return;
 if(PC->WasInputKeyJustPressed(EKeys::P)||PC->WasInputKeyJustPressed(EKeys::Gamepad_Special_Right)){ToggleDirectory();return;}
 if(bTransition&&(PC->WasInputKeyJustPressed(EKeys::SpaceBar)||PC->WasInputKeyJustPressed(EKeys::Gamepad_FaceButton_Bottom))){HandleWorldAction(-30);return;}
 FVector Start=PC->PlayerCameraManager->GetCameraLocation(),Direction=PC->PlayerCameraManager->GetCameraRotation().Vector();
 float TouchX=0,TouchY=0;bool TouchDown=false;PC->GetInputTouchState(ETouchIndex::Touch1,TouchX,TouchY,TouchDown);
 if(TouchDown)
 {
  const FVector2D Position(TouchX,TouchY);if(!bTouchWasDown)TouchOrigin=Position;
  if(bTouchWasDown&&FVector2D::Distance(Position,TouchOrigin)>12&&!UGameplayStatics::IsGamePaused(this)){const FVector2D Drag=Position-LastTouchPosition;FRotator Rotation=PC->GetControlRotation();Rotation.Yaw+=Drag.X*.12f;Rotation.Pitch=FMath::ClampAngle(Rotation.Pitch-Drag.Y*.12f,-75,75);PC->SetControlRotation(Rotation);}
  LastTouchPosition=Position;PC->DeprojectScreenPositionToWorld(TouchX,TouchY,Start,Direction);
 }
 FHitResult Hit;FCollisionQueryParams Query(SCENE_QUERY_STAT(MemoryGaze),true);if(PC->GetPawn())Query.AddIgnoredActor(PC->GetPawn());GetWorld()->LineTraceSingleByChannel(Hit,Start,Start+Direction*1500,ECC_Visibility,Query);
 if(WorldPointer)WorldPointer->SetCustomHitResult(Hit);
 auto* Fragment=Cast<AWordQuestMemoryFragment>(Hit.GetActor());
 const bool Press=PC->WasInputKeyJustPressed(EKeys::LeftMouseButton)||(TouchDown&&!bTouchWasDown)||PC->WasInputKeyJustPressed(EKeys::Gamepad_FaceButton_Bottom);
 if(Fragment&&Fragment->ActorHasTag(TEXT("memory_sentence")))ReadingGaze+=Real;else ReadingGaze=FMath::Max(0.f,ReadingGaze-Real*.5f);
 if(PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Right)||PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Down))FocusedFragment=(FocusedFragment+1)%FMath::Max(1,Fragments.Num());
 if(PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Left)||PC->WasInputKeyJustPressed(EKeys::Gamepad_DPad_Up))FocusedFragment=(FocusedFragment+FMath::Max(1,Fragments.Num())-1)%FMath::Max(1,Fragments.Num());
 if(PC->WasInputKeyJustPressed(EKeys::Gamepad_FaceButton_Bottom)&&Fragments.IsValidIndex(FocusedFragment))Fragment=Fragments[FocusedFragment];
 if(Press&&Fragment)
 {
  bEditingWorldText=Fragment->IsInput();
  if(bEditingWorldText){if(WorldPointer){WorldPointer->PressPointerKey(EKeys::LeftMouseButton);WorldPointer->ReleasePointerKey(EKeys::LeftMouseButton);WorldPointer->SetFocus(Fragment->GetInputWidget());}Fragment->FocusInput();}
  else if(Fragment->GetAction()!=MIN_int32)UI->HandleAction(Fragment->GetAction());
 }
 if(bEditingWorldText&&WorldPointer)
 {
  const bool Upper=PC->IsInputKeyDown(EKeys::LeftShift)||PC->IsInputKeyDown(EKeys::RightShift);
  for(TCHAR C='A';C<='Z';C++)if(PC->WasInputKeyJustPressed(FKey(FName(*FString::Chr(C)))))WorldPointer->SendKeyChar(FString::Chr(Upper?C:FChar::ToLower(C)));
  for(TCHAR C='0';C<='9';C++)if(PC->WasInputKeyJustPressed(FKey(FName(*FString::Chr(C)))))WorldPointer->SendKeyChar(FString::Chr(C));
  if(PC->WasInputKeyJustPressed(EKeys::SpaceBar))WorldPointer->SendKeyChar(TEXT(" "));
  if(PC->WasInputKeyJustPressed(EKeys::Period))WorldPointer->SendKeyChar(TEXT("."));if(PC->WasInputKeyJustPressed(EKeys::Comma))WorldPointer->SendKeyChar(TEXT(","));if(PC->WasInputKeyJustPressed(EKeys::Apostrophe))WorldPointer->SendKeyChar(TEXT("'"));
  if(PC->WasInputKeyJustPressed(EKeys::BackSpace))WorldPointer->PressAndReleaseKey(EKeys::BackSpace);
  if(PC->WasInputKeyJustPressed(EKeys::Enter)){bEditingWorldText=false;UI->HandleAction(-2);}
 }
 AActor* Target=Hit.GetActor();FString Word;
 if(bProbeGazeOverride){Target=GazeActor.Get();Word=GazeWord;}
 else if(Target&&Fragment&&Fragment->ActorHasTag(TEXT("memory_sentence")))
 {
  for(const FString& Candidate:Fragment->GetHighlightWords())
   if(!RememberedWords.Contains(Candidate)){Word=Candidate;break;}
 }
 if(!bProbeGazeOverride&&Target&&!Fragment)for(FName Tag:Target->Tags){FString Candidate=Tag.ToString();if(Candidate.RemoveFromStart(TEXT("word:"))){if(Candidate.StartsWith(TEXT("rw3_u"))&&Candidate.Len()>8)Candidate=Candidate.Mid(8);Candidate.ReplaceInline(TEXT("_"),TEXT(" "));Word=Candidate;break;}}
 if(Target&&Target==GazeActor.Get()&&!Word.IsEmpty())
 {
  GazeClock+=Real;if(GazeClock>=.6f&&!WordFragment)ShowWord(Target,Word);
  const bool Holding=PC->IsInputKeyDown(EKeys::LeftMouseButton)||PC->IsInputKeyDown(EKeys::Gamepad_RightTrigger)||TouchDown||bProbeHolding;
  if(GazeClock>=.6f&&Holding&&!RememberedWords.Contains(Word))
  {
   HoldClock+=Real;if(HoldClock>.65f)
   {
    RememberedWords.Add(Word);WordPulse=.55f;PersistRememberedWord(Word);
    auto* Tone=NewObject<USoundWaveProcedural>(this);Tone->SetSampleRate(48000);Tone->NumChannels=1;Tone->Duration=.18f;TArray<int16> Samples;Samples.SetNum(8640);
    for(int32 I=0;I<Samples.Num();I++){float T=float(I)/48000,Envelope=FMath::Square(FMath::Sin(PI*I/Samples.Num()));Samples[I]=int16(32767*.018f*Envelope*(FMath::Sin(2*PI*420*T)+.3f*FMath::Sin(2*PI*840*T)));}Tone->QueueAudio(reinterpret_cast<const uint8*>(Samples.GetData()),Samples.Num()*sizeof(int16));UGameplayStatics::PlaySoundAtLocation(this,Tone,Target->GetActorLocation(),.45f);
   }
  }
  else HoldClock=0;
 }
 else
 {
  if(auto* Previous=GazeActor.Get()){TArray<UPrimitiveComponent*> C;Previous->GetComponents(C);for(auto* Part:C)Part->SetRenderCustomDepth(false);}
  GazeActor=Target;GazeWord=Word;GazeClock=HoldClock=0;
  if(WordFragment){WordFragment->Destroy();WordFragment=nullptr;}
 }
 if(WordPulse>0){WordPulse=FMath::Max(0.f,WordPulse-Real);if(WordFragment)WordFragment->SetActorScale3D(FVector(1+.05f*FMath::Sin(WordPulse/.55f*PI)));}
 bTouchWasDown=TouchDown;
}
void UWordQuestMemoryDirector::ToggleDirectory()
{
 bDirectoryOpen=!bDirectoryOpen;
 if(!bDirectoryOpen){UGameplayStatics::SetGamePaused(this,UI&&UI->IsExercise());RebuildWorldFragments();return;}
 UGameplayStatics::SetGamePaused(this,true);ClearWorldFragments(true);
 auto* PC=UGameplayStatics::GetPlayerController(this,0);if(!PC||!PC->PlayerCameraManager)return;
 const FVector Eye=PC->PlayerCameraManager->GetCameraLocation();const FRotator View=PC->PlayerCameraManager->GetCameraRotation();const FVector Right=FRotationMatrix(View).GetUnitAxis(EAxis::Y),Up=FRotationMatrix(View).GetUnitAxis(EAxis::Z),Center=Eye+View.Vector()*240;
 for(int32 U=1;U<=6;U++)for(int32 Article=0;Article<3;Article++)
 {
  const int32 Index=(U-1)*3+Article;const FVector Position=Center+Right*((Article-1)*85.f)+Up*(75-(U-1)*26.f);auto* A=GetWorld()->SpawnActor<AWordQuestMemoryFragment>(Position,(Eye-Position).Rotation());A->Setup(UI,{FString::Printf(TEXT("Unit %02d / Text %c"),U,TCHAR('A'+Article)),10000+Index,22,false},false,FVector2D(1000,200));Fragments.Add(A);
 }
}
void UWordQuestMemoryDirector::HandleWorldAction(int32 Action)
{
 if(Action==-30&&bTransition){TransitionClock=3;return;}
 if(Action==-40){ToggleDirectory();return;}
 if(Action>=10000&&Action<10018){const int32 Index=Action-10000;UGameplayStatics::SetGamePaused(this,false);UGameplayStatics::OpenLevel(this,FName(*FString::Printf(TEXT("L_U%02d_%c"),Index/3+1,TCHAR('A'+Index%3))));}
}
