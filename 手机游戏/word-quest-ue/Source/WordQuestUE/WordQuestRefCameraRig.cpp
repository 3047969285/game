#include "WordQuestRefCameraRig.h"
#include "Components/SceneCaptureComponent2D.h"
#include "Components/SceneComponent.h"
#include "Engine/TextureRenderTarget2D.h"
#include "ImageUtils.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "HAL/FileManager.h"
#include "RenderingThread.h"
#if WITH_EDITOR
#include "Editor.h"
#include "MetaHumanCharacter.h"
#include "MetaHumanCharacterSkin.h"
#include "MetaHumanCharacterEditorSubsystem.h"
#endif

AWordQuestRefCameraRig::AWordQuestRefCameraRig()
{
    RootComponent=CreateDefaultSubobject<USceneComponent>(TEXT("Root"));
    const TCHAR* Names[]={TEXT("Front"),TEXT("Q34"),TEXT("Side"),TEXT("Back"),TEXT("Closeup")};
    for(int32 I=0;I<5;++I){
        auto* Capture=CreateDefaultSubobject<USceneCaptureComponent2D>(Names[I]);
        Capture->SetupAttachment(RootComponent);Capture->ProjectionType=ECameraProjectionMode::Orthographic;
        Capture->CaptureSource=ESceneCaptureSource::SCS_FinalColorLDR;
        Capture->bCaptureEveryFrame=false;Capture->bCaptureOnMovement=false;Capture->bAlwaysPersistRenderingState=true;
        Capture->PostProcessSettings.bOverride_AutoExposureMethod=true;
        Capture->PostProcessSettings.AutoExposureMethod=EAutoExposureMethod::AEM_Manual;
        Capture->PostProcessSettings.bOverride_AutoExposureApplyPhysicalCameraExposure=true;
        Capture->PostProcessSettings.AutoExposureApplyPhysicalCameraExposure=false;
        Capture->PostProcessSettings.bOverride_AutoExposureBias=true;Capture->PostProcessSettings.AutoExposureBias=-9.5f;
        Capture->PostProcessSettings.bOverride_MotionBlurAmount=true;Capture->PostProcessSettings.MotionBlurAmount=0;
        Capture->PostProcessSettings.bOverride_DynamicGlobalIlluminationMethod=true;
        Capture->PostProcessSettings.DynamicGlobalIlluminationMethod=EDynamicGlobalIlluminationMethod::Lumen;
        Capture->PostProcessSettings.bOverride_ReflectionMethod=true;Capture->PostProcessSettings.ReflectionMethod=EReflectionMethod::Lumen;
        Views.Add(Capture);
    }
}

void AWordQuestRefCameraRig::ConfigureViews()
{
    for(int32 I=0;I<Views.Num();++I){
        auto* C=Views[I].Get();const float Yaw=I==1?Q34Pose.X:I==2?90:I==3?180:0;
        const float Pitch=I==1?Q34Pose.Y:0;const float Roll=I==1?Q34Pose.Z:0;
        const FVector Target=GetActorLocation()+HeadCenterCm;
        const float Distance=I==4?200:400;
        const float Y=FMath::DegreesToRadians(Yaw),P=FMath::DegreesToRadians(Pitch);
        const FVector Location=Target+Distance*FVector(FMath::Sin(Y)*FMath::Cos(P),FMath::Cos(Y)*FMath::Cos(P),FMath::Sin(P));
        FRotator Rotation=(Target-Location).Rotation();Rotation.Roll=Roll;
        C->SetWorldLocationAndRotation(Location,Rotation);C->OrthoWidth=I==4?25:40;
        if(!C->TextureTarget){
            C->TextureTarget=NewObject<UTextureRenderTarget2D>(this);
            C->TextureTarget->RenderTargetFormat=ETextureRenderTargetFormat::RTF_RGBA8;
            C->TextureTarget->ClearColor=FLinearColor::White;
            C->TextureTarget->InitAutoFormat(1024,1024);C->TextureTarget->UpdateResourceImmediate(true);
        }
    }
}
void AWordQuestRefCameraRig::WarmView(int32 Index){if(Views.IsValidIndex(Index))Views[Index]->CaptureScene();}

bool AWordQuestRefCameraRig::ExportView(int32 Index,const FString& CharacterId)
{
    if(!Views.IsValidIndex(Index)||CharacterId.IsEmpty()||CharacterId.Len()>64)return false;
    for(TCHAR C:CharacterId)if(!FChar::IsAlnum(C)&&C!='_'&&C!='-')return false;
    auto* Target=Views[Index]->TextureTarget.Get();if(!Target)return false;
    FlushRenderingCommands();TArray<FColor> Pixels;
    if(!Target->GameThread_GetRenderTargetResource()->ReadPixels(Pixels)||Pixels.Num()!=1024*1024)return false;
    TArray64<uint8> PNG;FImageUtils::PNGCompressImageArray(1024,1024,Pixels,PNG);
    const TCHAR* Names[]={TEXT("front"),TEXT("q34"),TEXT("side"),TEXT("back"),TEXT("closeup")};
    const FString Directory=FPaths::Combine(FPaths::ProjectSavedDir(),TEXT("Compare"),CharacterId);
    IFileManager::Get().MakeDirectory(*Directory,true);
    return FFileHelper::SaveArrayToFile(PNG,*FPaths::Combine(Directory,FString(Names[Index])+TEXT(".png")));
}


bool AWordQuestRefCameraRig::UsePreviewSkin(UObject* Object)
{
#if WITH_EDITOR
    auto* Character=Cast<UMetaHumanCharacter>(Object);
    auto* Subsystem=GEditor ? GEditor->GetEditorSubsystem<UMetaHumanCharacterEditorSubsystem>() : nullptr;
    if(!Character || !Subsystem || !Subsystem->IsObjectAddedForEditing(Character))return false;
    Subsystem->UpdateCharacterPreviewMaterial(Character, EMetaHumanCharacterSkinPreviewMaterial::Editable, false);
    return true;
#else
    return false;
#endif
}
