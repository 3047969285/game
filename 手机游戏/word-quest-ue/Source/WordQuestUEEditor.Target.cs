using UnrealBuildTool;

public class WordQuestUEEditorTarget : TargetRules
{
	public WordQuestUEEditorTarget(TargetInfo Target) : base(Target)
	{
		Type = TargetType.Editor;
		DefaultBuildSettings = BuildSettingsVersion.V7;
		IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_8;
		ExtraModuleNames.Add("WordQuestUE");
	}
}
