namespace AimForge.Core.Training;

public sealed class TrainingFrameResult
{
    public float RecoilYawDelta { get; init; }
    public float RecoilPitchDelta { get; init; }
    public TrainingSceneState Scene { get; init; } = null!;
    public TrainingHudState Hud { get; init; } = TrainingHudState.Empty;
}
