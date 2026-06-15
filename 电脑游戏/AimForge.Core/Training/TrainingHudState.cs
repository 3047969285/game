namespace AimForge.Core.Training;

public readonly struct TrainingHudState
{
    public static TrainingHudState Empty { get; } = new(
        string.Empty,
        string.Empty,
        0,
        0,
        0f,
        0f,
        0f,
        string.Empty);

    public TrainingHudState(
        string modeName,
        string statusLine,
        int hits,
        int misses,
        float accuracyPercent,
        float lastMetricMs,
        float bestMetricMs,
        string detailLine)
    {
        ModeName = modeName;
        StatusLine = statusLine;
        Hits = hits;
        Misses = misses;
        AccuracyPercent = accuracyPercent;
        LastMetricMs = lastMetricMs;
        BestMetricMs = bestMetricMs;
        DetailLine = detailLine;
    }

    public string ModeName { get; }
    public string StatusLine { get; }
    public int Hits { get; }
    public int Misses { get; }
    public float AccuracyPercent { get; }
    public float LastMetricMs { get; }
    public float BestMetricMs { get; }
    public string DetailLine { get; }
}
