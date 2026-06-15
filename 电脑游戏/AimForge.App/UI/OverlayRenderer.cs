using System.Numerics;
using Microsoft.Extensions.Logging;
using Silk.NET.OpenGL;

namespace AimForge.App.UI;

public readonly struct UiRect(float x, float y, float w, float h)
{
    public float X { get; } = x;
    public float Y { get; } = y;
    public float W { get; } = w;
    public float H { get; } = h;

    public bool Contains(float px, float py) =>
        px >= X && px <= X + W && py >= Y && py <= Y + H;
}

/// <summary>
/// 2D overlay using clip-space (NDC) coordinates — same technique as the crosshair.
/// Avoids uniform matrix issues that caused invisible UI on some drivers.
/// </summary>
public sealed unsafe class OverlayRenderer : IDisposable
{
    private readonly GL _gl;
    private readonly ILogger? _logger;
    private uint _colorProgram;
    private uint _texProgram;
    private int _colorLoc;
    private int _texColorLoc;
    private int _texSamplerLoc;
    private uint _colorVao;
    private uint _colorVbo;
    private uint _texVao;
    private uint _texVbo;
    private int _screenW = 1;
    private int _screenH = 1;

    public OverlayRenderer(GL gl, ILogger? logger = null)
    {
        _gl = gl;
        _logger = logger;
        CreateResources();
    }

    public void Begin(int width, int height)
    {
        _screenW = Math.Max(1, width);
        _screenH = Math.Max(1, height);
        _gl.Enable(EnableCap.Blend);
        _gl.BlendFunc(BlendingFactor.SrcAlpha, BlendingFactor.OneMinusSrcAlpha);
        _gl.Disable(EnableCap.DepthTest);
        _gl.Disable(EnableCap.CullFace);
        _gl.Disable(EnableCap.ScissorTest);
    }

    public void End()
    {
        _gl.BindVertexArray(0);
        _gl.UseProgram(0);
        _gl.Disable(EnableCap.Blend);
        _gl.Enable(EnableCap.DepthTest);
        _gl.Enable(EnableCap.CullFace);
    }

    public void DrawScreenQuad(Vector2 tl, Vector2 tr, Vector2 br, Vector2 bl, Vector4 color)
    {
        Span<float> verts = stackalloc float[12];
        WritePointNdc(verts, 0, tl.X, tl.Y);
        WritePointNdc(verts, 2, tr.X, tr.Y);
        WritePointNdc(verts, 4, br.X, br.Y);
        WritePointNdc(verts, 6, tl.X, tl.Y);
        WritePointNdc(verts, 8, br.X, br.Y);
        WritePointNdc(verts, 10, bl.X, bl.Y);

        _gl.UseProgram(_colorProgram);
        _gl.Uniform4(_colorLoc, color.X, color.Y, color.Z, color.W);
        DrawColorVerts(verts);
    }

    private void WritePointNdc(Span<float> verts, int offset, float px, float py)
    {
        verts[offset] = ToNdcX(px);
        verts[offset + 1] = ToNdcY(py);
    }

    public void DrawRect(float x, float y, float w, float h, Vector4 color)
    {
        Span<float> verts = stackalloc float[12];
        WriteRectNdc(verts, x, y, w, h);

        _gl.UseProgram(_colorProgram);
        _gl.Uniform4(_colorLoc, color.X, color.Y, color.Z, color.W);
        DrawColorVerts(verts);
    }

    public void DrawRectOutline(float x, float y, float w, float h, float thickness, Vector4 color)
    {
        DrawRect(x, y, w, thickness, color);
        DrawRect(x, y + h - thickness, w, thickness, color);
        DrawRect(x, y, thickness, h, color);
        DrawRect(x + w - thickness, y, thickness, h, color);
    }

    public void DrawTexturedRect(float x, float y, float w, float h, uint textureId, Vector4 color)
    {
        var x0 = ToNdcX(x);
        var y0 = ToNdcY(y);
        var x1 = ToNdcX(x + w);
        var y1 = ToNdcY(y + h);

        Span<float> verts =
        [
            x0, y0, 0f, 0f,
            x1, y0, 1f, 0f,
            x1, y1, 1f, 1f,
            x0, y0, 0f, 0f,
            x1, y1, 1f, 1f,
            x0, y1, 0f, 1f
        ];

        _gl.UseProgram(_texProgram);
        _gl.Uniform4(_texColorLoc, color.X, color.Y, color.Z, color.W);
        _gl.ActiveTexture(TextureUnit.Texture0);
        _gl.BindTexture(TextureTarget.Texture2D, textureId);
        _gl.Uniform1(_texSamplerLoc, 0);
        DrawTexVerts(verts);
    }

    private void WriteRectNdc(Span<float> verts, float x, float y, float w, float h)
    {
        var x0 = ToNdcX(x);
        var y0 = ToNdcY(y);
        var x1 = ToNdcX(x + w);
        var y1 = ToNdcY(y + h);

        verts[0] = x0; verts[1] = y0;
        verts[2] = x1; verts[3] = y0;
        verts[4] = x1; verts[5] = y1;
        verts[6] = x0; verts[7] = y0;
        verts[8] = x1; verts[9] = y1;
        verts[10] = x0; verts[11] = y1;
    }

    private float ToNdcX(float px) => px / _screenW * 2f - 1f;
    private float ToNdcY(float py) => 1f - py / _screenH * 2f;

    private void DrawColorVerts(ReadOnlySpan<float> verts)
    {
        _gl.BindVertexArray(_colorVao);
        _gl.BindBuffer(BufferTargetARB.ArrayBuffer, _colorVbo);
        fixed (float* ptr = verts)
        {
            _gl.BufferData(BufferTargetARB.ArrayBuffer, (nuint)(verts.Length * sizeof(float)), ptr, BufferUsageARB.StreamDraw);
        }

        _gl.EnableVertexAttribArray(0);
        _gl.VertexAttribPointer(0, 2, VertexAttribPointerType.Float, false, 2 * sizeof(float), (void*)0);
        _gl.DrawArrays(PrimitiveType.Triangles, 0, 6);
    }

    private void DrawTexVerts(ReadOnlySpan<float> verts)
    {
        _gl.BindVertexArray(_texVao);
        _gl.BindBuffer(BufferTargetARB.ArrayBuffer, _texVbo);
        fixed (float* ptr = verts)
        {
            _gl.BufferData(BufferTargetARB.ArrayBuffer, (nuint)(verts.Length * sizeof(float)), ptr, BufferUsageARB.StreamDraw);
        }

        const uint stride = 4 * sizeof(float);
        _gl.EnableVertexAttribArray(0);
        _gl.VertexAttribPointer(0, 2, VertexAttribPointerType.Float, false, stride, (void*)0);
        _gl.EnableVertexAttribArray(1);
        _gl.VertexAttribPointer(1, 2, VertexAttribPointerType.Float, false, stride, (void*)(2 * sizeof(float)));
        _gl.DrawArrays(PrimitiveType.Triangles, 0, 6);
    }

    private void CreateResources()
    {
        _colorProgram = Compile(
            """
            #version 330 core
            layout(location = 0) in vec2 aPos;
            uniform vec4 uColor;
            out vec4 vColor;
            void main() {
                vColor = uColor;
                gl_Position = vec4(aPos, 0.0, 1.0);
            }
            """,
            """
            #version 330 core
            in vec4 vColor;
            out vec4 FragColor;
            void main() { FragColor = vColor; }
            """);

        _texProgram = Compile(
            """
            #version 330 core
            layout(location = 0) in vec2 aPos;
            layout(location = 1) in vec2 aUv;
            uniform vec4 uColor;
            out vec2 vUv;
            out vec4 vColor;
            void main() {
                vUv = aUv;
                vColor = uColor;
                gl_Position = vec4(aPos, 0.0, 1.0);
            }
            """,
            """
            #version 330 core
            in vec2 vUv;
            in vec4 vColor;
            uniform sampler2D uTex;
            out vec4 FragColor;
            void main() {
                vec4 tex = texture(uTex, vUv);
                FragColor = vec4(vColor.rgb * tex.rgb, vColor.a * tex.a);
            }
            """);

        _colorLoc = _gl.GetUniformLocation(_colorProgram, "uColor");
        _texColorLoc = _gl.GetUniformLocation(_texProgram, "uColor");
        _texSamplerLoc = _gl.GetUniformLocation(_texProgram, "uTex");

        _colorVao = _gl.GenVertexArray();
        _colorVbo = _gl.GenBuffer();
        _texVao = _gl.GenVertexArray();
        _texVbo = _gl.GenBuffer();

        _logger?.LogInformation("UI overlay ready (NDC mode)");
    }

    private uint Compile(string vs, string fs)
    {
        var v = _gl.CreateShader(ShaderType.VertexShader);
        _gl.ShaderSource(v, vs);
        _gl.CompileShader(v);
        _gl.GetShader(v, ShaderParameterName.CompileStatus, out var vStatus);
        if (vStatus == 0)
        {
            throw new InvalidOperationException($"UI vertex shader failed: {_gl.GetShaderInfoLog(v)}");
        }

        var f = _gl.CreateShader(ShaderType.FragmentShader);
        _gl.ShaderSource(f, fs);
        _gl.CompileShader(f);
        _gl.GetShader(f, ShaderParameterName.CompileStatus, out var fStatus);
        if (fStatus == 0)
        {
            throw new InvalidOperationException($"UI fragment shader failed: {_gl.GetShaderInfoLog(f)}");
        }

        var p = _gl.CreateProgram();
        _gl.AttachShader(p, v);
        _gl.AttachShader(p, f);
        _gl.LinkProgram(p);
        _gl.GetProgram(p, ProgramPropertyARB.LinkStatus, out var linkStatus);
        if (linkStatus == 0)
        {
            throw new InvalidOperationException($"UI program link failed: {_gl.GetProgramInfoLog(p)}");
        }

        _gl.DeleteShader(v);
        _gl.DeleteShader(f);
        return p;
    }

    public void Dispose()
    {
        _gl.DeleteVertexArray(_colorVao);
        _gl.DeleteBuffer(_colorVbo);
        _gl.DeleteVertexArray(_texVao);
        _gl.DeleteBuffer(_texVbo);
        _gl.DeleteProgram(_colorProgram);
        _gl.DeleteProgram(_texProgram);
    }
}
