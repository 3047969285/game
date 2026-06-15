using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Silk.NET.OpenGL;

namespace AimForge.App.UI;

[SupportedOSPlatform("windows")]
public sealed unsafe class FontAtlas : IDisposable
{
    private readonly GL _gl;
    private readonly Font _font;
    private readonly Font _titleFont;
    private readonly Dictionary<string, TextGlyph> _glyphs = new();
    private readonly Graphics _measureGraphics;

    public FontAtlas(GL gl)
    {
        _gl = gl;
        _font = CreateFont("Microsoft YaHei UI", 20f);
        _titleFont = CreateFont("Microsoft YaHei UI", 32f, FontStyle.Bold);
        var measureBitmap = new Bitmap(1, 1);
        _measureGraphics = Graphics.FromImage(measureBitmap);
        _measureGraphics.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;
    }

    private static Font CreateFont(string name, float size, FontStyle style = FontStyle.Regular)
    {
        try
        {
            return new Font(name, size, style, GraphicsUnit.Pixel);
        }
        catch
        {
            return new Font(FontFamily.GenericSansSerif, size, style, GraphicsUnit.Pixel);
        }
    }

    public void DrawText(OverlayRenderer overlay, string text, float x, float y, Vector4 color, bool title = false) =>
        DrawText(overlay, text, x, y, color, title ? _titleFont : _font);

    public void DrawText(OverlayRenderer overlay, string text, float x, float y, Vector4 color, Font font)
    {
        if (string.IsNullOrEmpty(text))
        {
            return;
        }

        var key = $"{font.Size}:{font.Style}:{text}";
        var glyph = GetOrCreate(key, text, font);
        overlay.DrawTexturedRect(x, y, glyph.Width, glyph.Height, glyph.TextureId, color);
    }

    public void Prewarm(IEnumerable<string> labels)
    {
        foreach (var label in labels)
        {
            GetOrCreate($"20:{FontStyle.Regular}:{label}", label, _font);
        }
    }

    private TextGlyph GetOrCreate(string key, string text, Font font)
    {
        if (_glyphs.TryGetValue(key, out var glyph))
        {
            return glyph;
        }

        var format = StringFormat.GenericTypographic;
        var size = _measureGraphics.MeasureString(text, font, 4096, format);
        var width = Math.Max(1, (int)Math.Ceiling(size.Width));
        var height = Math.Max(1, (int)Math.Ceiling(size.Height));

        using var bitmap = new Bitmap(width, height, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
        using var graphics = Graphics.FromImage(bitmap);
        graphics.Clear(Color.Transparent);
        graphics.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;
        graphics.DrawString(text, font, Brushes.White, 0, 0, format);

        var data = new byte[width * height * 4];
        var rect = new Rectangle(0, 0, width, height);
        var bmpData = bitmap.LockBits(rect, ImageLockMode.ReadOnly, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
        try
        {
            Marshal.Copy(bmpData.Scan0, data, 0, data.Length);
        }
        finally
        {
            bitmap.UnlockBits(bmpData);
        }

        for (var i = 0; i < data.Length; i += 4)
        {
            (data[i], data[i + 2]) = (data[i + 2], data[i]);
        }

        var textureId = _gl.GenTexture();
        _gl.BindTexture(TextureTarget.Texture2D, textureId);
        _gl.TexParameter(TextureTarget.Texture2D, TextureParameterName.TextureMinFilter, (int)GLEnum.Linear);
        _gl.TexParameter(TextureTarget.Texture2D, TextureParameterName.TextureMagFilter, (int)GLEnum.Linear);
        fixed (byte* ptr = data)
        {
            _gl.TexImage2D(TextureTarget.Texture2D, 0, (int)InternalFormat.Rgba, (uint)width, (uint)height, 0,
                Silk.NET.OpenGL.PixelFormat.Rgba, PixelType.UnsignedByte, ptr);
        }

        glyph = new TextGlyph(textureId, width, height);
        _glyphs[key] = glyph;
        return glyph;
    }

    public void Dispose()
    {
        foreach (var glyph in _glyphs.Values)
        {
            _gl.DeleteTexture(glyph.TextureId);
        }

        _glyphs.Clear();
        _measureGraphics.Dispose();
        _font.Dispose();
        _titleFont.Dispose();
    }

    private readonly record struct TextGlyph(uint TextureId, int Width, int Height);
}

public readonly struct Vector4(float x, float y, float z, float w)
{
    public float X { get; } = x;
    public float Y { get; } = y;
    public float Z { get; } = z;
    public float W { get; } = w;

    public static Vector4 White => new(1f, 1f, 1f, 1f);
    public static Vector4 Green => new(0.35f, 1f, 0.55f, 1f);
    public static Vector4 Dim => new(0.72f, 0.76f, 0.82f, 1f);
    public static Vector4 Panel => new(0.14f, 0.16f, 0.20f, 0.98f);
    public static Vector4 PanelHeader => new(0.10f, 0.38f, 0.28f, 1f);
    public static Vector4 PanelBorder => new(0.30f, 0.95f, 0.55f, 1f);
    public static Vector4 Button => new(0.20f, 0.24f, 0.30f, 1f);
    public static Vector4 ButtonHover => new(0.26f, 0.32f, 0.40f, 1f);
    public static Vector4 ButtonActive => new(0.15f, 0.72f, 0.45f, 1f);
    public static Vector4 Accent => new(0.20f, 0.85f, 0.55f, 1f);
    public static Vector4 MenuBg => new(0.07f, 0.09f, 0.12f, 1f);
    public static Vector4 Red => new(1f, 0.45f, 0.35f, 1f);
    public static Vector4 Yellow => new(1f, 0.85f, 0.35f, 1f);
}
