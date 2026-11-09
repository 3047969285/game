#include "WordQuestNpcProtocol.h"
#include "WordQuestNpcSpeech.h"
#if WITH_DEV_AUTOMATION_TESTS
#include "Misc/AutomationTest.h"
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FWordQuestNpcUtf8SplitTest,"WordQuest.Npc.SseUtf8EveryBoundary",EAutomationTestFlags::EditorContext|EAutomationTestFlags::EngineFilter)
bool FWordQuestNpcUtf8SplitTest::RunTest(const FString& Parameters)
{
 const FString Input=TEXT("data: {\"choices\":[{\"delta\":{\"content\":\"你好 — hello\"}}]}\r\n\r\ndata: {\"choices\":[],\"usage\":{\"total_tokens\":17}}\n\ndata: [DONE]\n\n");FTCHARToUTF8 Encoded(*Input);TArray<uint8> All;All.Append(reinterpret_cast<const uint8*>(Encoded.Get()),Encoded.Length());
 for(int32 I=0;I<=All.Num();++I)
 {
  FWordQuestNpcSseDecoder Decoder;TArray<uint8> First,Second;First.Append(All.GetData(),I);Second.Append(All.GetData()+I,All.Num()-I);Decoder.Push(First);Decoder.Push(Second);
  if(!TestEqual(TEXT("UTF8 content"),Decoder.Text,FString(TEXT("你好 — hello")))||!TestEqual(TEXT("usage"),Decoder.TotalTokens,17)||!TestTrue(TEXT("done"),Decoder.bDone))return false;
 }
 return true;
}
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FWordQuestNpcSseFramingTest,"WordQuest.Npc.SseFramingAndBounds",EAutomationTestFlags::EditorContext|EAutomationTestFlags::EngineFilter)
bool FWordQuestNpcSseFramingTest::RunTest(const FString& Parameters)
{
 auto Push=[](FWordQuestNpcSseDecoder& Decoder,const FString& Input){FTCHARToUTF8 Encoded(*Input);TArray<uint8> Bytes;Bytes.Append(reinterpret_cast<const uint8*>(Encoded.Get()),Encoded.Length());return Decoder.Push(Bytes);};
 FWordQuestNpcSseDecoder Decoder;
 Push(Decoder,TEXT(": heartbeat\n\ndata: {not-json}\n\ndata: {\"choices\":[\ndata: {\"delta\":{\"content\":\"Offline day.\"}}]}\n\n"));
 TestTrue(TEXT("Malformed event recorded"),Decoder.bMalformed);TestEqual(TEXT("Multiline data joined"),Decoder.Text,FString(TEXT("Offline day.")));
 Push(Decoder,TEXT("data: [DONE]\n\n"));Push(Decoder,TEXT("data: {\"choices\":[{\"delta\":{\"content\":\"ignored\"}}]}\n\n"));TestEqual(TEXT("After done ignored"),Decoder.Text,FString(TEXT("Offline day.")));
 FWordQuestNpcSseDecoder Bounded;TArray<uint8> Huge;Huge.SetNumZeroed(1024*1024+1);Bounded.Push(Huge);TestTrue(TEXT("Oversized stream rejected"),Bounded.bDone&&Bounded.bMalformed);return true;
}

IMPLEMENT_SIMPLE_AUTOMATION_TEST(FWordQuestNpcMetadataTest,"WordQuest.Npc.MetadataV12",EAutomationTestFlags::EditorContext|EAutomationTestFlags::EngineFilter)
bool FWordQuestNpcMetadataTest::RunTest(const FString& Parameters)
{
 const FString Meta=TEXT("\n@@META {\"used_words\":[\"device\"],\"correction\":null,\"suggested_replies\":[\"I read a book.\",\"一起读书\",\"Can I sit here?\"]}");
 FWordQuestNpcReply Reply;
 TestTrue(TEXT("valid metadata"),FWordQuestNpcReply::Parse(TEXT("A device can wait.")+Meta,Reply));
 TestEqual(TEXT("Unicode suggestions"),Reply.SuggestedReplies.Num(),3);
 TestEqual(TEXT("only speech"),Reply.Spoken,FString(TEXT("A device can wait.")));
 TestFalse(TEXT("legacy JSON rejected"),FWordQuestNpcReply::Parse(TEXT("A device can wait.\n{}"),Reply));
 TestFalse(TEXT("extra tail rejected"),FWordQuestNpcReply::Parse(TEXT("A device can wait.")+Meta+TEXT("\nextra"),Reply));
 TestTrue(TEXT("unused listed word is dropped, reply kept"),FWordQuestNpcReply::Parse(TEXT("Let us read.")+Meta,Reply));
 TestEqual(TEXT("dropped word not reported"),Reply.UsedWords.Num(),0);
 TestFalse(TEXT("future claim"),FWordQuestNpcReply::Parse(TEXT("I remember living in 2090; a device was different.")+Meta,Reply));
 TestTrue(TEXT("confusion allowed"),FWordQuestNpcReply::Parse(TEXT("2090? I have no idea; this device needs charging.")+Meta,Reply));
 TestEqual(TEXT("split marker withheld"),FWordQuestNpcReply::SpokenPrefix(TEXT("A device can wait.\n@@ME")),FString(TEXT("A device can wait.")));
 return true;
}

IMPLEMENT_SIMPLE_AUTOMATION_TEST(FWordQuestNamedSpeechTest,"WordQuest.Npc.NamedSpeechControls",EAutomationTestFlags::EditorContext|EAutomationTestFlags::EngineFilter)
bool FWordQuestNamedSpeechTest::RunTest(const FString& Parameters)
{
 FWordQuestNpcSpeechSettings A,B;A.WordsPerMinute=158;A.Pitch=42;B.WordsPerMinute=180;B.Pitch=70;
 TestTrue(TEXT("distinct rates"),A.NormalizedRate()<B.NormalizedRate());TestTrue(TEXT("distinct pitches"),A.PitchMultiplier()<B.PitchMultiplier());
#if PLATFORM_MAC
 for(const TCHAR* Name:{TEXT("Daniel"),TEXT("Samantha"),TEXT("Rishi"),TEXT("Reed")})
 {
  A.Name=Name;FString Report;auto Factory=WordQuestNpcSpeech::MakeMacFactory(A,Report);
  TestTrue(TEXT("local named English voice"),Factory.IsValid()&&Report.StartsWith(TEXT("native_named")));
 }
#endif
 return true;
}
#endif
