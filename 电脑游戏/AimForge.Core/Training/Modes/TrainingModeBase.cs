using AimForge.Core.Abstractions;
using AimForge.Core.Combat;
using System.Numerics;

namespace AimForge.Core.Training.Modes;

public abstract class TrainingModeBase : ITrainingMode
{
    protected static readonly Vector3 EyePosition = new(0f, 1.65f, 0f);
    protected static readonly Vector3 TargetHalfExtents = new(0.28f, 0.42f, 0.12f);
    protected static readonly Vector3 TargetColor = new(0.95f, 0.25f, 0.2f);
    protected static readonly Vector3 TrackingColor = new(0.2f, 0.75f, 1f);

    protected readonly Random Random;
    protected readonly TrainingSceneState Scene = new();

    protected TrainingModeBase(TrainingModeKind kind, string displayName, int? seed = null)
    {
        Kind = kind;
        DisplayName = displayName;
        Random = seed.HasValue ? new Random(seed.Value) : Random.Shared;
    }

    public TrainingModeKind Kind { get; }
    public string DisplayName { get; }

    protected int Hits { get; set; }
    protected int Misses { get; set; }
    protected float BestMetricMs { get; set; } = float.MaxValue;
    protected float LastMetricMs { get; set; }
    protected string StatusLine { get; set; } = "准备";
    protected string DetailLine { get; set; } = string.Empty;

    public abstract void Reset();
    public abstract TrainingFrameResult Update(in TrainingFrameInput input);

    protected float AccuracyPercent =>
        Hits + Misses == 0 ? 0f : Hits * 100f / (Hits + Misses);

    protected TrainingHudState BuildHud() =>
        new(
            DisplayName,
            StatusLine,
            Hits,
            Misses,
            AccuracyPercent,
            LastMetricMs,
            BestMetricMs == float.MaxValue ? 0f : BestMetricMs,
            DetailLine);

    protected static TargetSnapshot MakeTarget(Vector3 center, Vector3 color, bool active = true) =>
        new(center, TargetHalfExtents, color, active);

    protected TrainingFrameResult CreateResult(float recoilYaw = 0f, float recoilPitch = 0f) =>
        new()
        {
            Scene = Scene,
            Hud = BuildHud(),
            RecoilYawDelta = recoilYaw,
            RecoilPitchDelta = recoilPitch
        };

    protected void RegisterHit(float metricMs)
    {
        Hits++;
        LastMetricMs = metricMs;
        if (metricMs < BestMetricMs)
        {
            BestMetricMs = metricMs;
        }
    }

    protected void RegisterMiss() => Misses++;
}
