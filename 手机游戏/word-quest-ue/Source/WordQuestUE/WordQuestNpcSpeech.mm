#include "WordQuestNpcSpeech.h"
#if PLATFORM_MAC
#include "GenericPlatform/ITextToSpeechFactory.h"
#include "GenericPlatform/TextToSpeechBase.h"
#include "Async/Async.h"
#include "Mac/CocoaThread.h"
#import <AVFoundation/AVFoundation.h>

namespace
{
 FString FromNative(NSString* Value){return Value?FString(UTF8_TO_TCHAR([Value UTF8String])):FString();}
 struct FWordQuestNpcSpeechState
 {
  TAtomic<bool> Alive{true},Speaking{false};
  TAtomic<uint64> Serial{0};
  TWeakPtr<FTextToSpeechBase> Owner;
 };
}

/** Delegate retains only thread-safe state, never an Actor/UObject or spoken text. */
@interface WQNpcSpeechDelegate : NSObject<AVSpeechSynthesizerDelegate>
{
@public
 TSharedPtr<FWordQuestNpcSpeechState,ESPMode::ThreadSafe> State;
 AVSpeechUtterance* Current;
 uint64 Serial;
}
-(void)setUtterance:(AVSpeechUtterance*)Utterance serial:(uint64)Ticket;
@end
@implementation WQNpcSpeechDelegate
-(void)setUtterance:(AVSpeechUtterance*)Utterance serial:(uint64)Ticket
{
 [Current release];Current=[Utterance retain];Serial=Ticket;
}
-(void)dealloc{[Current release];State.Reset();[super dealloc];}
-(void)speechSynthesizer:(AVSpeechSynthesizer*)Synth didFinishSpeechUtterance:(AVSpeechUtterance*)Utterance
{
 if(Utterance!=Current||!State.IsValid())return;
 auto Copy=State;const uint64 Ticket=Serial;
 if(!Copy->Alive.Load()||Copy->Serial.Load()!=Ticket)return;
 Copy->Speaking.Store(false);
 AsyncTask(ENamedThreads::GameThread,[Copy,Ticket]()
 {
  if(!Copy->Alive.Load()||Copy->Serial.Load()!=Ticket)return;
  if(auto Owner=Copy->Owner.Pin())if(Owner->IsActive())Owner->OnTextToSpeechFinishSpeaking_GameThread();
 });
}
-(void)speechSynthesizer:(AVSpeechSynthesizer*)Synth didCancelSpeechUtterance:(AVSpeechUtterance*)Utterance
{
 if(Utterance==Current&&State.IsValid()&&State->Serial.Load()==Serial)State->Speaking.Store(false);
}
@end

namespace
{
 class FWordQuestNamedSpeech final : public FTextToSpeechBase
 {
 public:
  explicit FWordQuestNamedSpeech(const FWordQuestNpcSpeechSettings& In):Settings(In),State(MakeShared<FWordQuestNpcSpeechState,ESPMode::ThreadSafe>()),Rate(In.NormalizedRate()){}
  virtual ~FWordQuestNamedSpeech()override{if(IsActive())Deactivate();else Teardown();}
  virtual void Speak(const FString& Text)override
  {
   if(!IsActive()||Text.IsEmpty())return;
   StopSpeaking();const uint64 Ticket=State->Serial.Load()+1;State->Serial.Store(Ticket);State->Speaking.Store(true);
   // SDK calls run on the macOS main thread. No shell, command syntax, file output,
   // SSML or inline say commands can be interpreted from model-generated text.
   MainThreadCall(^{@autoreleasepool
   {
    if(!Synth||!Delegate||!State->Alive.Load()){State->Speaking.Store(false);return;}
    NSString* Message=[NSString stringWithUTF8String:TCHAR_TO_UTF8(*Text)];
    AVSpeechUtterance* Utterance=[AVSpeechUtterance speechUtteranceWithString:Message];
    Utterance.voice=[AVSpeechSynthesisVoice voiceWithIdentifier:[NSString stringWithUTF8String:TCHAR_TO_UTF8(*Settings.VoiceIdentifier)]];
    if(!Utterance.voice){State->Speaking.Store(false);return;}
    Utterance.rate=Rate;Utterance.pitchMultiplier=Settings.PitchMultiplier();Utterance.volume=IsMuted()?0.f:Volume;
    [Delegate setUtterance:Utterance serial:Ticket];[Synth speakUtterance:Utterance];
   }});
  }
  virtual bool IsSpeaking()const override{return IsActive()&&State->Speaking.Load();}
  virtual void StopSpeaking()override
  {
   State->Serial.Store(State->Serial.Load()+1);State->Speaking.Store(false);
   MainThreadCall(^{if(Synth)[Synth stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];});
  }
  virtual float GetVolume()const override{return Volume;}
  virtual void SetVolume(float Value)override{Volume=FMath::Clamp(Value,0.f,1.f);}
  virtual float GetRate()const override{return Rate;}
  virtual void SetRate(float Value)override{Rate=FMath::Clamp(Value,.1f,.9f);}
  virtual void Mute()override{SetMuted(true);}
  virtual void Unmute()override{SetMuted(false);}
 protected:
  virtual void OnActivated()override
  {
   State->Alive.Store(true);State->Owner=AsShared();
   MainThreadCall(^{@autoreleasepool{Synth=[[AVSpeechSynthesizer alloc] init];Delegate=[[WQNpcSpeechDelegate alloc] init];Delegate->State=State;Synth.delegate=Delegate;}});
  }
  virtual void OnDeactivated()override{Teardown();}
 private:
  void Teardown()
  {
   State->Alive.Store(false);State->Speaking.Store(false);State->Serial.Store(State->Serial.Load()+1);State->Owner.Reset();
   MainThreadCall(^{if(Synth){Synth.delegate=nil;[Synth stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];[Synth release];Synth=nil;}if(Delegate){[Delegate release];Delegate=nil;}});
  }
  FWordQuestNpcSpeechSettings Settings;
  TSharedRef<FWordQuestNpcSpeechState,ESPMode::ThreadSafe> State;
  float Rate=.45f,Volume=.85f;
  AVSpeechSynthesizer* Synth=nil;
  WQNpcSpeechDelegate* Delegate=nil;
 };
 class FWordQuestNamedSpeechFactory final : public ITextToSpeechFactory
 {
 public:
  explicit FWordQuestNamedSpeechFactory(const FWordQuestNpcSpeechSettings& In):Settings(In){}
  virtual TSharedRef<FTextToSpeechBase> Create()override{return MakeShared<FWordQuestNamedSpeech>(Settings);}
 private:FWordQuestNpcSpeechSettings Settings;
 };
}

TSharedPtr<ITextToSpeechFactory> WordQuestNpcSpeech::MakeMacFactory(FWordQuestNpcSpeechSettings Settings,FString& Report)
{
 __block FWordQuestNpcSpeechSettings Chosen=Settings;
 // Enumerating available local voices does not request or download any asset.
 MainThreadCall(^{@autoreleasepool
 {
  int32 Best=-1;
  for(AVSpeechSynthesisVoice* Voice in [AVSpeechSynthesisVoice speechVoices])
  {
   const FString Name=FromNative(Voice.name),Language=FromNative(Voice.language),Id=FromNative(Voice.identifier);
   if(!Language.StartsWith(TEXT("en")))continue;
   const bool Match=Name.Equals(Settings.Name,ESearchCase::IgnoreCase)||Name.StartsWith(Settings.Name+TEXT(" ("),ESearchCase::IgnoreCase);
   const int32 Score=(Match?1000:0)+(Language==TEXT("en-US")?40:0)+int32(Voice.quality)*10;
   if(Score<Best||(Score==Best&&!Chosen.VoiceIdentifier.IsEmpty()&&Id>=Chosen.VoiceIdentifier))continue;
   Best=Score;Chosen.VoiceIdentifier=Id;Chosen.ActualName=Name;Chosen.Language=Language;Chosen.bExactVoice=Match;
  }
 }});
 if(Chosen.VoiceIdentifier.IsEmpty()){Report=TEXT("native_no_installed_english_voice");return nullptr;}
 Report=FString::Printf(TEXT("%s requested=%s actual=%s language=%s wpm=%.0f normalized_rate=%.3f pitch=%.0f multiplier=%.3f"),Chosen.bExactVoice?TEXT("native_named"):TEXT("native_english_fallback"),*Settings.Name,*Chosen.ActualName,*Chosen.Language,Chosen.WordsPerMinute,Chosen.NormalizedRate(),Chosen.Pitch,Chosen.PitchMultiplier());
 return MakeShared<FWordQuestNamedSpeechFactory>(Chosen);
}
TArray<FString> WordQuestNpcSpeech::MacInstalledVoices()
{
 __block TArray<FString> Result;
 MainThreadCall(^{@autoreleasepool{for(AVSpeechSynthesisVoice* Voice in [AVSpeechSynthesisVoice speechVoices])if([Voice.language hasPrefix:@"en"])Result.Add(FromNative(Voice.name)+TEXT("|")+FromNative(Voice.language)+TEXT("|")+FromNative(Voice.identifier));}});
 Result.Sort();return Result;
}
#endif
