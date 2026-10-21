#include "WordQuestCharacter.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "Components/SkeletalMeshComponent.h"
#include "Components/CapsuleComponent.h"
#include "UObject/ConstructorHelpers.h"
#include "WordQuestHUD.h"

AWordQuestCharacter::AWordQuestCharacter()
{
	PrimaryActorTick.bCanEverTick = true;
	GetCapsuleComponent()->InitCapsuleSize(42.f, 96.0f);

	bUseControllerRotationPitch = false;
	bUseControllerRotationYaw = true;
	bUseControllerRotationRoll = false;
	GetCharacterMovement()->bOrientRotationToMovement = false;
	GetCharacterMovement()->MaxWalkSpeed = 420.f;
	GetCharacterMovement()->JumpZVelocity = 420.f;
	GetCharacterMovement()->AirControl = 0.25f;

	SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArm"));
	SpringArm->SetupAttachment(RootComponent);
	SpringArm->TargetArmLength = 340.f;
	SpringArm->SocketOffset = FVector(0.f, 45.f, 70.f);
	SpringArm->bUsePawnControlRotation = true;
	SpringArm->bEnableCameraLag = true;
	SpringArm->CameraLagSpeed = 12.f;

	Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera"));
	Camera->SetupAttachment(SpringArm, USpringArmComponent::SocketName);
	Camera->bUsePawnControlRotation = false;

	static ConstructorHelpers::FObjectFinder<USkeletalMesh> HeroMesh(TEXT("/Game/Heroes/me2026/SkeletalMeshes/Human.Human"));
	if (HeroMesh.Succeeded())
	{
		GetMesh()->SetSkeletalMesh(HeroMesh.Object);
		GetMesh()->SetRelativeLocation(FVector(0.f, 0.f, -96.f));
		GetMesh()->SetRelativeRotation(FRotator(0.f, 0.f, 0.f));
		GetMesh()->SetAnimationMode(EAnimationMode::AnimationSingleNode);
		UE_LOG(LogTemp, Warning, TEXT("[WordQuest] hero mesh assigned"));
	}
	else
	{
		UE_LOG(LogTemp, Warning, TEXT("[WordQuest] hero mesh NOT found, capsule only"));
	}
}

void AWordQuestCharacter::BeginPlay()
{
	Super::BeginPlay();
	if (APlayerController* PC = Cast<APlayerController>(GetController()))
	{
		PC->bShowMouseCursor = false;
		PC->SetInputMode(FInputModeGameOnly());
	}
}

void AWordQuestCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);
	PlayerInputComponent->BindAxis("MoveForward", this, &AWordQuestCharacter::MoveForward);
	PlayerInputComponent->BindAxis("MoveRight", this, &AWordQuestCharacter::MoveRight);
	PlayerInputComponent->BindAxis("Turn", this, &AWordQuestCharacter::Turn);
	PlayerInputComponent->BindAxis("LookUp", this, &AWordQuestCharacter::LookUp);
	PlayerInputComponent->BindAction("Answer1", IE_Pressed, this, &AWordQuestCharacter::Answer1);
	PlayerInputComponent->BindAction("Answer2", IE_Pressed, this, &AWordQuestCharacter::Answer2);
	PlayerInputComponent->BindAction("Answer3", IE_Pressed, this, &AWordQuestCharacter::Answer3);
	PlayerInputComponent->BindAction("Answer4", IE_Pressed, this, &AWordQuestCharacter::Answer4);
	PlayerInputComponent->BindAction("NextWord", IE_Pressed, this, &AWordQuestCharacter::NextWord);
	PlayerInputComponent->BindAction("Unit1", IE_Pressed, this, &AWordQuestCharacter::Unit1);
	PlayerInputComponent->BindAction("Unit2", IE_Pressed, this, &AWordQuestCharacter::Unit2);
	PlayerInputComponent->BindAction("Unit3", IE_Pressed, this, &AWordQuestCharacter::Unit3);
	PlayerInputComponent->BindAction("Unit4", IE_Pressed, this, &AWordQuestCharacter::Unit4);
	PlayerInputComponent->BindAction("Unit5", IE_Pressed, this, &AWordQuestCharacter::Unit5);
	PlayerInputComponent->BindAction("Unit6", IE_Pressed, this, &AWordQuestCharacter::Unit6);
}

void AWordQuestCharacter::MoveForward(float Value)
{
	if (Controller && Value != 0.f)
	{
		const FRotator YawRot(0.f, Controller->GetControlRotation().Yaw, 0.f);
		AddMovementInput(FRotationMatrix(YawRot).GetUnitAxis(EAxis::X), Value);
	}
}

void AWordQuestCharacter::MoveRight(float Value)
{
	if (Controller && Value != 0.f)
	{
		const FRotator YawRot(0.f, Controller->GetControlRotation().Yaw, 0.f);
		AddMovementInput(FRotationMatrix(YawRot).GetUnitAxis(EAxis::Y), Value);
	}
}

void AWordQuestCharacter::Turn(float Value) { AddControllerYawInput(Value); }
void AWordQuestCharacter::LookUp(float Value) { AddControllerPitchInput(Value); }

void AWordQuestCharacter::HUDAnswer(int32 Index)
{
	if (APlayerController* PC = Cast<APlayerController>(GetController()))
	{
		if (AWordQuestHUD* HUD = Cast<AWordQuestHUD>(PC->GetHUD()))
		{
			HUD->Answer(Index);
		}
	}
}

void AWordQuestCharacter::Answer1() { HUDAnswer(0); }
void AWordQuestCharacter::Answer2() { HUDAnswer(1); }
void AWordQuestCharacter::Answer3() { HUDAnswer(2); }
void AWordQuestCharacter::Answer4() { HUDAnswer(3); }

void AWordQuestCharacter::NextWord()
{
	if (APlayerController* PC = Cast<APlayerController>(GetController()))
	{
		if (AWordQuestHUD* HUD = Cast<AWordQuestHUD>(PC->GetHUD()))
		{
			HUD->Next();
		}
	}
}

void AWordQuestCharacter::HUDUnit(int32 UnitIndex)
{
	if (APlayerController* PC = Cast<APlayerController>(GetController()))
	{
		if (AWordQuestHUD* HUD = Cast<AWordQuestHUD>(PC->GetHUD()))
		{
			HUD->SwitchUnit(UnitIndex);
		}
	}
}
void AWordQuestCharacter::Unit1() { HUDUnit(0); }
void AWordQuestCharacter::Unit2() { HUDUnit(1); }
void AWordQuestCharacter::Unit3() { HUDUnit(2); }
void AWordQuestCharacter::Unit4() { HUDUnit(3); }
void AWordQuestCharacter::Unit5() { HUDUnit(4); }
void AWordQuestCharacter::Unit6() { HUDUnit(5); }
