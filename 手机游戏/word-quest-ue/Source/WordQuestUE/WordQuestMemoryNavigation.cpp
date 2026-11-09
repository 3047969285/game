#include "WordQuestMemoryNavigation.h"
#include "WordQuestMemoryDirector.h"
#include "Camera/CameraActor.h"
#include "Engine/World.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/Pawn.h"
#include "InputCoreTypes.h"
#include "Kismet/GameplayStatics.h"
#include "EngineUtils.h"

UWordQuestMemoryNavigation::UWordQuestMemoryNavigation()
{
 PrimaryComponentTick.bCanEverTick=true;
 PrimaryComponentTick.bTickEvenWhenPaused=false;
 PrimaryComponentTick.TickGroup=TG_PostUpdateWork;
}

void UWordQuestMemoryNavigation::TickComponent(float Dt,ELevelTick TickType,FActorComponentTickFunction* Fn)
{
 Super::TickComponent(Dt,TickType,Fn);
 auto* World=GetWorld();auto* PC=UGameplayStatics::GetPlayerController(this,0);
 auto Stop=[this](const TCHAR* Reason){Gate=Reason;Velocity=FVector::ZeroVector;bNavigating=false;bTouchDown=false;bTouchLooking=false;};
 if(!World||!PC||!bEnabled){Stop(TEXT("disabled"));return;}
 if(UGameplayStatics::IsGamePaused(this)){Stop(TEXT("paused"));return;}
 if(auto* Director=GetOwner()->FindComponentByClass<UWordQuestMemoryDirector>())
 {
  const FString State=Director->GetPlaybackState();
  if(State.Contains(TEXT("transition=1"))){Stop(TEXT("transition"));return;}
  if(State.Contains(TEXT("world_input=1"))){Stop(TEXT("editing"));return;}
  FString Before,Error;if(State.Split(TEXT(" error="),&Before,&Error)&&!Error.IsEmpty()){Stop(TEXT("error"));return;}
 }
 AActor* View=PC->GetViewTarget();
 // Director spawns a new CameraActor; reject authored shot cameras and serialized actors.
 if(!IsValid(View)||!View->IsA<ACameraActor>()||View->HasAnyFlags(RF_WasLoaded)) {Stop(TEXT("waiting_runtime_camera"));return;}
 for(const FName Tag:View->Tags)if(Tag.ToString().StartsWith(TEXT("shot:"))){Stop(TEXT("authored_camera"));return;}
 FCollisionQueryParams Query(SCENE_QUERY_STAT(MemoryNavigation),false);
 Query.AddIgnoredActor(View);if(PC->GetPawn())Query.AddIgnoredActor(PC->GetPawn());
 if(ActiveView.Get()!=View)
 {
  NonSolidEnvironment.Reset();
  for(TActorIterator<AActor> It(World);It;++It)
   if(It->ActorHasTag(TEXT("environment:sky"))||It->ActorHasTag(TEXT("environment:fog")))NonSolidEnvironment.Add(*It);
 }
 for(const auto& Environment:NonSolidEnvironment)if(Environment.IsValid())Query.AddIgnoredActor(Environment.Get());
 if(ActiveView.Get()!=View)
 {
  ActiveView=View;DesiredRotation=LastAppliedRotation=View->GetActorRotation();Velocity=FVector::ZeroVector;
  bTouchDown=false;bTouchLooking=false;ViewChanges++;
  FHitResult Floor;const FVector P=View->GetActorLocation();
  EyeAboveFloor=World->LineTraceSingleByChannel(Floor,P,P-FVector(0,0,350),ECC_WorldStatic,Query)?P.Z-Floor.ImpactPoint.Z:160.f;
  EyeAboveFloor=FMath::Clamp(EyeAboveFloor,50.f,250.f);
 }
 Dt=FMath::Clamp(Dt,0.f,.05f);Gate=TEXT("ready");bNavigating=true;
 FVector2D Move(0,0),Look(0,0);
 Move.X=float(PC->IsInputKeyDown(EKeys::D))-float(PC->IsInputKeyDown(EKeys::A));
 Move.Y=float(PC->IsInputKeyDown(EKeys::W))-float(PC->IsInputKeyDown(EKeys::S));
 auto Dead=[](float V){return FMath::Abs(V)<.15f?0.f:FMath::Sign(V)*(FMath::Abs(V)-.15f)/.85f;};
 Move+=FVector2D(Dead(PC->GetInputAnalogKeyState(EKeys::Gamepad_LeftX)),Dead(PC->GetInputAnalogKeyState(EKeys::Gamepad_LeftY)));
 float MouseX=0,MouseY=0;PC->GetInputMouseDelta(MouseX,MouseY);
 Look=FVector2D(MouseX*.12f,-MouseY*.12f);
 Look+=FVector2D(Dead(PC->GetInputAnalogKeyState(EKeys::Gamepad_RightX))*100.f*Dt,-Dead(PC->GetInputAnalogKeyState(EKeys::Gamepad_RightY))*80.f*Dt);
 float X=0,Y=0,X2=0,Y2=0;bool Down=false,Down2=false;
 PC->GetInputTouchState(ETouchIndex::Touch1,X,Y,Down);PC->GetInputTouchState(ETouchIndex::Touch2,X2,Y2,Down2);
 if(Down)
 {
  Look=FVector2D::ZeroVector; // Touch may emulate mouse motion; never apply both.
  const FVector2D Touch(X,Y);
  if(!bTouchDown){TouchOrigin=LastTouch=Touch;bTouchLooking=false;}
  if(Down2)
  {
   // Two-finger drag is a virtual walking pad with no screen widgets.
   const FVector2D Drag=(Touch-TouchOrigin)/100.f;Move+=FVector2D(Drag.X,-Drag.Y);
   bTouchLooking=false;
  }
  else
  {
   if(!bTouchLooking&&FVector2D::Distance(Touch,TouchOrigin)>14.f)bTouchLooking=true;
   if(bTouchLooking)Look+=(Touch-LastTouch)*.10f;
  }
  LastTouch=Touch;
 }
 bTouchDown=Down;if(!Down)bTouchLooking=false;
 // Respect deliberate external aim/probe changes rather than springing back.
 if(!View->GetActorRotation().Equals(LastAppliedRotation,.01f))DesiredRotation=View->GetActorRotation();
 DesiredRotation.Yaw=FRotator::NormalizeAxis(DesiredRotation.Yaw+Look.X);
 DesiredRotation.Pitch=FMath::Clamp(FRotator::NormalizeAxis(DesiredRotation.Pitch+Look.Y),-75.f,75.f);DesiredRotation.Roll=0;
 const FRotator Rotation=FMath::RInterpTo(View->GetActorRotation(),DesiredRotation,Dt,18.f);
 View->SetActorRotation(Rotation);LastAppliedRotation=Rotation;PC->SetControlRotation(Rotation);
 const FRotator Flat(0,Rotation.Yaw,0);
 const FVector TargetVelocity=(Flat.Vector()*Move.Y+FRotationMatrix(Flat).GetUnitAxis(EAxis::Y)*Move.X).GetClampedToMaxSize(1.f)*WalkSpeed;
 Velocity=FMath::VInterpTo(Velocity,TargetVelocity,Dt,12.f);
 const FVector Start=View->GetActorLocation();FVector Delta=Velocity*Dt;bBlocked=false;
 // A body-sized capsule prevents walking through low furniture as well as walls.
 const float Half=FMath::Max(24.f,EyeAboveFloor*.45f);const FVector Offset(0,0,-Half*.85f);
 const FCollisionShape Shape=FCollisionShape::MakeCapsule(22.f,Half);
 FHitResult Hit;
 if(World->SweepSingleByChannel(Hit,Start+Offset,Start+Offset+Delta,FQuat::Identity,ECC_WorldStatic,Shape,Query))
 {
  bBlocked=true;CollisionCount++;Delta*=FMath::Max(0.f,Hit.Time-.02f);
  LastHit=(Hit.GetActor()?Hit.GetActor()->GetActorNameOrLabel():TEXT("None"))+TEXT("/")+GetNameSafe(Hit.GetComponent())+FString::Printf(TEXT(" penetrating=%d"),Hit.bStartPenetrating);
  const FVector Slide=FVector::VectorPlaneProject(Velocity*Dt*(1.f-Hit.Time),Hit.Normal);
  FHitResult SlideHit;const FVector From=Start+Offset+Delta;
  if(!World->SweepSingleByChannel(SlideHit,From,From+Slide,FQuat::Identity,ECC_WorldStatic,Shape,Query))Delta+=Slide;
 }
 FVector Next=Start+Delta;FHitResult Floor;
 if(World->LineTraceSingleByChannel(Floor,Next+FVector(0,0,30),Next-FVector(0,0,EyeAboveFloor+80),ECC_WorldStatic,Query))
 {
  const float TargetZ=Floor.ImpactPoint.Z+EyeAboveFloor;
  // Refuse furniture-height steps or a drop; small floor changes remain smooth.
  if(FMath::Abs(TargetZ-Start.Z)<=25.f)Next.Z=FMath::FInterpTo(Start.Z,TargetZ,Dt,10.f);
  else Next=Start;
 }
 else Next=Start;
 View->SetActorLocation(Next);
}

FString UWordQuestMemoryNavigation::GetNavigationState()const
{
 const AActor* View=ActiveView.Get();const FVector P=View?View->GetActorLocation():FVector::ZeroVector;
 return FString::Printf(TEXT("enabled=%d active=%d gate=%s view=%s position=%.2f,%.2f,%.2f speed=%.2f blocked=%d collisions=%d view_changes=%d touch_look=%d hit=%s"),bEnabled,bNavigating,*Gate,*GetNameSafe(View),P.X,P.Y,P.Z,Velocity.Size(),bBlocked,CollisionCount,ViewChanges,bTouchLooking,*LastHit);
}
