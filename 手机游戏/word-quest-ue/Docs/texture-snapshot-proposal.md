# MHC preview texture persistence audit

## 产品需求说明书

生成持久化的 MHC 预览贴图副本，保存并重开后仍具有有效 Source、平台 mip 与可见皮肤。不改作者 MHC / 贴图源，只修引擎接入层的生成资产。日志 contains no miplevels (Format: 0) 是无有效平台纹理，不是灯光黑。

## 接口文档

本机 UE 5.8 源码核对结果：

1. `Engine/Source/Runtime/Engine/Public/ImageUtils.h:277` 的 `FImageUtils::CreateTexture(ETextureClass TextureClass, const FImageView& Image, UObject* Outer, const FString& Name, EObjectFlags Flags, bool DoPostEditChange)` 是官方推荐现代接口，明确填充 TextureSource，然后从它构建平台纹理。
2. 同文件 `CreateTexture2DFromImage` 文档明确只生成 transient PlatformData，不生成 TextureSource，不能用来修持久化。
3. `Engine/Texture.h` 的 `FTextureSource::GetMipImage(FImage&,int32)`、`Init(const FImageView&)`；Init 必须置于 owning texture PreEditChange/PostEditChange 内。
4. `ImageUtils.h` 的 `GetTexture2DSourceImage(UTexture2D*,FImage&)` 可读已有 Source；仅适合 Source.IsValid()，不是 GPU 读回万能函数。
5. `Engine/TextureRenderTarget2D.h` 的 `ConstructTexture2D(UObject*,const FString&,EObjectFlags,uint32,TArray<uint8>*)`；内部转调 `UTextureRenderTarget::ConstructTexture`，后者调用 UpdateTexture，并在 `Engine/Private/TextureRenderTarget.cpp:426` 执行 `InTexture->Source.Init(ReadImage)`。这是官方现成的 GPU render target -> 可保存 Source 路径。
6. `ImageUtils.h` 的 `GetRenderTargetImage(UTextureRenderTarget*,FImage&)` 可以直接读回 RT 到 FImage，再走 CreateTexture。

### 最小、最可靠顺序

A. 原贴图仍有有效 Source：先 Source.IsValid 检测并 GetTexture2DSourceImage。以原图构造独立 package 下的 CreateTexture(TwoD,Image,Package,Name,RF_Public|RF_Standalone,false)，设置原贴图 CompressionSettings、SRGB、LODGroup 等，再 PostEditChange、AssetCreated、保存。这条路径保真最高且无 GPU 依赖。

B. Source 无效而 GPU texture 有效：必须在 MHC 编辑会话移除、预览纹理释放之前做 GPU 读回。用原尺寸、合适格式 RT，完成原 texture -> RT 的 raw 拷贝或无光照像素 pass，再 FImageUtils::GetRenderTargetImage + CreateTexture；也可直接 RT->ConstructTexture2D。copy/render 命令完成后才能读回和结束 MHC 会话。不要从 SceneCapture 截皮肤替代 UV texture。

对于匹配尺寸、匹配像素格式且支持 copy 的源/目标，可在渲染线程 `FRHICommandListImmediate::CopyTexture`（`RHICommandList.h`, `RHICopyTextureInfo`）复制原 TextureRHI 到 RT RHI；源若 BC 压缩/virtual/sparse 格式，不能假设可直接 copy 到 BGRA RT，需采样解压的全屏 pass。RT 读回采用引擎官方 API，勿猜测 platform mip bytes 排列。

C. CPU PlatformData 仅在明确 uncompressed PF_B8G8R8A8 / PF_R8G8B8A8 / PF_FloatRGBA 且 bulk data 确实可读时作为受控 fallback。不要把 BC5 / BC7 压缩 mip 字节直接当 Source.Init 的 BGRA8。GPU-only MHC 贴图往往没有可用 bulk data，因此不能以 BulkData.Lock 返回非空作为普适方案。

### 色彩与材质细节

basecolor 的 sRGB 解码/编码只能发生一次。normal / roughness / cavity 是线性数据；尤其 normal 使用 Normal sampler 会解包成 [-1,1]，若再存 unsigned RT 就错误。raw copy 路径最安全，采样 pass 必须明确 packed 数据重编码，包含 alpha，不要使用照明、曝光、色调映射或 opaque 混合丢 alpha。ConstructTexture 的 gamma flags 会根据 RT display gamma 修正 SRGB，创建后核对与原贴图一致。

`UKismetRenderingLibrary::DrawMaterialToRenderTarget`（Kismet/KismetRenderingLibrary.h）可用于采样 pass，但普通皮肤材质不等于 raw copy，必须是独立无光照、参数化 UV-copy 材质。`ExportTexture2D` 转到旧的 ExportTexture2DAsHDR，不是通用无 Source 的持久化修复。

## 测试

- 生成时记录每张源图 Source.IsValid、尺寸、pixel format、GPU resource、目标 Source mip 数和格式；缺图则明确失败，不能保存空 texture 当成功。
- GPU读回后检查 raw data 非空且 basecolor 有合理动态范围；normal 非全零并保留法线编码。
- 每张目标必须 Source.IsValid 且 size>0；等待纹理编译后核对 PlatformData mip>0 / format!=PF_Unknown。
- 结束 MHC session 后保存，重启编辑器再加载一次所有生成纹理、材质、snapshot mesh，确认不出现 no miplevels/Format0。
- 同机位对比 MHC 原预览与快照：脸部颜色、法线、牙眼透明度、头颈接缝；明亮光照下仍黑才回到 texture 参数/材质依赖检查。

本调查只读本机源码并新增本文档；未启动 UE，未编译，未修改作者资产。
