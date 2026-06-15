namespace AimForge.Core.Combat;

public static class RecoilPatternLibrary
{
    private static readonly Dictionary<WeaponKind, RecoilPattern> Patterns = Build();

    public static RecoilPattern Get(WeaponKind weapon) =>
        Patterns.TryGetValue(weapon, out var pattern)
            ? pattern
            : Patterns[WeaponKind.Ak47];

    public static IReadOnlyList<WeaponKind> SupportedWeapons { get; } =
        [WeaponKind.Ak47, WeaponKind.M4A4, WeaponKind.Vandal, WeaponKind.Phantom];

    private static Dictionary<WeaponKind, RecoilPattern> Build()
    {
        return new Dictionary<WeaponKind, RecoilPattern>
        {
            [WeaponKind.Ak47] = new(
                WeaponKind.Ak47,
                BuildAkPattern(),
                0.1f),
            [WeaponKind.M4A4] = new(
                WeaponKind.M4A4,
                BuildM4Pattern(),
                0.09f),
            [WeaponKind.Vandal] = new(
                WeaponKind.Vandal,
                BuildVandalPattern(),
                0.1f),
            [WeaponKind.Phantom] = new(
                WeaponKind.Phantom,
                BuildPhantomPattern(),
                0.09f)
        };
    }

    // Community-aligned simplified patterns (degrees per shot).
    private static IReadOnlyList<RecoilStep> BuildAkPattern()
    {
        var steps = new List<RecoilStep>(30);
        for (var i = 0; i < 30; i++)
        {
            var yaw = i < 10 ? -0.15f : i < 20 ? 0.25f : -0.35f;
            var pitch = i < 8 ? 0.55f : i < 18 ? 0.42f : 0.28f;
            steps.Add(new RecoilStep(yaw, pitch));
        }

        return steps;
    }

    private static IReadOnlyList<RecoilStep> BuildM4Pattern()
    {
        var steps = new List<RecoilStep>(30);
        for (var i = 0; i < 30; i++)
        {
            var yaw = i < 12 ? 0.08f : -0.12f;
            var pitch = i < 15 ? 0.38f : 0.25f;
            steps.Add(new RecoilStep(yaw, pitch));
        }

        return steps;
    }

    private static IReadOnlyList<RecoilStep> BuildVandalPattern()
    {
        var steps = new List<RecoilStep>(25);
        for (var i = 0; i < 25; i++)
        {
            var yaw = i < 8 ? 0f : i < 16 ? 0.18f : -0.22f;
            var pitch = i < 10 ? 0.48f : 0.32f;
            steps.Add(new RecoilStep(yaw, pitch));
        }

        return steps;
    }

    private static IReadOnlyList<RecoilStep> BuildPhantomPattern()
    {
        var steps = new List<RecoilStep>(30);
        for (var i = 0; i < 30; i++)
        {
            var yaw = i < 14 ? 0.05f : -0.1f;
            var pitch = i < 12 ? 0.35f : 0.22f;
            steps.Add(new RecoilStep(yaw, pitch));
        }

        return steps;
    }
}
