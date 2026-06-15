using AimForge.Core.Training;

namespace AimForge.Core.Abstractions;

public interface ITrainingModeRegistry
{
    IReadOnlyList<ITrainingMode> All { get; }
    ITrainingMode Get(TrainingModeKind kind);
}
