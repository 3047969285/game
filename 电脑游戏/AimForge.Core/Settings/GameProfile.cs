namespace AimForge.Core.Settings;

public enum GameProfileKind
{
    Cs2,
    Valorant
}

public sealed class GameProfile
{
    public GameProfileKind Kind { get; init; }
    public string DisplayName { get; init; } = string.Empty;
    public float DefaultHorizontalFov { get; init; }
    public float DefaultSensitivity { get; init; }
    public float YawMultiplier { get; init; }

    public static GameProfile Cs2 { get; } = new()
    {
        Kind = GameProfileKind.Cs2,
        DisplayName = "CS2 Profile",
        DefaultHorizontalFov = 90f,
        DefaultSensitivity = 1.0f,
        YawMultiplier = 0.022f
    };

    public static GameProfile Valorant { get; } = new()
    {
        Kind = GameProfileKind.Valorant,
        DisplayName = "Valorant Profile",
        DefaultHorizontalFov = 103f,
        DefaultSensitivity = 0.4f,
        YawMultiplier = 0.07f
    };

    public static IReadOnlyList<GameProfile> All { get; } = [Cs2, Valorant];
}
