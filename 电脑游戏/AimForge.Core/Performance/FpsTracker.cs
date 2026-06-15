using System.Diagnostics;

namespace AimForge.Core.Performance;

public sealed class FpsTracker
{
    private readonly Stopwatch _clock = Stopwatch.StartNew();
    private double _lastTimestamp;
    private int _frameCount;
    private double _accumulatedSeconds;

    public double CurrentFps { get; private set; }
    public double AverageFps { get; private set; }
    public double MinFps { get; private set; } = double.MaxValue;

    public void Tick()
    {
        var now = _clock.Elapsed.TotalSeconds;
        var delta = now - _lastTimestamp;
        _lastTimestamp = now;

        if (delta <= 0d)
        {
            return;
        }

        _frameCount++;
        _accumulatedSeconds += delta;
        CurrentFps = 1d / delta;

        if (CurrentFps < MinFps)
        {
            MinFps = CurrentFps;
        }

        if (_accumulatedSeconds >= 0.25d)
        {
            AverageFps = _frameCount / _accumulatedSeconds;
            _frameCount = 0;
            _accumulatedSeconds = 0d;
        }
    }
}
