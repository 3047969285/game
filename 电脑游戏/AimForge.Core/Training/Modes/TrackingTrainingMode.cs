using AimForge.Core.Combat;
using System.Numerics;

namespace AimForge.Core.Training.Modes;

public sealed class TrackingTrainingMode : TrainingModeBase
{
    private const float WallZ = 17.65f;
    private const float TrackHalfWidth = 8f;
    private const float TrackY = 1.85f;

    private Vector3 _targetPosition;
    private float _direction = 1f;
    private float _speed = 4.5f;
    private float _scoreAccumulator;
    private int _scoreSamples;

    public TrackingTrainingMode() : base(TrainingModeKind.Tracking, "跟枪 Tracking")
    {
        Reset();
    }

    public override void Reset()
    {
        Hits = 0;
        Misses = 0;
        BestMetricMs = float.MaxValue;
        LastMetricMs = 0f;
        _scoreAccumulator = 0f;
        _scoreSamples = 0;
        _targetPosition = new Vector3(-TrackHalfWidth, TrackY, WallZ - 0.35f);
        _direction = 1f;
        StatusLine = "跟住移动靶";
        DetailLine = "角距越小得分越高";
    }

    public override TrainingFrameResult Update(in TrainingFrameInput input)
    {
        _targetPosition += new Vector3(_direction * _speed * input.DeltaSeconds, 0f, 0f);
        if (_targetPosition.X > TrackHalfWidth || _targetPosition.X < -TrackHalfWidth)
        {
            _direction *= -1f;
        }

        var angularDistance = AimMath.AngularDistanceToPoint(
            input.CameraYaw,
            input.CameraPitch,
            EyePosition,
            _targetPosition);

        var sampleScore = Math.Clamp(100f - angularDistance * 18f, 0f, 100f);
        _scoreAccumulator += sampleScore;
        _scoreSamples++;
        LastMetricMs = angularDistance;

        if (input.PrimaryFirePressed)
        {
            if (angularDistance <= 2.5f)
            {
                Hits++;
                StatusLine = $"稳定 {sampleScore:0}%";
            }
            else
            {
                Misses++;
                StatusLine = $"偏离 {angularDistance:0.0}°";
            }
        }

        var avgScore = _scoreSamples == 0 ? 0f : _scoreAccumulator / _scoreSamples;
        DetailLine = $"平均贴合 {avgScore:0}% | 角距 {angularDistance:0.1}°";

        Scene.ResetRoom();
        Scene.Targets.Add(MakeTarget(_targetPosition, TrackingColor));
        return CreateResult();
    }
}
