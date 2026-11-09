#include "WordQuestCharacterStagingLibrary.h"
#include "UObject/Package.h"
#include "UObject/UObjectGlobals.h"
#include "Engine/SkeletalMesh.h"
#include "Animation/Skeleton.h"
#include "PhysicsEngine/PhysicsAsset.h"
#include "Components/SkeletalMeshComponent.h"
#include "Animation/AnimationAsset.h"
#include "Materials/MaterialInstanceConstant.h"
#include "Engine/Texture2D.h"
#if WITH_EDITOR
#include "MetaHumanCharacter.h"
#include "ImageCore.h"
#endif

bool UWordQuestCharacterStagingLibrary::PersistPreviewTexture(UTexture2D* Target,UTexture2D* Source,UObject* Object,const FString& Hint)
{
#if WITH_EDITOR
    if(!Target||!Source||!Target->GetOutermost()->GetName().StartsWith(TEXT("/Game/Memory/Characters/")))return false;
    FImage Image;
    if(Source->Source.IsValid())
    {
        if(!Source->Source.GetMipImage(Image,0))return false;
    }
    else
    {
        // Editable MHC textures are GPU-updated transients; duplicating their
        // empty CPU mip does not preserve synthesized skin on disk. Read the
        // character's original stored payload, as MHC's assembly path does.
        auto* Character=Cast<UMetaHumanCharacter>(Object);if(!Character)return false;
        bool Found=false;auto* Types=StaticEnum<EFaceTextureType>();
        for(int32 I=0;I<Types->NumEnums()-1;++I)
        {
            const FString Name=Types->GetNameStringByIndex(I);
            if(!Hint.EndsWith(TEXT("_")+Name,ESearchCase::IgnoreCase))continue;
            auto Type=static_cast<EFaceTextureType>(Types->GetValueByIndex(I));
            const auto* Info=Character->SynthesizedFaceTexturesInfo.Find(Type);if(!Info)return false;
            const auto Future=Character->GetSynthesizedFaceTextureDataAsync(Type);
            const FSharedBuffer& Buffer=Future.Get();if(Buffer.IsNull())return false;
            const auto ImageInfo=Info->ToImageInfo();
            if(Buffer.GetSize()!=uint64(ImageInfo.GetImageSizeBytes()))return false;
            FImageView(ImageInfo,const_cast<void*>(Buffer.GetData())).CopyTo(Image);Found=true;break;
        }
        if(!Found){UE_LOG(LogTemp,Error,TEXT("WQ_TEXTURE_PAYLOAD_MISSING %s"),*Hint);return false;}
    }
    Target->PreEditChange(nullptr);Target->Source.Init(Image);
    Target->SRGB=Source->SRGB;Target->CompressionSettings=Source->CompressionSettings;
    Target->MipGenSettings=TMGS_FromTextureGroup;Target->NeverStream=false;
    Target->MarkPackageDirty();Target->PostEditChange();
    UE_LOG(LogTemp,Display,TEXT("WQ_TEXTURE_SOURCE_PERSISTED %s %dx%d bytes=%lld"),*Target->GetPathName(),Image.SizeX,Image.SizeY,Image.RawData.Num());
    return Target->Source.IsValid();
#else
    return false;
#endif
}

bool UWordQuestCharacterStagingLibrary::CopyPreviewMaterial(UMaterialInstanceConstant* Target, UMaterialInstance* Source)
{
#if WITH_EDITOR
    if(!Target||!Source||!Target->GetOutermost()->GetName().StartsWith(TEXT("/Game/Memory/Characters/")))return false;
    Target->PreEditChange(nullptr);
    // Preserve associations, inherited values, and static permutations. Global-name
    // Python getters return zero for some layered parameters and destroy skin.
    Target->CopyMaterialUniformParametersEditorOnly(Source,true);
    Target->BasePropertyOverrides=Source->BasePropertyOverrides;
    Target->bOverrideSubsurfaceProfile=Source->bOverrideSubsurfaceProfile;
    Target->SubsurfaceProfile=Source->SubsurfaceProfile;
    Target->SubsurfaceProfiles=Source->SubsurfaceProfiles;
    Target->MarkPackageDirty();Target->PostEditChange();Target->UpdateStaticPermutation();
    return true;
#else
    return false;
#endif
}

bool UWordQuestCharacterStagingLibrary::ApplyPreviewMaterialParameters(UMaterialInstanceConstant* Target,const TMap<FName,float>& Scalars,const TMap<FName,FLinearColor>& Vectors,const TMap<FName,UTexture*>& Textures)
{
#if WITH_EDITOR
    if(!Target||!Target->GetOutermost()->GetName().StartsWith(TEXT("/Game/Memory/Characters/")))return false;
    Target->PreEditChange(nullptr);
    for(const auto& P:Scalars)Target->SetScalarParameterValueEditorOnly(FMaterialParameterInfo(P.Key),P.Value);
    for(const auto& P:Vectors)Target->SetVectorParameterValueEditorOnly(FMaterialParameterInfo(P.Key),P.Value);
    for(const auto& P:Textures)Target->SetTextureParameterValueEditorOnly(FMaterialParameterInfo(P.Key),P.Value);
    Target->MarkPackageDirty();Target->PostEditChange();Target->UpdateStaticPermutation();
    return true;
#else
    return false;
#endif
}

bool UWordQuestCharacterStagingLibrary::EvaluatePreviewPose(USkeletalMeshComponent* Body,UAnimationAsset* Pose)
{
#if WITH_EDITOR
    auto* Mesh=Body?Body->GetSkeletalMeshAsset():nullptr;
    if(!Mesh||!Pose||!Mesh->GetOutermost()->GetName().StartsWith(TEXT("/Game/Memory/Characters/")))return false;
    auto* Skeleton=const_cast<USkeleton*>(Mesh->GetSkeleton());auto* Source=Pose->GetSkeleton();
    if(!Skeleton||!Source)return false;
    if(!Skeleton->IsCompatibleForEditor(Source))
    {
        const auto& A=Skeleton->GetReferenceSkeleton();const auto& B=Source->GetReferenceSkeleton();
        if(A.GetNum()!=B.GetNum())return false;
        for(int32 I=0;I<A.GetNum();++I)if(A.GetBoneName(I)!=B.GetBoneName(I)||A.GetParentIndex(I)!=B.GetParentIndex(I))return false;
        Skeleton->AddCompatibleSkeleton(Source);Skeleton->MarkPackageDirty();
    }
    const FVector Before=Body->GetSocketLocation(TEXT("pelvis"));
    Body->OverrideAnimationData(Pose,true,false,0.f,1.f);
    Body->SetAnimationMode(EAnimationMode::AnimationSingleNode);Body->PlayAnimation(Pose,true);
    Body->SetPosition(0.f,false);Body->SetUpdateAnimationInEditor(true);
    Body->TickAnimation(0.f,false);Body->RefreshBoneTransforms();Body->UpdateComponentToWorld();Body->MarkRenderDynamicDataDirty();Body->Stop();
    UE_LOG(LogTemp,Display,TEXT("WQ_POSE_EVALUATED %s pelvis_before=%s after=%s"),*Pose->GetName(),*Before.ToString(),*Body->GetSocketLocation(TEXT("pelvis")).ToString());
    return true;
#else
    return false;
#endif
}

bool UWordQuestCharacterStagingLibrary::SetPreviewMeshDependency(USkeletalMesh* Mesh,FName Property,UObject* Dependency)
{
#if WITH_EDITOR
    if(!Mesh||!Dependency||!Mesh->GetOutermost()->GetName().StartsWith(TEXT("/Game/Memory/Characters/")))return false;
    if(Property==TEXT("skeleton")) { auto* Value=Cast<USkeleton>(Dependency);if(!Value)return false;Mesh->SetSkeleton(Value); }
    else if(Property==TEXT("physics_asset")) { auto* Value=Cast<UPhysicsAsset>(Dependency);if(!Value)return false;Mesh->SetPhysicsAsset(Value); }
    else return false;
    Mesh->MarkPackageDirty();return true;
#else
    return false;
#endif
}

#if WITH_EDITOR
#include "AssetRegistry/AssetRegistryModule.h"
#include "Misc/PackageName.h"
#include "UObject/UObjectHash.h"
#endif

bool UWordQuestCharacterStagingLibrary::RequiresPersistentSnapshot(UObject* Object)
{
    return IsValid(Object) && (Object->HasAnyFlags(RF_Transient)
        || Object->GetOutermost() == GetTransientPackage());
}

UObject* UWordQuestCharacterStagingLibrary::DuplicatePreviewAsset(UObject* Source, const FString& PackagePath, const FString& AssetName)
{
#if WITH_EDITOR
    const FString PackageName = PackagePath / AssetName;
    if (!IsValid(Source) || !PackagePath.StartsWith(TEXT("/Game/Memory/Characters/"))
        || AssetName.IsEmpty() || AssetName.Contains(TEXT("/")) || AssetName.Contains(TEXT("."))
        || !FPackageName::IsValidLongPackageName(PackageName))
    {
        UE_LOG(LogTemp, Error, TEXT("WQ_CHARACTER_SNAPSHOT_INVALID_DESTINATION %s"), *PackageName);
        return nullptr;
    }
    const FString ObjectPath = PackageName + TEXT(".") + AssetName;
    if (UObject* Existing = FindObject<UObject>(nullptr, *ObjectPath))
    {
        return Existing;
    }
    UPackage* Package = CreatePackage(*PackageName);
    UObject* Copy = StaticDuplicateObject(Source, Package, *AssetName, RF_AllFlags & ~RF_Transient);
    if (!Copy)
    {
        UE_LOG(LogTemp, Error, TEXT("WQ_CHARACTER_SNAPSHOT_DUPLICATION_FAILED %s"), *ObjectPath);
        return nullptr;
    }
    Copy->ClearFlags(RF_Transient | RF_DuplicateTransient | RF_NonPIEDuplicateTransient);
    Copy->SetFlags(RF_Public | RF_Standalone | RF_Transactional);
    ForEachObjectWithOuter(Copy, [](UObject* Object)
    {
        Object->ClearFlags(RF_Transient | RF_DuplicateTransient | RF_NonPIEDuplicateTransient);
    }, true);
    FAssetRegistryModule::AssetCreated(Copy);
    Copy->MarkPackageDirty();
    UE_LOG(LogTemp, Display, TEXT("WQ_CHARACTER_SNAPSHOT_CREATED %s"), *ObjectPath);
    return Copy;
#else
    return nullptr;
#endif
}
