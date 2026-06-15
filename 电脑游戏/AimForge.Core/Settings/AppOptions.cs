namespace AimForge.Core.Settings;

public sealed class AppOptions
{
    public const string SectionName = "AimForge";

    public int TargetFpsMinimum { get; set; } = 700;
    public string DataDirectory { get; set; } = "data";
    public bool VSync { get; set; } = false;
    public int DefaultDpi { get; set; } = 800;
    public int WindowWidth { get; set; } = 1920;
    public int WindowHeight { get; set; } = 1080;
}
