using AimForge.Core.Training;
using AimForge.Core.Training.Modes;

namespace AimForge.Tests;

public class TrainingModeTests
{
    [Fact]
    public void FlickMode_SpawnsTarget_OnReset()
    {
        var mode = new FlickTrainingMode();
        var result = mode.Update(new TrainingFrameInput
        {
            DeltaSeconds = 0.016f,
            CameraYaw = 0,
            CameraPitch = 0,
            PrimaryFireDown = false,
            PrimaryFirePressed = false,
            Settings = new Core.Settings.AimSettings(),
            SelectedWeapon = Core.Combat.WeaponKind.Ak47
        });

        Assert.Single(result.Scene.Targets);
        Assert.True(result.Scene.Targets[0].Active);
    }

    [Fact]
    public void Registry_ContainsAllFiveModes()
    {
        var registry = new TrainingModeRegistry();
        Assert.Equal(5, registry.All.Count);
    }
}
