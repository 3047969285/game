#include "WordQuestRenderDiagnostics.h"
#include "RHI.h"
#include "Components/SceneCaptureComponent2D.h"
#include "RenderUtils.h"
#include "HAL/IConsoleManager.h"
#include "Engine/SceneCapture2D.h"
#include "Engine/TextureRenderTarget2D.h"
#include "Engine/World.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/PlayerInput.h"
#include "InputCoreTypes.h"
#include "Camera/PlayerCameraManager.h"
#include "Kismet/GameplayStatics.h"
#include "Containers/Ticker.h"
#include "ImageUtils.h"
#include "RenderingThread.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "HAL/FileManager.h"
TMap<FString,FString> UWordQuestRenderDiagnostics::Capabilities(){
 TMap<FString,FString> R;R.Add(TEXT("GPU"),GRHIAdapterName);R.Add(TEXT("RHIHardwareRayTracing"),GRHISupportsRayTracing?TEXT("true"):TEXT("false"));R.Add(TEXT("RHIInlineRayTracing"),GRHISupportsInlineRayTracing?TEXT("true"):TEXT("false"));
 for(const TCHAR* Name:{TEXT("r.RayTracing"),TEXT("r.Lumen.HardwareRayTracing"),TEXT("r.MegaLights.Supported"),TEXT("r.MegaLights.EnableForProject"),TEXT("r.MegaLights.Allowed"),TEXT("r.MegaLights.HardwareRayTracing"),TEXT("r.DynamicGlobalIlluminationMethod"),TEXT("r.ReflectionMethod"),TEXT("r.Shadow.Virtual.Enable")}){auto* V=IConsoleManager::Get().FindConsoleVariable(Name);R.Add(Name,V?V->GetString():TEXT("unavailable"));}return R;
}

void UWordQuestRenderDiagnostics::ConfigureCapture(USceneCaptureComponent2D* C){if(C){C->ShowFlags.SetAntiAliasing(true);C->ShowFlags.SetTemporalAA(true);C->bAlwaysPersistRenderingState=true;}}

bool UWordQuestRenderDiagnostics::InjectNavigationKey(UObject* Context,FName Name,bool Pressed,float Amount)
{
#if WITH_EDITOR
 auto* PC=UGameplayStatics::GetPlayerController(Context,0);if(!PC)return false;
 const FString Key=Name.ToString();const bool Axis=Key==TEXT("MouseX")||Key==TEXT("MouseY");
 if(!Axis&&Key!=TEXT("W")&&Key!=TEXT("A")&&Key!=TEXT("S")&&Key!=TEXT("D"))return false;
 PC->InputKey(FInputKeyParams(FKey(Name),Axis?IE_Axis:(Pressed?IE_Pressed:IE_Released),double(Amount)));return true;
#else
 return false;
#endif
}

bool UWordQuestRenderDiagnostics::RequestWorldCapture(UObject* WorldContext,int32 Width,int32 Height,const FString& AbsolutePath)
{
 UWorld* World=WorldContext?WorldContext->GetWorld():nullptr;
 auto* PC=World?UGameplayStatics::GetPlayerController(World,0):nullptr;
 FString Path=FPaths::ConvertRelativePathToFull(AbsolutePath);FPaths::CollapseRelativeDirectories(Path);
 const FString Root=FPaths::ConvertRelativePathToFull(FPaths::ProjectDir());
 if(!World||!PC||Width<64||Height<64||Width>4096||Height>4096||
    !(Path.StartsWith(Root+TEXT("Docs/qa/"))||Path.StartsWith(Root+TEXT("Saved/")))||!Path.EndsWith(TEXT(".png")))return false;
 FVector Location;FRotator Rotation;PC->GetPlayerViewPoint(Location,Rotation);
 FActorSpawnParameters Params;Params.ObjectFlags|=RF_Transient;Params.SpawnCollisionHandlingOverride=ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
 auto* Actor=World->SpawnActor<ASceneCapture2D>(Location,Rotation,Params);if(!Actor)return false;
 auto* Capture=Actor->GetCaptureComponent2D();auto* Target=NewObject<UTextureRenderTarget2D>(Actor);
 Target->RenderTargetFormat=ETextureRenderTargetFormat::RTF_RGBA8;Target->ClearColor=FLinearColor::Transparent;
 Target->InitAutoFormat(Width,Height);Target->UpdateResourceImmediate(true);
 Capture->TextureTarget=Target;Capture->CaptureSource=ESceneCaptureSource::SCS_FinalColorLDR;
 Capture->bCaptureEveryFrame=false;Capture->bCaptureOnMovement=false;Capture->bAlwaysPersistRenderingState=true;
 if(PC->PlayerCameraManager){const auto& View=PC->PlayerCameraManager->GetCameraCacheView();Capture->FOVAngle=View.FOV;Capture->PostProcessSettings=View.PostProcessSettings;Capture->PostProcessBlendWeight=1.f;}
 Capture->PostProcessSettings.bOverride_MotionBlurAmount=true;Capture->PostProcessSettings.MotionBlurAmount=0;
 ConfigureCapture(Capture);
 const double Started=FPlatformTime::Seconds();TWeakObjectPtr<ASceneCapture2D> WeakActor=Actor;
 FTSTicker::GetCoreTicker().AddTicker(FTickerDelegate::CreateLambda([WeakActor,Path,Width,Height,Started,Frames=0](float Delta) mutable
 {
  auto* Live=WeakActor.Get();if(!Live||!Live->GetWorld())return false;
  auto* C=Live->GetCaptureComponent2D();C->CaptureScene();++Frames;
  if(Frames<96||FPlatformTime::Seconds()-Started<3.)return true;
  FlushRenderingCommands();TArray<FColor> Pixels;
  if(C->TextureTarget->GameThread_GetRenderTargetResource()->ReadPixels(Pixels)&&Pixels.Num()==Width*Height)
  {
   // SCS_FinalColorLDR leaves alpha=0 in the RT; viewers would show evidence as blank/white, so force opaque.
   for(FColor& Pixel:Pixels)Pixel.A=255;
   TArray64<uint8> PNG;FImageUtils::PNGCompressImageArray(Width,Height,Pixels,PNG);
   IFileManager::Get().MakeDirectory(*FPaths::GetPath(Path),true);
   if(FFileHelper::SaveArrayToFile(PNG,*Path)){UE_LOG(LogTemp,Display,TEXT("WQ_WORLD_CAPTURE_SAVED %s %dx%d frames=%d"),*Path,Width,Height,Frames);}
   else{UE_LOG(LogTemp,Error,TEXT("WQ_WORLD_CAPTURE_WRITE_FAILED %s"),*Path);}
  }
  else{UE_LOG(LogTemp,Error,TEXT("WQ_WORLD_CAPTURE_READBACK_FAILED %s"),*Path);}
  Live->Destroy();return false;
 }));
 return true;
}
