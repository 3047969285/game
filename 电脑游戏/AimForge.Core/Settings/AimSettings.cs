namespace AimForge.Core.Settings;

public sealed class AimSettings
{
    public GameProfile Profile { get; set; } = GameProfile.Cs2;
    public int MouseDpi { get; set; } = 800;
    public float InGameSensitivity { get; set; } = 1.0f;
    public float HorizontalFov { get; set; } = 90f;

    public float Edpi => MouseDpi * InGameSensitivity;

    /// <summary>Centimeters per 360° turn (horizontal).</summary>
    public float CmPer360 =>
        Edpi <= 0f
            ? 0f
            : 2.54f * 360f / (Edpi * Profile.YawMultiplier * 1000f / MouseDpi);

    public void ApplyProfileDefaults(GameProfile profile)
    {
        Profile = profile;
        HorizontalFov = profile.DefaultHorizontalFov;
        InGameSensitivity = profile.DefaultSensitivity;
    }

    public float DegreesPerMouseCount(float deltaCounts)
    {
        if (MouseDpi <= 0)
        {
            return 0f;
        }

        var deltaInches = deltaCounts / MouseDpi;
        return deltaInches * InGameSensitivity * Profile.YawMultiplier * 360f;
    }
}
