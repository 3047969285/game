#pragma once
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "Dom/JsonObject.h"
#include "WordQuestMemoryDirector.generated.h"
class UWordQuestExerciseWidget;
class APostProcessVolume;
class ACameraActor;
class AWordQuestMemoryFragment;
class UWidgetInteractionComponent;

/** Data-driven article playback. Real-time UI remains responsive while exercises pause the world. */
UCLASS(ClassGroup=(WordQuest), meta=(BlueprintSpawnableComponent))
class WORDQUESTUE_API UWordQuestMemoryDirector : public UActorComponent
{
 GENERATED_BODY()
public:
 UWordQuestMemoryDirector();
 virtual void BeginPlay() override;
 virtual void EndPlay(const EEndPlayReason::Type Reason) override;
 virtual void TickComponent(float Delta,ELevelTick Tick,FActorComponentTickFunction* Fn) override;
 UFUNCTION(BlueprintCallable) void Advance();
 UFUNCTION(BlueprintCallable) void SetChineseEnabled(bool Enabled);
 UFUNCTION(BlueprintCallable) FString GetPlaybackState() const;
 UFUNCTION(BlueprintCallable) bool OpenExercise(const FString& Reference);
 UFUNCTION(BlueprintCallable) void ExerciseCompleted();
 UFUNCTION(BlueprintCallable) bool RunExerciseProbe(const FString& Kind);
 UFUNCTION(BlueprintCallable) FString GetExerciseResult() const;
 UFUNCTION(BlueprintCallable) bool CaptureEvidence(const FString& Name);
 UFUNCTION(BlueprintCallable) void FinishExerciseProbe();
 UFUNCTION(BlueprintCallable) bool CaptureResponsiveUI(int32 Width,int32 Height,const FString& Name);
 UFUNCTION(BlueprintCallable) FString GetImmersiveState() const;
 UFUNCTION(BlueprintCallable) bool AimAtWordTag(const FString& Word);
 UFUNCTION(BlueprintCallable) FString GetViewHit() const;
 UFUNCTION(BlueprintCallable) bool AimAtSentenceFragment();
 UFUNCTION(BlueprintCallable) bool ProbeGazeSentenceFragment();
 UFUNCTION(BlueprintCallable) void ProbeSetHolding(bool bHolding);
 UFUNCTION(BlueprintCallable) bool SkipTransition();
 UFUNCTION(BlueprintCallable) bool CaptureEvidenceIn(const FString& Folder,const FString& Name);
 UFUNCTION(BlueprintCallable) bool CaptureResponsiveEvidenceIn(const FString& Folder,int32 Width,int32 Height,const FString& Name);
 UFUNCTION(BlueprintCallable) bool CaptureScreenEvidenceIn(const FString& Folder,const FString& Name);
 void SetMessage(const FString& Message);
 void RebuildWorldFragments();
 void NotifyExerciseAttempt(bool Accepted);
 void HandleWorldAction(int32 Action);
private:
 bool LoadArticle();
 void EnterScene();
 void DisplaySentence();
 void MatchWords(const FString& Sentence);
 void UpdateLayers(float Reveal);
 void BeginTransition();
 void FinishScene();
 void TickWorldInteraction(float Real);
 void ClearWorldFragments(bool Dissolve);
 void ShowWord(AActor* Actor,const FString& Word);
 void PersistRememberedWord(const FString& Word);
 void ReloadCurrentHighlights();
 void ToggleDirectory();
 int32 CountVisibleScreenWidgets() const;
 bool CaptureTo(const FString& Folder,int32 Width,int32 Height,const FString& Name);
 bool bChinese=false, bTransition=false, bTransitionCut=false, bCompleted=false;
 int32 Unit=1, SceneIndex=0, SentenceIndex=0, ExerciseIndex=0;
 float SentenceClock=0, TransitionClock=0, LayerReveal=0, LayerTarget=0;
 FString Section=TEXT("section_a"), Error, CurrentSentence;
 TArray<TSharedPtr<FJsonValue>> Scenes, Exercises;
 TArray<FString> Paragraphs, Sentences, ChineseSentences;
 TArray<int32> SentenceParagraphs;
 TArray<FString> CurrentHighlightForms, CurrentHighlightWords;
 TSharedPtr<FJsonObject> UnitData;
 UPROPERTY() TObjectPtr<UWordQuestExerciseWidget> UI;
 UPROPERTY() TObjectPtr<APostProcessVolume> Grade;
 UPROPERTY() TObjectPtr<ACameraActor> ViewCamera;
 UPROPERTY() TArray<TObjectPtr<AActor>> WordLights;
 TArray<FString> ExerciseReferences;
 TMap<FString,FString> Meanings;
 TMap<FString,FString> Phonetics;
 UPROPERTY() TArray<TObjectPtr<AWordQuestMemoryFragment>> Fragments;
 UPROPERTY() TArray<TObjectPtr<AWordQuestMemoryFragment>> FadingFragments;
 UPROPERTY() TArray<TObjectPtr<AActor>> MemoryDust;
 UPROPERTY() TObjectPtr<UWidgetInteractionComponent> WorldPointer;
 UPROPERTY() TObjectPtr<AWordQuestMemoryFragment> WordFragment;
 UPROPERTY() TObjectPtr<AWordQuestMemoryFragment> TransitionFragment;
 UPROPERTY() TObjectPtr<AActor> Scanline;
 TWeakObjectPtr<AActor> GazeActor;
 TSet<FString> RememberedWords;
 FVector LastPlayerPosition=FVector::ZeroVector;
 FVector AnchorEye=FVector::ZeroVector;
 FRotator AnchorView=FRotator::ZeroRotator;
 FVector2D LastTouchPosition=FVector2D::ZeroVector,TouchOrigin=FVector2D::ZeroVector;
 float GazeClock=0,ReadingGaze=0,HoldClock=0,FadeClock=0,DistortionClock=0,ConvergeClock=0,WordPulse=0;
 int32 FocusedFragment=0;
 bool bProbeGazeOverride=false;
 bool bDirectoryOpen=false,bTouchWasDown=false,bPointerWasDown=false,bFirstWordHint=false,bEditingWorldText=false,bProbeHolding=false;
 FString GazeWord;
 TMap<TWeakObjectPtr<AActor>,bool> OriginalVisibility;
};
