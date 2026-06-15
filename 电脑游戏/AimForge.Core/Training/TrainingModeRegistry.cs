using AimForge.Core.Abstractions;
using AimForge.Core.Training;
using AimForge.Core.Training.Modes;

namespace AimForge.Core.Training;

public sealed class TrainingModeRegistry : ITrainingModeRegistry
{
    private readonly Dictionary<TrainingModeKind, ITrainingMode> _modes;

    public TrainingModeRegistry()
    {
        ITrainingMode[] instances =
        [
            new FlickTrainingMode(),
            new TrackingTrainingMode(),
            new RecoilTrainingMode(),
            new PreAimTrainingMode(),
            new ReactionTrainingMode()
        ];

        _modes = instances.ToDictionary(m => m.Kind);
        All = instances;
    }

    public IReadOnlyList<ITrainingMode> All { get; }

    public ITrainingMode Get(TrainingModeKind kind) => _modes[kind];
}
