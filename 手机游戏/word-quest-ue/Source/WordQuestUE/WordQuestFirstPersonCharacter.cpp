#include "WordQuestFirstPersonCharacter.h"
#include "Engine/World.h"
#include "CineCameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "Components/PrimitiveComponent.h"
#include "Components/SkeletalMeshComponent.h"
#include "Engine/SkeletalMesh.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "GameFramework/PlayerController.h"
#include "Kismet/GameplayStatics.h"

AWordQuestFirstPersonCharacter::AWordQuestFirstPersonCharacter()
{
 PrimaryActorTick.bCanEverTick=true;
 GetCapsuleComponent()->InitCapsuleSize(28.f,92.f);
 bUseControllerRotationYaw=true;
 auto* Move=GetCharacterMovement();Move->MaxWalkSpeed=140.f;Move->MaxWalkSpeedCrouched=75.f;
 Move->MaxAcceleration=500.f;Move->BrakingDecelerationWalking=600.f;Move->GroundFriction=4.f;
 Move->MaxStepHeight=30.f;Move->SetWalkableFloorAngle(45.f);Move->GetNavAgentPropertiesRef().bCanCrouch=true;
 Move->SetCrouchedHalfHeight(56.f);Move->bOrientRotationToMovement=false;
 EyeCamera=CreateDefaultSubobject<UCineCameraComponent>(TEXT("HumanEye"));EyeCamera->SetupAttachment(GetCapsuleComponent());
 EyeCamera->bUsePawnControlRotation=true;EyeCamera->SetConstraintAspectRatio(false);
 EyeCamera->Filmback.SensorWidth=36.f;EyeCamera->Filmback.SensorHeight=20.25f;
 EyeCamera->LensSettings.MinFocalLength=12.f;EyeCamera->LensSettings.MaxFocalLength=70.f;
 EyeCamera->SetCurrentAperture(8.f);SetHorizontalFov(80.f);
 EyeCamera->FocusSettings.FocusMethod=ECameraFocusMethod::Manual;
 EyeCamera->FocusSettings.ManualFocusDistance=400.f;EyeCamera->FocusSettings.bSmoothFocusChanges=true;EyeCamera->FocusSettings.FocusSmoothingInterpSpeed=3.f;
 auto& PP=EyeCamera->PostProcessSettings;
 PP.bOverride_AutoExposureMethod=true;PP.AutoExposureMethod=EAutoExposureMethod::AEM_Histogram;
 PP.bOverride_AutoExposureMinBrightness=true;PP.AutoExposureMinBrightness=-2.f;
 PP.bOverride_AutoExposureMaxBrightness=true;PP.AutoExposureMaxBrightness=12.f;
 PP.bOverride_AutoExposureSpeedUp=true;PP.AutoExposureSpeedUp=.75f;
 PP.bOverride_AutoExposureSpeedDown=true;PP.AutoExposureSpeedDown=.5f;
 PP.bOverride_AutoExposureBias=true;PP.AutoExposureBias=0.f;
 PP.bOverride_MotionBlurAmount=true;PP.MotionBlurAmount=.025f;
 EyeCamera->PostProcessBlendWeight=1.f;
 EyeCamera->SetRelativeLocation(FVector(0,0,80.f));
 // An assembled body is installed only after C18; never show a proxy torso.
 Tags.Add(TEXT("needs_first_person_body"));
}
void AWordQuestFirstPersonCharacter::PlaceView(FVector EyePosition,FRotator Rotation)
{
 const FVector Base=EyePosition-FVector(0,0,StandingEyeHeight-GetCapsuleComponent()->GetScaledCapsuleHalfHeight());
 GetCharacterMovement()->StopMovementImmediately();TeleportTo(Base,FRotator(0,Rotation.Yaw,0),false,true);
 EyeHeight=StandingEyeHeight;StepPhase=0;BobZ=BobY=0;
 if(Controller)Controller->SetControlRotation(Rotation);
 EyeCamera->SetRelativeLocation(FVector(0,0,EyeHeight-GetCapsuleComponent()->GetScaledCapsuleHalfHeight()));
}
void AWordQuestFirstPersonCharacter::SetHorizontalFov(float Degrees)
{
 const float Fov=FMath::Clamp(Degrees,65.f,100.f);
 EyeCamera->SetCurrentFocalLength(EyeCamera->Filmback.SensorWidth/(2.f*FMath::Tan(FMath::DegreesToRadians(Fov*.5f))));
}
void AWordQuestFirstPersonCharacter::SetHeadBobEnabled(bool Enabled){bHeadBobEnabled=Enabled;}
void AWordQuestFirstPersonCharacter::SetCrouching(bool Enabled){if(Enabled)Crouch();else UnCrouch();}
FVector AWordQuestFirstPersonCharacter::GetEyeWorldLocation()const{return EyeCamera->GetComponentLocation();}
void AWordQuestFirstPersonCharacter::Tick(float Dt)
{
 Super::Tick(Dt);if(!Controller||UGameplayStatics::IsGamePaused(this))return;
 const float Speed=GetVelocity().Size2D();const float Amount=bHeadBobEnabled&&GetCharacterMovement()->IsMovingOnGround()?FMath::Clamp(Speed/140.f,0.f,1.f):0.f;
 // Cadence is temporal, not velocity-scaled: speed controls amplitude only.
 // Scaling phase by speed made a nominal 1.8 Hz gait measure ~1.33 Hz.
 if(Amount>.08f)StepPhase=FMath::Fmod(StepPhase+Dt*FMath::Clamp(WalkingStepHz,1.6f,2.f)*2.f*PI,4.f*PI);
 const float K=1.f-FMath::Exp(-12.f*Dt);
 BobZ=FMath::Lerp(BobZ,FMath::Sin(StepPhase)*.55f*Amount,K);
 BobY=FMath::Lerp(BobY,FMath::Sin(StepPhase*.5f)*.25f*Amount,K);
 EyeHeight=FMath::Lerp(EyeHeight,bIsCrouched?CrouchingEyeHeight:StandingEyeHeight,1.f-FMath::Exp(-8.f*Dt));
 EyeCamera->SetRelativeLocation(FVector(0,BobY,EyeHeight-GetCapsuleComponent()->GetScaledCapsuleHalfHeight()+BobZ));
 if(IsValid(FirstPersonBodyActor))
 {
  FTransform Placement=BodyFeetTransform;
  Placement.AddToTranslation(FVector(0,0,-GetCapsuleComponent()->GetScaledCapsuleHalfHeight()));
  FirstPersonBodyActor->SetActorRelativeTransform(Placement);
 }
 FHitResult Hit;FCollisionQueryParams Query(SCENE_QUERY_STAT(EyeFocus),false,this);
 const FVector Start=GetEyeWorldLocation();
 if(GetWorld()->LineTraceSingleByChannel(Hit,Start,Start+EyeCamera->GetForwardVector()*1000.f,ECC_Visibility,Query))
  EyeCamera->FocusSettings.ManualFocusDistance=FMath::Clamp(Hit.Distance,100.f,1000.f);
}
void AWordQuestFirstPersonCharacter::EndPlay(const EEndPlayReason::Type Reason)
{
 RemoveFirstPersonBody();Super::EndPlay(Reason);
}
bool AWordQuestFirstPersonCharacter::InstallFirstPersonBody(TSubclassOf<AActor> Class,FTransform FeetTransform,FName BodyName,const TArray<FName>& HeadNames)
{
 if(!GetWorld()||!Class||Class->IsChildOf(ACharacter::StaticClass())||BodyName.IsNone()||FeetTransform.ContainsNaN())return false;
 FActorSpawnParameters Params;Params.Owner=this;Params.SpawnCollisionHandlingOverride=ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
 AActor* Delivered=GetWorld()->SpawnActor<AActor>(Class,FVector::ZeroVector,FRotator::ZeroRotator,Params);
 if(!Delivered)return false;
 TArray<UPrimitiveComponent*> Primitives;Delivered->GetComponents(Primitives);
 USkeletalMeshComponent* Body=nullptr;
 for(auto* Component:Primitives)if(Component->GetFName()==BodyName)Body=Cast<USkeletalMeshComponent>(Component);
 if(!Body||!Body->GetSkeletalMeshAsset()||Body->GetBoneIndex(FirstPersonHeadBone)<0||(Primitives.Num()>1&&HeadNames.IsEmpty()))
 {Delivered->Destroy();BodyState=TEXT("invalid_delivery_contract");return false;}
 for(FName Name:HeadNames)
 {
  bool Found=false;for(auto* Component:Primitives)if(Component->GetFName()==Name&&Component!=Body){Found=true;break;}
  if(!Found){Delivered->Destroy();BodyState=TEXT("missing_named_head_component");return false;}
 }
 // All changes below affect only this spawned instance, never the author mesh/BP.
 for(auto* Component:Primitives)
 {
  Component->SetSimulatePhysics(false);Component->SetCollisionEnabled(ECollisionEnabled::NoCollision);
  if(HeadNames.Contains(Component->GetFName())){Component->SetOwnerNoSee(true);Component->SetCastHiddenShadow(true);}
 }
 Body->HideBoneByName(FirstPersonHeadBone,EPhysBodyOp::PBO_None);
 Delivered->AttachToComponent(GetCapsuleComponent(),FAttachmentTransformRules::SnapToTargetNotIncludingScale);
 RemoveFirstPersonBody();FirstPersonBodyActor=Delivered;BodyFeetTransform=FeetTransform;
 FTransform Placement=BodyFeetTransform;Placement.AddToTranslation(FVector(0,0,-GetCapsuleComponent()->GetScaledCapsuleHalfHeight()));Delivered->SetActorRelativeTransform(Placement);
 BodyState=TEXT("assembled_head_hidden_locomotion_unverified");Tags.Remove(TEXT("needs_first_person_body"));return true;
}
void AWordQuestFirstPersonCharacter::RemoveFirstPersonBody()
{
 if(IsValid(FirstPersonBodyActor))FirstPersonBodyActor->Destroy();FirstPersonBodyActor=nullptr;
 BodyState=TEXT("missing_delivered_body");Tags.AddUnique(TEXT("needs_first_person_body"));
}
FString AWordQuestFirstPersonCharacter::GetFirstPersonState()const
{
 const auto* M=GetCharacterMovement();
 return FString::Printf(TEXT("eye_cm=%.2f fov=%.2f focal_mm=%.2f aperture=%.1f speed_cm_s=%.2f capsule_half_cm=%.1f step_cm=%.1f slope_deg=%.1f crouched=%d bob_z_cm=%.3f bob_y_cm=%.3f step_hz=%.2f step_phase_rad=%.3f exposure_up=0.75 exposure_down=0.5 body_ready=%d body_state=%s"),EyeHeight,EyeCamera->GetHorizontalFieldOfView(),EyeCamera->CurrentFocalLength,EyeCamera->CurrentAperture,GetVelocity().Size2D(),GetCapsuleComponent()->GetScaledCapsuleHalfHeight(),M->MaxStepHeight,M->GetWalkableFloorAngle(),bIsCrouched,BobZ,BobY,WalkingStepHz,StepPhase,IsValid(FirstPersonBodyActor),*BodyState);
}
