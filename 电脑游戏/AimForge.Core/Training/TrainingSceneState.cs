using System.Numerics;

namespace AimForge.Core.Training;

public sealed class TrainingSceneState
{
    public SceneKind SceneKind { get; set; } = SceneKind.TrainingRoom;
    public List<TargetSnapshot> Targets { get; } = new(4);
    public List<BulletMarkSnapshot> BulletMarks { get; } = new(64);

    public void ResetRoom()
    {
        SceneKind = SceneKind.TrainingRoom;
        Targets.Clear();
        BulletMarks.Clear();
    }

    public void ResetSprayWall()
    {
        SceneKind = SceneKind.SprayWall;
        Targets.Clear();
    }
}

public enum SceneKind
{
    TrainingRoom,
    SprayWall
}

public readonly struct TargetSnapshot
{
    public TargetSnapshot(Vector3 center, Vector3 halfExtents, Vector3 color, bool active)
    {
        Center = center;
        HalfExtents = halfExtents;
        Color = color;
        Active = active;
    }

    public Vector3 Center { get; }
    public Vector3 HalfExtents { get; }
    public Vector3 Color { get; }
    public bool Active { get; }
}

public readonly struct BulletMarkSnapshot
{
    public BulletMarkSnapshot(Vector3 position)
    {
        Position = position;
    }

    public Vector3 Position { get; }
}
