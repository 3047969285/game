using UnrealBuildTool;

public class WordQuestUE : ModuleRules
{
	public WordQuestUE(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
		PublicDependencyModuleNames.AddRange(new string[]
		{
			"Core", "CoreUObject", "Engine", "InputCore", "Json", "JsonUtilities", "UMG", "Slate", "SlateCore", "RenderCore", "RHI"
		});
		if (Target.bBuildEditor)
		{
			PrivateDependencyModuleNames.AddRange(new string[] { "UnrealEd", "MetaHumanCharacter", "MetaHumanCharacterEditor", "MetaHumanSDKRuntime", "ImageCore", "HairStrandsCore", "AssetRegistry" });
		}
	}
}
