using AimForge.Core.Training;

namespace AimForge.Core.Abstractions;

public interface ITrainingSessionService
{
    ITrainingMode ActiveMode { get; }
    TrainingModeKind ActiveKind { get; }
    TrainingHudState Hud { get; }

    void SelectMode(TrainingModeKind kind);
    TrainingFrameResult Tick(in TrainingFrameInput input);
    void ResetActiveMode();
    Task FlushStatsAsync(CancellationToken cancellationToken = default);
}
