#pragma once
#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "WordQuestRenderDiagnostics.generated.h"
UCLASS()
class WORDQUESTUE_API UWordQuestRenderDiagnostics : public UBlueprintFunctionLibrary
{
 GENERATED_BODY()
public:
 UFUNCTION(BlueprintCallable) static void ConfigureCapture(class USceneCaptureComponent2D* Capture);
 UFUNCTION(BlueprintCallable) static TMap<FString,FString> Capabilities();
 /** Queues real scene evidence. True means requested; file appears after temporal warmup. */
 UFUNCTION(BlueprintCallable, meta=(WorldContext="WorldContext")) static bool RequestWorldCapture(UObject* WorldContext,int32 Width,int32 Height,const FString& AbsolutePath);
 UFUNCTION(BlueprintCallable, meta=(WorldContext="WorldContext")) static bool InjectNavigationKey(UObject* WorldContext,FName KeyName,bool Pressed,float Amount=1.f);
};
