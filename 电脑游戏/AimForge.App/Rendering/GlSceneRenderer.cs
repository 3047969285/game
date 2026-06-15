using System.Numerics;
using System.Runtime.InteropServices;
using AimForge.App.UI;
using AimForge.Core.Input;
using AimForge.Core.Settings;
using AimForge.Core.Training;
using Microsoft.Extensions.Logging;
using Silk.NET.OpenGL;
using Silk.NET.Windowing;

namespace AimForge.App.Rendering;

public sealed class GlSceneRenderer : IDisposable
{
    private readonly ILogger<GlSceneRenderer> _logger;

    private GL? _gl;
    private uint _crosshairVao;
    private uint _crosshairProgram;
    private OverlayRenderer? _overlay;

    public GlSceneRenderer(ILogger<GlSceneRenderer> logger)
    {
        _logger = logger;
    }

    public GL Gl => _gl!;
    public OverlayRenderer Overlay => _overlay!;

    public void Initialize(IWindow window, ILogger? uiLogger = null)
    {
        _gl = window.CreateOpenGL();
        _gl.Enable(EnableCap.DepthTest);
        _gl.Disable(EnableCap.Blend);
        _gl.ClearColor(0.14f, 0.16f, 0.21f, 1f);

        CreateCrosshair();
        _overlay = new OverlayRenderer(_gl, uiLogger);
        _logger.LogInformation("OpenGL 渲染器初始化完成 (2D 投影场景)");
    }

    public void RenderClear(IWindow window)
    {
        var gl = _gl!;
        var width = Math.Max(1, window.FramebufferSize.X);
        var height = Math.Max(1, window.FramebufferSize.Y);
        gl.Viewport(0, 0, (uint)width, (uint)height);
        gl.ClearColor(0.14f, 0.16f, 0.21f, 1f);
        gl.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);
    }

    public void RenderCrosshair()
    {
        DrawCrosshair(_gl!);
    }

    public void RenderProjectedScene(
        IWindow window,
        TrainingSceneState scene,
        CameraController camera,
        AimSettings settings)
    {
        var width = Math.Max(1, window.FramebufferSize.X);
        var height = Math.Max(1, window.FramebufferSize.Y);
        _overlay!.Begin(width, height);
        ProjectedSceneRenderer.Draw(_overlay, scene, camera, settings, width, height);
        _overlay.End();
    }

    public void RenderMenuBackdrop(IWindow window)
    {
        var gl = _gl!;
        var width = Math.Max(1, window.FramebufferSize.X);
        var height = Math.Max(1, window.FramebufferSize.Y);
        gl.Viewport(0, 0, (uint)width, (uint)height);
        gl.ClearColor(0.07f, 0.09f, 0.12f, 1f);
        gl.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);
    }

    public void RenderUi(IWindow window, Action drawUi)
    {
        var width = Math.Max(1, window.FramebufferSize.X);
        var height = Math.Max(1, window.FramebufferSize.Y);
        var gl = _gl!;

        gl.Viewport(0, 0, (uint)width, (uint)height);
        gl.BindFramebuffer(FramebufferTarget.Framebuffer, 0);

        _overlay!.Begin(width, height);
        drawUi();
        _overlay.End();
    }

    private void DrawCrosshair(GL gl)
    {
        gl.Disable(EnableCap.DepthTest);
        gl.UseProgram(_crosshairProgram);
        gl.BindVertexArray(_crosshairVao);
        gl.DrawArrays(PrimitiveType.Lines, 0, 4);
        gl.Enable(EnableCap.DepthTest);
    }

    private unsafe void CreateCrosshair()
    {
        var gl = _gl!;
        const string vertexSrc = """
            #version 330 core
            layout(location = 0) in vec2 aPos;
            void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
            """;
        const string fragmentSrc = """
            #version 330 core
            out vec4 FragColor;
            void main() { FragColor = vec4(0.0, 1.0, 0.35, 1.0); }
            """;

        _crosshairProgram = CompileProgram(gl, vertexSrc, fragmentSrc);
        float size = 0.012f;
        float[] lines = [-size, 0f, size, 0f, 0f, -size, 0f, size];
        _crosshairVao = gl.GenVertexArray();
        var vbo = gl.GenBuffer();
        gl.BindVertexArray(_crosshairVao);
        gl.BindBuffer(BufferTargetARB.ArrayBuffer, vbo);
        fixed (float* ptr = lines)
        {
            gl.BufferData(BufferTargetARB.ArrayBuffer, (nuint)(lines.Length * sizeof(float)), ptr, BufferUsageARB.StaticDraw);
        }

        gl.EnableVertexAttribArray(0);
        gl.VertexAttribPointer(0, 2, VertexAttribPointerType.Float, false, 2 * sizeof(float), (void*)0);
    }

    private static uint CompileProgram(GL gl, string vertexSrc, string fragmentSrc)
    {
        var vs = CompileShader(gl, ShaderType.VertexShader, vertexSrc);
        var fs = CompileShader(gl, ShaderType.FragmentShader, fragmentSrc);
        var program = gl.CreateProgram();
        gl.AttachShader(program, vs);
        gl.AttachShader(program, fs);
        gl.LinkProgram(program);
        gl.GetProgram(program, ProgramPropertyARB.LinkStatus, out var status);
        if (status == 0)
        {
            throw new InvalidOperationException($"Shader link failed: {gl.GetProgramInfoLog(program)}");
        }

        gl.DeleteShader(vs);
        gl.DeleteShader(fs);
        return program;
    }

    private static uint CompileShader(GL gl, ShaderType type, string source)
    {
        var shader = gl.CreateShader(type);
        gl.ShaderSource(shader, source);
        gl.CompileShader(shader);
        gl.GetShader(shader, ShaderParameterName.CompileStatus, out var status);
        if (status == 0)
        {
            throw new InvalidOperationException($"Shader compile failed: {gl.GetShaderInfoLog(shader)}");
        }

        return shader;
    }

    public void Dispose()
    {
        if (_gl is null)
        {
            return;
        }

        _overlay?.Dispose();
        _gl.DeleteVertexArray(_crosshairVao);
        _gl.DeleteProgram(_crosshairProgram);
    }
}
