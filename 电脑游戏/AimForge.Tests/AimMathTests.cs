using AimForge.Core.Combat;
using AimForge.Core.Settings;

namespace AimForge.Tests;

public class AimMathTests
{
    [Fact]
    public void IsOnTarget_ReturnsTrue_WhenCrosshairAligned()
    {
        var eye = new System.Numerics.Vector3(0, 1.65f, 0);
        var target = new System.Numerics.Vector3(0, 1.65f, 10f);

        var yaw = 90f;
        var pitch = 0f;

        Assert.True(AimMath.IsOnTarget(yaw, pitch, eye, target, 2f));
    }

    [Fact]
    public void AngularDistance_Increases_WhenOffCenter()
    {
        var eye = new System.Numerics.Vector3(0, 1.65f, 0);
        var target = new System.Numerics.Vector3(3, 1.65f, 10f);

        var onCenter = AimMath.AngularDistanceToPoint(90f, 0f, eye, new(0, 1.65f, 10f));
        var offCenter = AimMath.AngularDistanceToPoint(90f, 0f, eye, target);

        Assert.True(offCenter > onCenter);
    }
}

public class AimSettingsTests
{
    [Fact]
    public void Edpi_ComputesExpectedValue()
    {
        var settings = new AimSettings { MouseDpi = 800, InGameSensitivity = 1.25f };
        Assert.Equal(1000f, settings.Edpi);
    }
}

public class RecoilPatternLibraryTests
{
    [Fact]
    public void AllSupportedWeapons_HavePatterns()
    {
        foreach (var weapon in RecoilPatternLibrary.SupportedWeapons)
        {
            var pattern = RecoilPatternLibrary.Get(weapon);
            Assert.NotEmpty(pattern.Steps);
            Assert.True(pattern.SecondsPerShot > 0f);
        }
    }
}
