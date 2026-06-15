using AimForge.Core.Combat;
using AimForge.Core.Settings;

namespace AimForge.Core.Training;

public readonly struct TrainingFrameInput
{
    public required float DeltaSeconds { get; init; }
    public required float CameraYaw { get; init; }
    public required float CameraPitch { get; init; }
    public required bool PrimaryFireDown { get; init; }
    public required bool PrimaryFirePressed { get; init; }
    public required AimSettings Settings { get; init; }
    public required WeaponKind SelectedWeapon { get; init; }
}
