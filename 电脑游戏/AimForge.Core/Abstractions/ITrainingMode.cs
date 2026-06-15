using AimForge.Core.Training;

namespace AimForge.Core.Abstractions;

public interface ITrainingMode
{
    TrainingModeKind Kind { get; }
    string DisplayName { get; }

    void Reset();
    TrainingFrameResult Update(in TrainingFrameInput input);
}
