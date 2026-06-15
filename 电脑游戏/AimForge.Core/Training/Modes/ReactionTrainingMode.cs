using AimForge.Core.Combat;
using System.Diagnostics;
using System.Numerics;

namespace AimForge.Core.Training.Modes;

public sealed class ReactionTrainingMode : TrainingModeBase
{
    private enum Phase
    {
        Waiting,
        Shown,
        Cooldown
    }

    private const float WallZ = 17.65f;
    private const float HalfWidth = 10f;
    private const float RoomHeight = 4f;

    private Phase _phase = Phase.Waiting;
    private float _timer;
    private Vector3 _targetPosition;
    private Stopwatch? _reactionTimer;

    public ReactionTrainingMode() : base(TrainingModeKind.Reaction, "反应 Reaction")
    {
        Reset();
    }

    public override void Reset()
    {
        Hits = 0;
        Misses = 0;
        BestMetricMs = float.MaxValue;
        LastMetricMs = 0f;
        ScheduleNext();
    }

    public override TrainingFrameResult Update(in TrainingFrameInput input)
    {
        switch (_phase)
        {
            case Phase.Waiting:
                _timer -= input.DeltaSeconds;
                StatusLine = _timer > 0.5f ? "等待…" : "集中注意力";
                if (_timer <= 0f)
                {
                    _targetPosition = AimMath.RandomPointOnBackWall(Random, HalfWidth, WallZ, RoomHeight);
                    _phase = Phase.Shown;
                    _reactionTimer = Stopwatch.StartNew();
                    StatusLine = "开火!";
                }

                break;

            case Phase.Shown:
                if (input.PrimaryFirePressed)
                {
                    if (AimMath.IsOnTarget(input.CameraYaw, input.CameraPitch, EyePosition, _targetPosition, 2.5f))
                    {
                        RegisterHit((float)_reactionTimer!.Elapsed.TotalMilliseconds);
                        StatusLine = $"反应 {LastMetricMs:0} ms";
                    }
                    else
                    {
                        RegisterMiss();
                        StatusLine = "过早/偏靶";
                    }

                    _phase = Phase.Cooldown;
                    _timer = 0.6f;
                }
                else if (_reactionTimer!.Elapsed.TotalSeconds > 2.5)
                {
                    RegisterMiss();
                    StatusLine = "超时";
                    _phase = Phase.Cooldown;
                    _timer = 0.6f;
                }

                break;

            case Phase.Cooldown:
                _timer -= input.DeltaSeconds;
                if (_timer <= 0f)
                {
                    ScheduleNext();
                }

                break;
        }

        DetailLine = $"回合 {Hits + Misses} | 最佳 {(BestMetricMs == float.MaxValue ? 0 : BestMetricMs):0} ms";

        Scene.ResetRoom();
        if (_phase == Phase.Shown)
        {
            Scene.Targets.Add(MakeTarget(_targetPosition, new Vector3(1f, 0.85f, 0.1f)));
        }

        return CreateResult();
    }

    private void ScheduleNext()
    {
        _timer = 0.8f + (float)Random.NextDouble() * 1.7f;
        _phase = Phase.Waiting;
        StatusLine = "等待信号";
    }
}
