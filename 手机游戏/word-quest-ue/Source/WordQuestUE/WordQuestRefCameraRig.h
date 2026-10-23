#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "WordQuestRefCameraRig.generated.h"
class USceneCaptureComponent2D;
class UTextureRenderTarget2D;

/** Five read-only comparison views; front is relative to the character's UE +Y face. */
UCLASS(Blueprintable)
class WORDQUESTUE_API AWordQuestRefCameraRig : public AActor
{
    GENERATED_BODY()
public:
    AWordQuestRefCameraRig();
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Compare") FVector Q34Pose = FVector(37,6,-8);
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Compare") float CharacterHeightCm = 184;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Compare") FVector HeadCenterCm = FVector(0,0,167);
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Compare") TArray<TObjectPtr<USceneCaptureComponent2D>> Views;
    /** Preview-only skin display. Never writes the MHC or marks its package dirty. */
    UFUNCTION(BlueprintCallable, Category="Compare") bool UsePreviewSkin(UObject* Character);
    UFUNCTION(BlueprintCallable, Category="Compare") bool AttachPreviewGroom(AActor* Actor, UObject* Groom, bool bSkinBinding = true);
    /** Imported CPU geometry / built radius in centimetres, for unit diagnostics. */
    UFUNCTION(BlueprintCallable, Category="Compare") TMap<FName,double> InspectGroom(UObject* Groom);
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Compare") int32 PendingGroomBindings = 0;
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Compare") int32 FailedGroomBindings = 0;
    UPROPERTY(Transient) TArray<TObjectPtr<UObject>> PreviewBindings;
    UFUNCTION(BlueprintCallable, Category="Compare") bool ExportRunView(int32 Index, const FString& CharacterId, const FString& RunId);
    UFUNCTION(BlueprintCallable, Category="Compare") bool ExportDiagnosticView(int32 Index, const FString& CharacterId, const FString& Name);
    UFUNCTION(BlueprintCallable, Category="Compare") void ConfigureViews();
    UFUNCTION(BlueprintCallable, Category="Compare") void WarmView(int32 Index);
    UFUNCTION(BlueprintCallable, Category="Compare") bool ExportView(int32 Index, const FString& CharacterId);
private:
    bool SaveView(int32 Index, const FString& Directory, const FString& Name);
};
