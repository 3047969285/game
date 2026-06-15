using System.Numerics;
using AimForge.App.Diagnostics;
using AimForge.App.Rendering;
using AimForge.App.UI;
using AimForge.Core.Abstractions;
using AimForge.Core.Combat;
using AimForge.Core.Input;
using AimForge.Core.Performance;
using AimForge.Core.Settings;
using AimForge.Core.Training;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Silk.NET.Input;
using Silk.NET.Maths;
using Silk.NET.Windowing;

namespace AimForge.App;

public sealed class GameHost : IDisposable
{
    private readonly AppOptions _options;
    private readonly ITrainingSessionService _training;
    private readonly GlSceneRenderer _renderer;
    private readonly ILogger<GameHost> _logger;

    private readonly AimSettings _settings = new();
    private readonly CameraController _camera = new();
    private readonly FpsTracker _fps = new();
    private readonly WeaponKind[] _weapons = RecoilPatternLibrary.SupportedWeapons.ToArray();

    private IWindow? _window;
    private IInputContext? _input;
    private IMouse? _mouse;
    private GameUi? _ui;
    private TrainingSceneState _scene = new();

    private Vector2 _lastMousePos;
    private bool _mouseInitialized;
    private bool _prevFireDown;
    private int _weaponIndex;
    private float _lastDelta;
    private AppScreen _lastScreen = AppScreen.MainMenu;
    private string? _loadError;

    public GameHost(
        IOptions<AppOptions> options,
        ITrainingSessionService training,
        GlSceneRenderer renderer,
        ILogger<GameHost> logger)
    {
        _options = options.Value;
        _training = training;
        _renderer = renderer;
        _logger = logger;
        _settings.MouseDpi = _options.DefaultDpi;
    }

    public void Run()
    {
        var options = WindowOptions.Default with
        {
            Title = "AimForge — CS2 / 无畏契约练枪",
            Size = new Vector2D<int>(_options.WindowWidth, _options.WindowHeight),
            VSync = _options.VSync,
            PreferredDepthBufferBits = 24,
            ShouldSwapAutomatically = true,
            IsVisible = true,
            WindowState = WindowState.Normal
        };

        _window = Window.Create(options);
        _window.Load += OnLoad;
        _window.Update += OnUpdate;
        _window.Render += OnRender;
        _window.Closing += OnClosing;
        _window.Run();
    }

    private void OnLoad()
    {
        try
        {
            _renderer.Initialize(_window!, _logger);
            var fonts = new FontAtlas(_renderer.Gl);
            _ui = new GameUi(_renderer.Overlay, fonts);
            _ui.PrewarmMenuStrings();
            _input = _window!.CreateInput();
            _mouse = _input.Mice.FirstOrDefault();
            UpdateCursorMode();
            AppLog.Info($"窗口 { _window.Size.X}x{_window.Size.Y}  framebuffer {_window.FramebufferSize.X}x{_window.FramebufferSize.Y}");
            _logger.LogInformation("AimForge 已启动");
        }
        catch (Exception ex)
        {
            _loadError = ex.Message;
            AppLog.Error("OnLoad 失败", ex);
            _logger.LogError(ex, "初始化失败");
        }
    }

    private void OnUpdate(double deltaSeconds)
    {
        if (_ui is null)
        {
            return;
        }

        _lastDelta = (float)deltaSeconds;
        UpdateCursorMode();
        ProcessKeyboard();

        var w = Math.Max(1, _window!.FramebufferSize.X);
        var h = Math.Max(1, _window.FramebufferSize.Y);
        var (mx, my) = GetMousePosition();
        var fireDown = _mouse?.IsButtonPressed(MouseButton.Left) ?? false;
        var firePressed = fireDown && !_prevFireDown;
        _prevFireDown = fireDown;

        if (_ui.Screen == AppScreen.MainMenu)
        {
            _ui.HandleMenuInput(w, h, mx, my, firePressed, fireDown, _settings);
            _fps.Tick();
        }
        else
        {
            PollMouse();

            var input = new TrainingFrameInput
            {
                DeltaSeconds = _lastDelta,
                CameraYaw = _camera.Yaw,
                CameraPitch = _camera.Pitch,
                PrimaryFireDown = fireDown,
                PrimaryFirePressed = firePressed,
                Settings = _settings,
                SelectedWeapon = _weapons[_weaponIndex]
            };

            var result = _training.Tick(input);
            _scene = result.Scene;

            if (result.RecoilYawDelta != 0f || result.RecoilPitchDelta != 0f)
            {
                _camera.ApplyRecoilKick(result.RecoilYawDelta, result.RecoilPitchDelta);
            }

            _fps.Tick();
        }

        if (_lastScreen != _ui.Screen && _ui.Screen == AppScreen.Training)
        {
            _training.SelectMode(_ui.SelectedMode);
            _camera.Reset();
            _training.ResetActiveMode();
            _mouseInitialized = false;
        }

        _lastScreen = _ui.Screen;
    }

    private void PollMouse()
    {
        if (_mouse is null)
        {
            return;
        }

        var pos = _mouse.Position;
        if (_mouseInitialized)
        {
            var delta = pos - _lastMousePos;
            if (delta.X != 0f || delta.Y != 0f)
            {
                _camera.ApplyMouseDelta(delta.X, delta.Y, _settings);
            }
        }
        else
        {
            _mouseInitialized = true;
        }

        _lastMousePos = pos;
    }

    private void ProcessKeyboard()
    {
        if (_input is null || _ui is null)
        {
            return;
        }

        foreach (var keyboard in _input.Keyboards)
        {
            if (!keyboard.IsKeyPressed(Key.Escape))
            {
                continue;
            }

            if (_ui.Screen == AppScreen.Training)
            {
                _ui.Screen = AppScreen.MainMenu;
                _training.FlushStatsAsync().GetAwaiter().GetResult();
            }
            else
            {
                _window!.Close();
            }

            return;
        }

        if (_ui.Screen == AppScreen.MainMenu)
        {
            ProcessMenuKeyboard();
            return;
        }

        if (_ui.Screen != AppScreen.Training)
        {
            return;
        }

        foreach (var keyboard in _input.Keyboards)
        {
            if (keyboard.IsKeyPressed(Key.R))
            {
                _camera.Reset();
                _training.ResetActiveMode();
            }
            else if (keyboard.IsKeyPressed(Key.Tab))
            {
                _weaponIndex = (_weaponIndex + 1) % _weapons.Length;
            }
        }
    }

    private void ProcessMenuKeyboard()
    {
        foreach (var keyboard in _input!.Keyboards)
        {
            if (keyboard.IsKeyPressed(Key.Enter) || keyboard.IsKeyPressed(Key.KeypadEnter))
            {
                _ui!.Screen = AppScreen.Training;
                return;
            }

            if (keyboard.IsKeyPressed(Key.Number1))
            {
                _settings.ApplyProfileDefaults(GameProfile.Cs2);
            }
            else if (keyboard.IsKeyPressed(Key.Number2))
            {
                _settings.ApplyProfileDefaults(GameProfile.Valorant);
            }
            else if (keyboard.IsKeyPressed(Key.F1))
            {
                _ui!.SelectedMode = TrainingModeKind.Flick;
            }
            else if (keyboard.IsKeyPressed(Key.F2))
            {
                _ui!.SelectedMode = TrainingModeKind.Tracking;
            }
            else if (keyboard.IsKeyPressed(Key.F3))
            {
                _ui!.SelectedMode = TrainingModeKind.Recoil;
            }
            else if (keyboard.IsKeyPressed(Key.F4))
            {
                _ui!.SelectedMode = TrainingModeKind.PreAim;
            }
            else if (keyboard.IsKeyPressed(Key.F5))
            {
                _ui!.SelectedMode = TrainingModeKind.Reaction;
            }
        }
    }

    private (float X, float Y) GetMousePosition()
    {
        if (_mouse is null || _window is null)
        {
            return (0f, 0f);
        }

        var framebuffer = _window.FramebufferSize;
        var windowSize = _window.Size;
        var pos = _mouse.Position;

        if (windowSize.X <= 0 || windowSize.Y <= 0)
        {
            return (pos.X, pos.Y);
        }

        return (
            pos.X * framebuffer.X / (float)windowSize.X,
            pos.Y * framebuffer.Y / (float)windowSize.Y);
    }

    private void UpdateCursorMode()
    {
        if (_mouse is null || _ui is null)
        {
            return;
        }

        _mouse.Cursor.CursorMode = _ui.Screen == AppScreen.Training
            ? CursorMode.Raw
            : CursorMode.Normal;
    }

    private void OnRender(double deltaSeconds)
    {
        try
        {
            if (_loadError is not null)
            {
                _renderer.RenderMenuBackdrop(_window!);
                _renderer.RenderUi(_window!, () =>
                {
                    var w = Math.Max(1, _window!.FramebufferSize.X);
                    var h = Math.Max(1, _window.FramebufferSize.Y);
                    _renderer.Overlay.DrawRect(0, 0, w, h, UI.Vector4.MenuBg);
                    _renderer.Overlay.DrawRect(40, 40, w - 80, 80, UI.Vector4.Red);
                    _renderer.Overlay.DrawRect(40, 140, w - 80, 200, UI.Vector4.Panel);
                });
                return;
            }

            if (_ui is null)
            {
                _renderer.RenderMenuBackdrop(_window!);
                return;
            }

            var training = _ui.Screen == AppScreen.Training;
            var w = Math.Max(1, _window!.FramebufferSize.X);
            var h = Math.Max(1, _window.FramebufferSize.Y);

            if (training)
            {
                _renderer.RenderClear(_window);
                _renderer.RenderProjectedScene(_window, _scene, _camera, _settings);
                _renderer.RenderCrosshair();
            }
            else
            {
                _renderer.RenderMenuBackdrop(_window);
            }

            _renderer.RenderUi(_window, () =>
            {
                if (training)
                {
                    _ui.RenderTrainingHud(
                        _training.Hud,
                        _fps,
                        _options.TargetFpsMinimum,
                        _settings,
                        _weapons[_weaponIndex],
                        w,
                        h);
                }
                else
                {
                    _ui.RenderMainMenu(_settings, w, h);
                }
            });
        }
        catch (Exception ex)
        {
            AppLog.Error("OnRender 失败", ex);
            _logger.LogError(ex, "渲染失败");
        }
    }

    private void OnClosing()
    {
        _training.FlushStatsAsync().GetAwaiter().GetResult();
        _ui?.Dispose();
        _renderer.Dispose();
    }

    public void Dispose()
    {
        _input?.Dispose();
        _window?.Close();
    }
}
