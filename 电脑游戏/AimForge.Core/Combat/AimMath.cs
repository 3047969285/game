using System.Numerics;

namespace AimForge.Core.Combat;

public static class AimMath
{
    public static Vector3 ForwardFromAngles(float yawDegrees, float pitchDegrees)
    {
        var yaw = DegreesToRadians(yawDegrees);
        var pitch = DegreesToRadians(pitchDegrees);
        return Vector3.Normalize(new Vector3(
            MathF.Cos(pitch) * MathF.Cos(yaw),
            MathF.Sin(pitch),
            MathF.Cos(pitch) * MathF.Sin(yaw)));
    }

    public static float AngularDistanceDegrees(Vector3 fromDirection, Vector3 toDirection)
    {
        var dot = Math.Clamp(Vector3.Dot(Vector3.Normalize(fromDirection), Vector3.Normalize(toDirection)), -1f, 1f);
        return RadiansToDegrees(MathF.Acos(dot));
    }

    public static float AngularDistanceToPoint(
        float yawDegrees,
        float pitchDegrees,
        Vector3 eye,
        Vector3 targetCenter)
    {
        var forward = ForwardFromAngles(yawDegrees, pitchDegrees);
        var toTarget = Vector3.Normalize(targetCenter - eye);
        return AngularDistanceDegrees(forward, toTarget);
    }

    public static bool IsOnTarget(
        float yawDegrees,
        float pitchDegrees,
        Vector3 eye,
        Vector3 targetCenter,
        float toleranceDegrees = 1.8f)
    {
        return AngularDistanceToPoint(yawDegrees, pitchDegrees, eye, targetCenter) <= toleranceDegrees;
    }

    public static Vector3 RandomPointOnBackWall(Random random, float halfWidth, float wallZ, float height)
    {
        var x = (float)(random.NextDouble() * 2 - 1) * (halfWidth - 1.5f);
        var y = 1.2f + (float)random.NextDouble() * (height - 2f);
        return new Vector3(x, y, wallZ - 0.35f);
    }

    private static float DegreesToRadians(float degrees) => degrees * (MathF.PI / 180f);
    private static float RadiansToDegrees(float radians) => radians * (180f / MathF.PI);
}
