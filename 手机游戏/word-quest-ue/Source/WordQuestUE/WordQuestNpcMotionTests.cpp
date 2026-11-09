#include "WordQuestNpcMotion.h"
#if WITH_DEV_AUTOMATION_TESTS
#include "Misc/AutomationTest.h"

IMPLEMENT_SIMPLE_AUTOMATION_TEST(FWordQuestNpcSchedulePoseTest, "WordQuest.Npc.SchedulePose", EAutomationTestFlags::EditorContext | EAutomationTestFlags::EngineFilter)
bool FWordQuestNpcSchedulePoseTest::RunTest(const FString& Parameters)
{
 TestEqual(TEXT("Paul reads in armchair"), UWordQuestNpcMotion::PoseForActivity(TEXT("sits in the armchair reading a paperback")), FString(TEXT("sit_read")));
 TestEqual(TEXT("Phone on sofa"), UWordQuestNpcMotion::PoseForActivity(TEXT("sits on the sofa with a phone")), FString(TEXT("sit_phone")));
 TestEqual(TEXT("Standing phone"), UWordQuestNpcMotion::PoseForActivity(TEXT("standing and checking a phone")), FString(TEXT("stand_phone")));
 TestEqual(TEXT("Empty schedule"), UWordQuestNpcMotion::PoseForActivity(TEXT("")), FString(TEXT("stand")));
 return true;
}
#endif
