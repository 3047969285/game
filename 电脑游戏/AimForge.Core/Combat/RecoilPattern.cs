namespace AimForge.Core.Combat;

public readonly struct RecoilStep
{
    public RecoilStep(float yawDegrees, float pitchDegrees)
    {
        YawDegrees = yawDegrees;
        PitchDegrees = pitchDegrees;
    }

    public float YawDegrees { get; }
    public float PitchDegrees { get; }
}

public sealed class RecoilPattern
{
    public RecoilPattern(WeaponKind weapon, IReadOnlyList<RecoilStep> steps, float secondsPerShot)
    {
        Weapon = weapon;
        Steps = steps;
        SecondsPerShot = secondsPerShot;
    }

    public WeaponKind Weapon { get; }
    public IReadOnlyList<RecoilStep> Steps { get; }
    public float SecondsPerShot { get; }
}
