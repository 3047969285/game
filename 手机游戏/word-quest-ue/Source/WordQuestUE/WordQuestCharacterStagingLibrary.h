#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "WordQuestCharacterStagingLibrary.generated.h"

/** Editor-only snapshots. The original MetaHuman and its preview objects stay untouched. */
UCLASS()
class WORDQUESTUE_API UWordQuestCharacterStagingLibrary : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()
public:
    UFUNCTION(BlueprintPure, Category="WordQuest|Editor")
    static bool RequiresPersistentSnapshot(UObject* Object);

    /**
     * Clone a preview object into /Game/Memory/Characters without RF_Transient.
     * Does not save: callers must first replace transient external dependencies,
     * then save via EditorAssetLibrary and verify the saved level after reload.
     */
    UFUNCTION(BlueprintCallable, Category="WordQuest|Editor")
    static UObject* DuplicatePreviewAsset(UObject* Source, const FString& PackagePath, const FString& AssetName);
    UFUNCTION(BlueprintCallable, Category="WordQuest|Editor")
    static bool SetPreviewMeshDependency(class USkeletalMesh* Mesh, FName Property, UObject* Dependency);
    UFUNCTION(BlueprintCallable, Category="WordQuest|Editor")
    static bool EvaluatePreviewPose(class USkeletalMeshComponent* Body, class UAnimationAsset* Pose);
    UFUNCTION(BlueprintCallable, Category="WordQuest|Editor")
    static bool PersistPreviewTexture(class UTexture2D* Target, class UTexture2D* Source, UObject* Character, const FString& Hint);
    UFUNCTION(BlueprintCallable, Category="WordQuest|Editor")
    static bool CopyPreviewMaterial(class UMaterialInstanceConstant* Target, class UMaterialInstance* Source);
    UFUNCTION(BlueprintCallable, Category="WordQuest|Editor")
    static bool ApplyPreviewMaterialParameters(class UMaterialInstanceConstant* Target,const TMap<FName,float>& Scalars,const TMap<FName,FLinearColor>& Vectors,const TMap<FName,class UTexture*>& Textures);
};
