using AimForge.Core.Training;

namespace AimForge.Core.Stats;

public sealed class SessionRecord
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTimeOffset CompletedAt { get; set; } = DateTimeOffset.UtcNow;
    public TrainingModeKind Mode { get; set; }
    public string ProfileName { get; set; } = string.Empty;
    public int Hits { get; set; }
    public int Misses { get; set; }
    public float AccuracyPercent { get; set; }
    public float PrimaryMetricMs { get; set; }
    public string Notes { get; set; } = string.Empty;
}

public sealed class PersonalBestStore
{
    public Dictionary<TrainingModeKind, float> BestMetricMsByMode { get; set; } = new();
}
