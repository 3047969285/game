using AimForge.Core.Combat;
using AimForge.Core.Performance;
using AimForge.Core.Settings;
using AimForge.Core.Training;

namespace AimForge.App.UI;

public sealed class GameUi : IDisposable
{
    private readonly FontAtlas _fonts;
    private readonly OverlayRenderer _overlay;

    private UiRect _panelRect;
    private UiRect _headerRect;
    private UiRect _startButton;
    private UiRect _cs2Button;
    private UiRect _valorantButton;
    private readonly UiRect[] _modeButtons = new UiRect[5];
    private UiRect _dpiSlider;
    private UiRect _sensSlider;
    private UiRect _fovSlider;

    private string? _dragSlider;
    private float _hoverMx;
    private float _hoverMy;

    public GameUi(OverlayRenderer overlay, FontAtlas fonts)
    {
        _overlay = overlay;
        _fonts = fonts;
    }

    public AppScreen Screen { get; set; } = AppScreen.MainMenu;
    public TrainingModeKind SelectedMode { get; set; } = TrainingModeKind.Flick;

    public void HandleMenuInput(int screenW, int screenH, float mx, float my, bool clicked, bool down, AimSettings settings)
    {
        if (Screen != AppScreen.MainMenu)
        {
            return;
        }

        _hoverMx = mx;
        _hoverMy = my;
        Layout(screenW, screenH);

        if (clicked)
        {
            if (_startButton.Contains(mx, my))
            {
                Screen = AppScreen.Training;
                return;
            }

            if (_cs2Button.Contains(mx, my))
            {
                settings.ApplyProfileDefaults(GameProfile.Cs2);
            }
            else if (_valorantButton.Contains(mx, my))
            {
                settings.ApplyProfileDefaults(GameProfile.Valorant);
            }

            for (var i = 0; i < _modeButtons.Length; i++)
            {
                if (_modeButtons[i].Contains(mx, my))
                {
                    SelectedMode = (TrainingModeKind)i;
                }
            }

            if (_dpiSlider.Contains(mx, my))
            {
                _dragSlider = "dpi";
            }
            else if (_sensSlider.Contains(mx, my))
            {
                _dragSlider = "sens";
            }
            else if (_fovSlider.Contains(mx, my))
            {
                _dragSlider = "fov";
            }
        }

        if (!down)
        {
            _dragSlider = null;
            return;
        }

        if (_dragSlider == "dpi")
        {
            settings.MouseDpi = SliderValue(mx, _dpiSlider, 400, 3200);
        }
        else if (_dragSlider == "sens")
        {
            settings.InGameSensitivity = SliderValue(mx, _sensSlider, 0.1f, 5f);
        }
        else if (_dragSlider == "fov")
        {
            settings.HorizontalFov = SliderValue(mx, _fovSlider, 70f, 110f);
        }
    }

    public void DrawMainMenu(AimSettings settings, int screenW, int screenH)
    {
        Layout(screenW, screenH);

        _overlay.DrawRect(0, 0, screenW, screenH, Vector4.MenuBg);

        // Decorative accent bars — always visible even if text fails
        _overlay.DrawRect(0, 0, screenW, 4, Vector4.Accent);
        _overlay.DrawRect(0, screenH - 4, screenW, 4, Vector4.Accent);

        _overlay.DrawRect(_panelRect.X, _panelRect.Y, _panelRect.W, _panelRect.H, Vector4.Panel);
        _overlay.DrawRectOutline(_panelRect.X, _panelRect.Y, _panelRect.W, _panelRect.H, 3f, Vector4.PanelBorder);
        _overlay.DrawRect(_headerRect.X, _headerRect.Y, _headerRect.W, _headerRect.H, Vector4.PanelHeader);

        var x = _panelRect.X + 28;
        var y = _panelRect.Y + 18;

        _fonts.DrawText(_overlay, "AIMFORGE", x, y, Vector4.Green, title: true);
        _fonts.DrawText(_overlay, "CS2 / 无畏契约 练枪平台", x + 220, y + 12, Vector4.White);
        y = _headerRect.Y + _headerRect.H + 24;

        _fonts.DrawText(_overlay, "① 游戏配置", x, y, Vector4.Yellow);
        y += 34;
        DrawProfileButton(_cs2Button, "CS2", settings.Profile.Kind == GameProfileKind.Cs2);
        DrawProfileButton(_valorantButton, "无畏契约", settings.Profile.Kind == GameProfileKind.Valorant);
        y += 56;

        _fonts.DrawText(_overlay, "② 训练模式", x, y, Vector4.Yellow);
        y += 34;
        DrawModeRow(_modeButtons[0], "F1  甩枪 Flick", SelectedMode == TrainingModeKind.Flick, x, y);
        y += 42;
        DrawModeRow(_modeButtons[1], "F2  跟枪 Tracking", SelectedMode == TrainingModeKind.Tracking, x, y);
        y += 42;
        DrawModeRow(_modeButtons[2], "F3  压枪 Spray", SelectedMode == TrainingModeKind.Recoil, x, y);
        y += 42;
        DrawModeRow(_modeButtons[3], "F4  预瞄 Pre-aim", SelectedMode == TrainingModeKind.PreAim, x, y);
        y += 42;
        DrawModeRow(_modeButtons[4], "F5  反应 Reaction", SelectedMode == TrainingModeKind.Reaction, x, y);
        y += 48;

        _fonts.DrawText(_overlay, "③ 灵敏度", x, y, Vector4.Yellow);
        y += 32;
        DrawSlider(_dpiSlider, "DPI", settings.MouseDpi.ToString(), settings.MouseDpi, 400, 3200, x, y);
        y += 38;
        DrawSlider(_sensSlider, "游戏灵敏度", settings.InGameSensitivity.ToString("0.00"), settings.InGameSensitivity, 0.1f, 5f, x, y);
        y += 38;
        DrawSlider(_fovSlider, "水平 FOV", settings.HorizontalFov.ToString("0"), settings.HorizontalFov, 70f, 110f, x, y);
        y += 40;
        _fonts.DrawText(_overlay, $"eDPI {settings.Edpi:0}   |   cm/360 {settings.CmPer360:0.0}", x, y, Vector4.Dim);
        y += 44;

        DrawStartButton(_startButton, _startButton.Contains(_hoverMx, _hoverMy));
        _fonts.DrawText(_overlay, "▶  开始训练", _startButton.X + 180, _startButton.Y + 16, Vector4.White);

        var footerY = _panelRect.Y + _panelRect.H - 32;
        _fonts.DrawText(_overlay, "Enter 开始  |  1/2 切换配置  |  F1-F5 模式  |  Esc 退出", x, footerY, Vector4.Dim);
    }

    public void DrawTrainingHud(
        TrainingHudState hud,
        FpsTracker fps,
        int targetFps,
        AimSettings settings,
        WeaponKind weapon,
        int screenW,
        int screenH)
    {
        const float pad = 16f;
        const float panelW = 360f;
        const float panelH = 210f;

        _overlay.DrawRect(pad, pad, panelW, panelH, Vector4.Panel);
        _overlay.DrawRectOutline(pad, pad, panelW, panelH, 2f, Vector4.PanelBorder);

        var x = pad + 16;
        var y = pad + 14;
        var fpsOk = fps.AverageFps >= targetFps;
        _fonts.DrawText(_overlay, $"FPS {fps.CurrentFps:0}  avg {fps.AverageFps:0}  {(fpsOk ? "达标" : "未达标")}", x, y,
            fpsOk ? Vector4.Green : Vector4.Red);
        y += 30;
        _fonts.DrawText(_overlay, $"模式  {hud.ModeName}", x, y, Vector4.White);
        y += 26;
        _fonts.DrawText(_overlay, $"状态  {hud.StatusLine}", x, y, Vector4.White);
        y += 26;
        _fonts.DrawText(_overlay, $"命中  {hud.Hits}/{hud.Hits + hud.Misses}  准确率 {hud.AccuracyPercent:0}%", x, y, Vector4.White);
        y += 26;
        if (hud.LastMetricMs > 0f)
        {
            _fonts.DrawText(_overlay, $"指标  {hud.LastMetricMs:0.0} ms", x, y, Vector4.Dim);
            y += 26;
        }

        if (!string.IsNullOrEmpty(hud.DetailLine))
        {
            _fonts.DrawText(_overlay, hud.DetailLine, x, y, Vector4.Dim);
        }

        const float barH = 36f;
        _overlay.DrawRect(0, screenH - barH, screenW, barH, Vector4.Panel);
        _overlay.DrawRect(0, screenH - barH, screenW, 2, Vector4.Accent);
        _fonts.DrawText(_overlay, "左键射击  |  R 重置  |  Tab 切枪  |  Esc 返回菜单", pad, screenH - barH + 10, Vector4.Dim);
        _fonts.DrawText(_overlay, $"{settings.Profile.DisplayName}  |  {weapon}", screenW - 300, screenH - barH + 10, Vector4.Dim);
    }

    private void Layout(int screenW, int screenH)
    {
        var pw = Math.Min(560f, screenW - 80f);
        var ph = Math.Min(640f, screenH - 80f);
        var px = (screenW - pw) * 0.5f;
        var py = (screenH - ph) * 0.5f;
        _panelRect = new UiRect(px, py, pw, ph);
        _headerRect = new UiRect(px, py, pw, 72);

        var x = px + 28;
        var y = py + 72 + 24 + 34;
        _cs2Button = new UiRect(x, y, 120, 38);
        _valorantButton = new UiRect(x + 136, y, 150, 38);
        y += 56 + 34;
        for (var i = 0; i < 5; i++)
        {
            _modeButtons[i] = new UiRect(x, y + i * 42, pw - 56, 36);
        }

        y += 42 * 5 + 48 + 32;
        _dpiSlider = new UiRect(x + 110, y, pw - 200, 20);
        y += 38;
        _sensSlider = new UiRect(x + 110, y, pw - 200, 20);
        y += 38;
        _fovSlider = new UiRect(x + 110, y, pw - 200, 20);
        y += 40 + 44;
        _startButton = new UiRect(px + 28, py + ph - 88, pw - 56, 52);
    }

    private void DrawProfileButton(UiRect rect, string label, bool active)
    {
        var hover = rect.Contains(_hoverMx, _hoverMy);
        _overlay.DrawRect(rect.X, rect.Y, rect.W, rect.H, active ? Vector4.ButtonActive : hover ? Vector4.ButtonHover : Vector4.Button);
        _fonts.DrawText(_overlay, label, rect.X + 16, rect.Y + 9, Vector4.White);
    }

    private void DrawModeRow(UiRect rect, string label, bool active, float x, float y)
    {
        var hover = rect.Contains(_hoverMx, _hoverMy);
        _overlay.DrawRect(rect.X, rect.Y, rect.W, rect.H, active ? Vector4.ButtonActive : hover ? Vector4.ButtonHover : Vector4.Button);
        _fonts.DrawText(_overlay, label, x + 14, y + 8, active ? Vector4.White : Vector4.Dim);
    }

    private void DrawStartButton(UiRect rect, bool hover)
    {
        _overlay.DrawRect(rect.X, rect.Y, rect.W, rect.H, hover ? new Vector4(0.20f, 0.90f, 0.50f, 1f) : Vector4.Accent);
        _overlay.DrawRectOutline(rect.X, rect.Y, rect.W, rect.H, 2f, Vector4.White);
    }

    private void DrawSlider(UiRect track, string label, string value, float current, float min, float max, float x, float y)
    {
        _fonts.DrawText(_overlay, label, x, y, Vector4.White);
        _overlay.DrawRect(track.X, track.Y, track.W, track.H, new Vector4(0.12f, 0.14f, 0.18f, 1f));
        var t = (current - min) / (max - min);
        var fillW = Math.Max(6f, track.W * t);
        _overlay.DrawRect(track.X, track.Y, fillW, track.H, Vector4.Accent);
        _fonts.DrawText(_overlay, value, track.X + track.W + 14, track.Y - 2, Vector4.Yellow);
    }

    private static float SliderValue(float mx, UiRect track, float min, float max)
    {
        var t = Math.Clamp((mx - track.X) / track.W, 0f, 1f);
        return min + (max - min) * t;
    }

    private static int SliderValue(float mx, UiRect track, int min, int max)
    {
        var t = Math.Clamp((mx - track.X) / track.W, 0f, 1f);
        return (int)(min + (max - min) * t);
    }

    public void PrewarmMenuStrings()
    {
        _fonts.Prewarm(
        [
            "AIMFORGE", "CS2 / 无畏契约 练枪平台", "① 游戏配置", "CS2", "无畏契约", "② 训练模式",
            "F1  甩枪 Flick", "F2  跟枪 Tracking", "F3  压枪 Spray", "F4  预瞄 Pre-aim", "F5  反应 Reaction",
            "③ 灵敏度", "DPI", "游戏灵敏度", "水平 FOV", "▶  开始训练",
            "Enter 开始  |  1/2 切换配置  |  F1-F5 模式  |  Esc 退出"
        ]);
    }

    public void BeginFrame(int screenW, int screenH) { }
    public void EndFrame() { }
    public void RenderMainMenu(AimSettings settings, int screenW, int screenH) => DrawMainMenu(settings, screenW, screenH);

    public void RenderTrainingHud(
        TrainingHudState hud, FpsTracker fps, int targetFps, AimSettings settings, WeaponKind weapon, int screenW, int screenH) =>
        DrawTrainingHud(hud, fps, targetFps, settings, weapon, screenW, screenH);

    public void Dispose()
    {
        _fonts.Dispose();
    }
}
