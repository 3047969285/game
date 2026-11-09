#include "WordQuestNpcSpeech.h"
#include "TextToSpeechEngineSubsystem.h"
#include "TextToSpeechModule.h"
#include "GenericPlatform/ITextToSpeechFactory.h"
#include "Dom/JsonObject.h"
#include "Serialization/JsonSerializer.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"

bool WordQuestNpcSpeech::ConfigureChannel(UTextToSpeechEngineSubsystem* TTS,FName Channel,const FString& Role,FString& Report)
{
 if(!TTS||Channel.IsNone()){Report=TEXT("tts_unavailable");return false;}
 if(Role.IsEmpty()||Role.Len()>64){Report=TEXT("invalid_role");return false;}
 for(TCHAR C:Role)if(!FChar::IsAlnum(C)&&C!='_'&&C!='-'){Report=TEXT("invalid_role");return false;}
 FString Text;TSharedPtr<FJsonObject> Persona;
 if(!FFileHelper::LoadFileToString(Text,*(FPaths::ProjectContentDir()/TEXT("Data/npc/personas")/(Role+TEXT(".json"))))||!FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Text),Persona)||!Persona){Report=TEXT("missing_voice_persona");return false;}
 const TSharedPtr<FJsonObject>* Voice=nullptr;
 if(!Persona->TryGetObjectField(TEXT("voice"),Voice)){Report=TEXT("missing_voice_settings");return false;}
 FWordQuestNpcSpeechSettings Settings;(*Voice)->TryGetStringField(TEXT("name"),Settings.Name);double Rate=165,Pitch=50;(*Voice)->TryGetNumberField(TEXT("rate"),Rate);(*Voice)->TryGetNumberField(TEXT("pitch"),Pitch);
 Settings.WordsPerMinute=FMath::Clamp(float(Rate),80.f,270.f);Settings.Pitch=FMath::Clamp(float(Pitch),0.f,100.f);
 if(TTS->DoesChannelExist(Channel))TTS->RemoveChannel(Channel);
#if PLATFORM_MAC
 auto Factory=MakeMacFactory(Settings,Report);
 if(Factory.IsValid())
 {
  auto Previous=ITextToSpeechModule::Get().GetCustomFactory();
  ITextToSpeechModule::Get().SetCustomFactory(Factory.ToSharedRef());
  TTS->AddCustomChannel(Channel);
  // Restore another plugin's factory. When none existed, our last factory is safe:
  // channels already hold their own independent native synthesizer and settings.
  if(Previous.IsValid())ITextToSpeechModule::Get().SetCustomFactory(Previous.ToSharedRef());
  if(!TTS->DoesChannelExist(Channel)){Report=TEXT("native_channel_failed");return false;}
  TTS->ActivateChannel(Channel);TTS->SetVolumeOnChannel(Channel,.85f);
  return true;
 }
#endif
 TTS->AddDefaultChannel(Channel);TTS->ActivateChannel(Channel);TTS->SetRateOnChannel(Channel,Settings.NormalizedRate());TTS->SetVolumeOnChannel(Channel,.85f);
 Report=TEXT("platform_default_fallback: named_voice_and_pitch_unavailable");return TTS->DoesChannelExist(Channel);
}
TArray<FString> WordQuestNpcSpeech::InstalledVoices()
{
#if PLATFORM_MAC
 return MacInstalledVoices();
#else
 return {};
#endif
}

#if WITH_DEV_AUTOMATION_TESTS
#include "Misc/AutomationTest.h"
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FWordQuestNpcSpeechControlsTest,"WordQuest.Npc.NamedSpeechControls",EAutomationTestFlags::EditorContext|EAutomationTestFlags::EngineFilter)
bool FWordQuestNpcSpeechControlsTest::RunTest(const FString& Parameters)
{
 FWordQuestNpcSpeechSettings Low,High;Low.WordsPerMinute=158;Low.Pitch=42;High.WordsPerMinute=180;High.Pitch=70;
 TestTrue(TEXT("WPM controls remain distinct"),Low.NormalizedRate()<High.NormalizedRate());TestTrue(TEXT("Pitch controls remain distinct"),Low.PitchMultiplier()<High.PitchMultiplier());
 TestTrue(TEXT("Pitch kept natural"),Low.PitchMultiplier()>=.8f&&High.PitchMultiplier()<=1.2f);
#if PLATFORM_MAC
 for(const FString Name:{FString(TEXT("Daniel")),FString(TEXT("Samantha")),FString(TEXT("Rishi")),FString(TEXT("Reed"))})
 {
  FWordQuestNpcSpeechSettings Settings;Settings.Name=Name;FString Report;auto Factory=WordQuestNpcSpeech::MakeMacFactory(Settings,Report);
  TestTrue(*(Name+TEXT(" available without download")),Factory.IsValid()&&Report.StartsWith(TEXT("native_named")));
 }
#endif
 return true;
}
#endif
