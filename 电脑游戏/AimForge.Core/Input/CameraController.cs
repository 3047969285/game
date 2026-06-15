namespace AimForge.Core.Input;

public sealed class CameraController
{
    private const float PitchLimit = 89f;
    private const float DefaultYaw = 90f;

    public float Yaw { get; private set; } = DefaultYaw;
    public float Pitch { get; private set; }

    public void ApplyMouseDelta(float deltaX, float deltaY, Settings.AimSettings settings)
    {
        Yaw += settings.DegreesPerMouseCount(deltaX);
        Pitch -= settings.DegreesPerMouseCount(deltaY);
        Pitch = Math.Clamp(Pitch, -PitchLimit, PitchLimit);
    }

    public void Reset()
    {
        Yaw = DefaultYaw;
        Pitch = 0f;
    }

    public void ApplyRecoilKick(float yawDegrees, float pitchDegrees)
    {
        Yaw += yawDegrees;
        Pitch += pitchDegrees;
        Pitch = Math.Clamp(Pitch, -PitchLimit, PitchLimit);
    }
}