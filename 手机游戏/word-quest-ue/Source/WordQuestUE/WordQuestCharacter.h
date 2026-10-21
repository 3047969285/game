#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "WordQuestCharacter.generated.h"

class USpringArmComponent;
class UCameraComponent;

UCLASS()
class WORDQUESTUE_API AWordQuestCharacter : public ACharacter
{
	GENERATED_BODY()

public:
	AWordQuestCharacter();
	virtual void SetupPlayerInputComponent(UInputComponent* PlayerInputComponent) override;

protected:
	virtual void BeginPlay() override;

	void MoveForward(float Value);
	void MoveRight(float Value);
	void Turn(float Value);
	void LookUp(float Value);
	void Answer1();
	void Answer2();
	void Answer3();
	void Answer4();
	void NextWord();
	void Unit1();
	void Unit2();
	void Unit3();
	void Unit4();
	void Unit5();
	void Unit6();

private:
	void HUDAnswer(int32 Index);
	void HUDUnit(int32 UnitIndex);

	UPROPERTY(VisibleAnywhere, Category = "Camera")
	USpringArmComponent* SpringArm;

	UPROPERTY(VisibleAnywhere, Category = "Camera")
	UCameraComponent* Camera;
};
