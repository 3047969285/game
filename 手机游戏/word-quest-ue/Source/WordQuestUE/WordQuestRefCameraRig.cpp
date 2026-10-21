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
#include "Components/SkeletalMeshComponent.h"
#include "GroomAsset.h"
#include "GroomBindingAsset.h"
#include "GroomComponent.h"
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
    const TCHAR* Names[]={TEXT("front"),TEXT("q34"),TEXT("side"),TEXT("back"),TEXT("closeup")};
    return SaveView(Index,FPaths::Combine(FPaths::ProjectSavedDir(),TEXT("Compare"),CharacterId),Names[Index]);
}

bool AWordQuestRefCameraRig::ExportRunView(int32 Index,const FString& CharacterId,const FString& RunId)
{
    if(Index<0 || Index>=5 || CharacterId.IsEmpty() || RunId.IsEmpty() || CharacterId.Len()>64 || RunId.Len()>64)return false;
    for(const FString* Value : {&CharacterId,&RunId})for(TCHAR C:*Value)if(!FChar::IsAlnum(C)&&C!='_'&&C!='-')return false;
    const TCHAR* Names[]={TEXT("front"),TEXT("q34"),TEXT("side"),TEXT("back"),TEXT("closeup")};
    return SaveView(Index,FPaths::Combine(FPaths::ProjectSavedDir(),TEXT("CompareRuns"),CharacterId,RunId),Names[Index]);
}

bool AWordQuestRefCameraRig::ExportDiagnosticView(int32 Index,const FString& CharacterId,const FString& Name)
{
    if(CharacterId.IsEmpty() || Name.IsEmpty() || CharacterId.Len()>64 || Name.Len()>64)return false;
    for(const FString* Value : {&CharacterId,&Name})for(TCHAR C:*Value)if(!FChar::IsAlnum(C)&&C!='_'&&C!='-')return false;
    return SaveView(Index,FPaths::Combine(FPaths::ProjectSavedDir(),TEXT("CompareDiagnostics"),CharacterId),Name);
}

bool AWordQuestRefCameraRig::SaveView(int32 Index,const FString& Directory,const FString& Name)
{
    if(!Views.IsValidIndex(Index))return false;
    auto* Target=Views[Index]->TextureTarget.Get();if(!Target)return false;
    FlushRenderingCommands();TArray<FColor> Pixels;
    if(!Target->GameThread_GetRenderTargetResource()->ReadPixels(Pixels)||Pixels.Num()!=1024*1024)return false;
    TArray64<uint8> PNG;FImageUtils::PNGCompressImageArray(1024,1024,Pixels,PNG);
    IFileManager::Get().MakeDirectory(*Directory,true);
    return FFileHelper::SaveArrayToFile(PNG,*FPaths::Combine(Directory,Name+TEXT(".png")));
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


bool AWordQuestRefCameraRig::AttachPreviewGroom(AActor* Actor,UObject* Object,bool bSkinBinding)
{
#if WITH_EDITOR
    auto* Groom=Cast<UGroomAsset>(Object);
    if(!Actor || !Groom)return false;
    USkeletalMeshComponent* Face=nullptr;
    TArray<USkeletalMeshComponent*> Meshes;Actor->GetComponents(Meshes);
    for(auto* Mesh:Meshes)if(Mesh->GetBoneIndex(TEXT("FACIAL_L_Eye"))!=INDEX_NONE){Face=Mesh;break;}
    if(!Face || !Face->GetSkeletalMeshAsset())return false;
    FBox Bounds(ForceInit);
    for(const auto& Group:Groom->GetHairGroupsPlatformData())Bounds+=Group.Strands.GetBounds();
    UE_LOG(LogTemp,Display,TEXT("WQ_GROOM_BOUNDS %s %s"),*Groom->GetName(),*Bounds.ToString());
    const double EyeZ=Face->GetSocketLocation(TEXT("FACIAL_L_Eye")).Z;
    if(!Bounds.IsValid || Bounds.Max.Z<EyeZ-30 || Bounds.Max.Z>EyeZ+80){
        UE_LOG(LogTemp,Error,TEXT("WQ_GROOM_HEAD_BOUNDS_INVALID %s EyeZ=%f"),*Groom->GetName(),EyeZ);
        return false;
    }
    if(!bSkinBinding){
        auto* Component=NewObject<UGroomComponent>(Actor,NAME_None,RF_Transient);
        Actor->AddInstanceComponent(Component);Component->SetupAttachment(Face);
        Component->SetGroomAsset(Groom);Component->RegisterComponent();
        UE_LOG(LogTemp,Display,TEXT("WQ_GROOM_RIGID_PREVIEW %s"),*Groom->GetName());
        return true;
    }
    // MHC preview meshes are transient. Never save a binding that references them.
    auto* Binding=NewObject<UGroomBindingAsset>(GetTransientPackage(),NAME_None,RF_Transient);
    Binding->SetGroom(Groom);Binding->SetTargetSkeletalMesh(Face->GetSkeletalMeshAsset());
    PreviewBindings.Add(Binding);++PendingGroomBindings;
    const TWeakObjectPtr<AActor> WeakActor(Actor);
    const TWeakObjectPtr<USkeletalMeshComponent> WeakFace(Face);
    Binding->Build(FOnGroomBindingAssetBuildCompleteNative::CreateWeakLambda(this,
        [this,WeakActor,WeakFace,Groom](UGroomBindingAsset* Built,EGroomBindingAssetBuildResult Result){
            --PendingGroomBindings;
            if(Result!=EGroomBindingAssetBuildResult::Succeeded || !WeakActor.IsValid() || !WeakFace.IsValid()){
                ++FailedGroomBindings;UE_LOG(LogTemp,Error,TEXT("WQ_GROOM_BINDING_FAILED"));return;
            }
            auto* Component=NewObject<UGroomComponent>(WeakActor.Get(),NAME_None,RF_Transient);
            WeakActor->AddInstanceComponent(Component);Component->SetupAttachment(WeakFace.Get());
            Component->SetGroomAsset(Groom,Built,false);Component->RegisterComponent();
            UE_LOG(LogTemp,Display,TEXT("WQ_GROOM_BOUND %s -> %s"),*Groom->GetName(),*WeakFace->GetName());
        }));
    return true;
#else
    return false;
#endif
}
