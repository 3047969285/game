using AimForge.Core.Combat;
using System.Diagnostics;
using System.Numerics;

namespace AimForge.Core.Training.Modes;

public sealed class FlickTrainingMode : TrainingModeBase
{
    private const float WallZ = 17.65f;
    private const float HalfWidth = 10f;
    private const float RoomHeight = 4f;

    private Vector3 _targetPosition;
    private Stopwatch? _spawnTimer;

    public FlickTrainingMode() : base(TrainingModeKind.Flick, "甩枪 Flick")
    {
        Reset();
    }

    public override void Reset()
    {
        Hits = 0;
        Misses = 0;
        BestMetricMs = float.MaxValue;
        LastMetricMs = 0f;
        StatusLine = "等待目标";
        DetailLine = "左键命中靶子";
        SpawnTarget();
    }

    public override TrainingFrameResult Update(in TrainingFrameInput input)
    {
        _spawnTimer ??= Stopwatch.StartNew();

        if (input.PrimaryFirePressed)
        {
            if (AimMath.IsOnTarget(input.CameraYaw, input.CameraPitch, EyePosition, _targetPosition))
            {
                RegisterHit((float)_spawnTimer!.Elapsed.TotalMilliseconds);
                StatusLine = $"命中 {LastMetricMs:0} ms";
                SpawnTarget();
            }
            else
            {
                RegisterMiss();
                StatusLine = "未命中";
            }
        }

        Scene.ResetRoom();
        Scene.Targets.Add(MakeTarget(_targetPosition, TargetColor));
        return CreateResult();
    }

    private void SpawnTarget()
    {
        _targetPosition = AimMath.RandomPointOnBackWall(Random, HalfWidth, WallZ, RoomHeight);
        _spawnTimer = Stopwatch.StartNew();
        StatusLine = "目标已刷新";
    }
}
