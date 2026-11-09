#pragma once
#include "CoreMinimal.h"
class UTextToSpeechEngineSubsystem;
class ITextToSpeechFactory;

/** Persona settings use author-facing WPM and a neutral 0..100 pitch control. */
struct FWordQuestNpcSpeechSettings
{
 FString Name,VoiceIdentifier,ActualName,Language;
 float WordsPerMinute=165.f,Pitch=50.f;
 float NormalizedRate()const{return FMath::Clamp(WordsPerMinute/360.f,.2f,.75f);}
 float PitchMultiplier()const{return FMath::Clamp(.8f+Pitch*.004f,.8f,1.2f);}
 bool bExactVoice=false;
};

namespace WordQuestNpcSpeech
{
 /** Configures and activates a UE TextToSpeech custom channel; no text or credentials are logged.
  * Returns channel creation success. Report distinguishes an exact named voice from fallback.
  * Do not subsequently SetRateOnChannel(.48): it would overwrite the persona rate.
  */
 bool ConfigureChannel(UTextToSpeechEngineSubsystem* TTS,FName Channel,const FString& Role,FString& Report);
 /** Read-only enumeration of locally available voices; never requests downloads. */
 TArray<FString> InstalledVoices();
#if PLATFORM_MAC
 TSharedPtr<ITextToSpeechFactory> MakeMacFactory(FWordQuestNpcSpeechSettings Settings,FString& Report);
 TArray<FString> MacInstalledVoices();
#endif
}
