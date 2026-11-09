#include "WordQuestNpcProtocol.h"
#include "Dom/JsonObject.h"
#include "Serialization/JsonSerializer.h"

TArray<FString> FWordQuestNpcSseDecoder::Push(const TArray<uint8>& Chunk)
{
 TArray<FString> Deltas;if(bDone)return Deltas;
 if(Bytes.Num()+Chunk.Num()>1024*1024){bMalformed=true;bDone=true;return Deltas;}
 Bytes.Append(Chunk);
 while(!bDone)
 {
  int32 End=INDEX_NONE,After=0;
  for(int32 I=0;I<Bytes.Num()-1;++I)
  {
   if(Bytes[I]=='\n'&&Bytes[I+1]=='\n'){End=I;After=I+2;break;}
   if(I+3<Bytes.Num()&&Bytes[I]=='\r'&&Bytes[I+1]=='\n'&&Bytes[I+2]=='\r'&&Bytes[I+3]=='\n'){End=I;After=I+4;break;}
  }
  if(End==INDEX_NONE)break;
  FUTF8ToTCHAR Convert(reinterpret_cast<const ANSICHAR*>(Bytes.GetData()),End);
  FString Event(Convert.Length(),Convert.Get());Bytes.RemoveAt(0,After,EAllowShrinking::No);
  Event.ReplaceInline(TEXT("\r\n"),TEXT("\n"));TArray<FString> Lines;Event.ParseIntoArrayLines(Lines,false);
  FString Payload;
  for(const auto& Line:Lines)if(Line.StartsWith(TEXT("data:"))){FString V=Line.Mid(5);V.RemoveFromStart(TEXT(" "));if(!Payload.IsEmpty())Payload+=TEXT("\n");Payload+=V;}
  if(Payload.IsEmpty())continue;
  if(Payload==TEXT("[DONE]")){bDone=true;break;}
  TSharedPtr<FJsonObject> Json;
  if(!FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Payload),Json)||!Json){bMalformed=true;continue;}
  const TSharedPtr<FJsonObject>* Usage=nullptr;double Tokens=0;
  if(Json->TryGetObjectField(TEXT("usage"),Usage)&&Usage&&(*Usage)->TryGetNumberField(TEXT("total_tokens"),Tokens))TotalTokens=FMath::Clamp<int32>(int32(Tokens),0,1000000);
  const TArray<TSharedPtr<FJsonValue>>* Choices=nullptr;
  if(!Json->TryGetArrayField(TEXT("choices"),Choices))continue;
  for(const auto& Choice:*Choices)
  {
   const auto Object=Choice->AsObject();const TSharedPtr<FJsonObject>* Delta=nullptr;FString Content;
   if(Object&&Object->TryGetObjectField(TEXT("delta"),Delta)&&Delta&&(*Delta)->TryGetStringField(TEXT("content"),Content)&&!Content.IsEmpty()){Text+=Content;Deltas.Add(Content);}
  }
 }
 return Deltas;
}

FString FWordQuestNpcReply::SpokenPrefix(const FString& Full)
{
 FString Text=Full;int32 At=Text.Find(TEXT("@@META"));
 if(At!=INDEX_NONE)Text.LeftInline(At);
 // A network chunk can stop at any prefix of the marker. Keep the final
 // partial line out of the world instead of briefly exposing protocol text.
 int32 Newline=INDEX_NONE;
 if(Text.FindLastChar('\n',Newline))
 {
  const FString Last=Text.Mid(Newline+1).TrimStart();
  if(!Last.IsEmpty()&&FString(TEXT("@@META")).StartsWith(Last))Text.LeftInline(Newline);
 }
 const int32 Legacy=Text.Find(TEXT("\n{"));if(Legacy!=INDEX_NONE)Text.LeftInline(Legacy);
 const int32 Fence=Text.Find(TEXT("```"));if(Fence!=INDEX_NONE)Text.LeftInline(Fence);
 return Text.TrimStartAndEnd();
}
bool FWordQuestNpcReply::HasFutureClaim(const FString& Text)
{
 const FString Lower=Text.ToLower();if(!Lower.Contains(TEXT("2090")))return false;
 for(const TCHAR* Claim:{TEXT("i lived in"),TEXT("i am from"),TEXT("i'm from"),TEXT("i come from"),TEXT("i remember"),TEXT("my memories of"),TEXT("we are in"),TEXT("we're in"),TEXT("i know what happens"),TEXT("i know what will happen"),TEXT("i have seen the future"),TEXT("i was born in")})
  if(Lower.Contains(Claim))return true;
 return false;
}
bool FWordQuestNpcReply::Parse(const FString& Full,FWordQuestNpcReply& Out)
{
 Out=FWordQuestNpcReply();Out.Spoken=SpokenPrefix(Full);
 auto Fail=[&](const TCHAR* Code){Out.Error=Code;return false;};
 if(Out.Spoken.IsEmpty())return Fail(TEXT("empty_reply"));
 if(HasFutureClaim(Out.Spoken))return Fail(TEXT("future_claim"));
 FString Normal=Full;Normal.ReplaceInline(TEXT("\r\n"),TEXT("\n"));Normal.TrimEndInline();
 int32 LineAt=INDEX_NONE;Normal.FindLastChar('\n',LineAt);
 if(LineAt==INDEX_NONE||!Normal.Mid(LineAt+1).StartsWith(TEXT("@@META ")))return Fail(TEXT("metadata_missing"));
 if(Normal.Left(LineAt).Contains(TEXT("@@META")))return Fail(TEXT("multiple_metadata"));
 TSharedPtr<FJsonObject> Meta;
 if(!FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Normal.Mid(LineAt+8)),Meta)||!Meta)return Fail(TEXT("metadata_json"));
 const TArray<TSharedPtr<FJsonValue>> *Words=nullptr,*Replies=nullptr;
 if(!Meta->TryGetArrayField(TEXT("used_words"),Words)||Words->Num()>10)return Fail(TEXT("used_words_type"));
 for(const auto& Word:*Words)
 {
  // Claude 11-02: a listed word the reply does not contain (lemma vs inflection) is dropped, not fatal —
  // the online test lost three good spoken answers to metadata strictness
  if(Word->Type!=EJson::String||Word->AsString().IsEmpty()||!Out.Spoken.Contains(Word->AsString(),ESearchCase::IgnoreCase))continue;
  Out.UsedWords.Add(Word->AsString());
 }
 const auto* Correction=Meta->Values.Find(TEXT("correction"));
 if(Correction&&(*Correction)->Type==EJson::String&&(*Correction)->AsString().Len()<=300)Out.Correction=(*Correction)->AsString();   // malformed correction = none
 if(!Meta->TryGetArrayField(TEXT("suggested_replies"),Replies)||Replies->Num()<1)return Fail(TEXT("suggestion_count"));
 for(const auto& Reply:*Replies)
 {
  if(Reply->Type!=EJson::String)continue;
  FString Value=Reply->AsString().TrimStartAndEnd();TArray<FString> Parts;Value.ParseIntoArrayWS(Parts);
  if(Value.IsEmpty()||Value.Len()>300||Parts.Num()>12)continue;
  Out.SuggestedReplies.Add(Value);
  if(Out.SuggestedReplies.Num()==3)break;    // more than three: keep the first three
 }
 return true;
}
