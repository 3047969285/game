#pragma once
#include "CoreMinimal.h"

/** Byte framing before UTF8 decode: an HTTP packet may end inside a code point. */
struct FWordQuestNpcSseDecoder
{
 TArray<uint8> Bytes;
 FString Text;
 int32 TotalTokens=0;
 bool bDone=false,bMalformed=false;
 TArray<FString> Push(const TArray<uint8>& Chunk);
};

struct FWordQuestNpcReply
{
 FString Spoken,Correction,Error;
 TArray<FString> SuggestedReplies,UsedWords;
 static FString SpokenPrefix(const FString& Full);
 static bool HasFutureClaim(const FString& Text);
 static bool Parse(const FString& Full,FWordQuestNpcReply& Out);
};
