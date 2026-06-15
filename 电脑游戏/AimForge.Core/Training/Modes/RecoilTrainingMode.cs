using AimForge.Core.Combat;
using System.Numerics;

namespace AimForge.Core.Training.Modes;

public sealed class RecoilTrainingMode : TrainingModeBase
{
    private const float WallZ = 8f;
    private const float WallHeight = 3.5f;
    private const int MaxMarks = 64;

    private float _fireCooldown;
    private int _shotIndex;
    private float _sprayDeviationAccumulator;
    private int _sprayShots;
    private float _sprayPitchOrigin;

    public RecoilTrainingMode() : base(TrainingModeKind.Recoil, "压枪 Spray Wall")
    {
        Reset();
    }

    public override void Reset()
    {
        Hits = 0;
        Misses = 0;
        BestMetricMs = float.MaxValue;
        LastMetricMs = 0f;
        _fireCooldown = 0f;
        _shotIndex = 0;
        _sprayDeviationAccumulator = 0f;
        _sprayShots = 0;
        _sprayPitchOrigin = 0f;
        Scene.ResetSprayWall();
        Scene.BulletMarks.Clear();
        StatusLine = "压枪墙就绪";
        DetailLine = "Tab 切换武器 | 按住左键";
    }

    public override TrainingFrameResult Update(in TrainingFrameInput input)
    {
        var pattern = RecoilPatternLibrary.Get(input.SelectedWeapon);
        var recoilYaw = 0f;
        var recoilPitch = 0f;

        _fireCooldown -= input.DeltaSeconds;

        if (input.PrimaryFireDown && _fireCooldown <= 0f)
        {
            if (_shotIndex == 0)
            {
                _sprayPitchOrigin = input.CameraPitch;
                Scene.BulletMarks.Clear();
            }

            var step = pattern.Steps[Math.Min(_shotIndex, pattern.Steps.Count - 1)];
            recoilYaw = step.YawDegrees;
            recoilPitch = step.PitchDegrees;
            _fireCooldown = pattern.SecondsPerShot;
            _shotIndex++;

            var forward = AimMath.ForwardFromAngles(input.CameraYaw, input.CameraPitch);
            var hitPoint = EyePosition + forward * WallZ;
            var deviation = MathF.Abs(input.CameraPitch - _sprayPitchOrigin);

            _sprayDeviationAccumulator += deviation;
            _sprayShots++;
            LastMetricMs = deviation;

            if (Scene.BulletMarks.Count >= MaxMarks)
            {
                Scene.BulletMarks.RemoveAt(0);
            }

            Scene.BulletMarks.Add(new BulletMarkSnapshot(new Vector3(
                Math.Clamp(hitPoint.X, -6f, 6f),
                Math.Clamp(hitPoint.Y, 0.5f, WallHeight),
                WallZ - 0.02f)));

            if (deviation < 4f)
            {
                Hits++;
            }
            else
            {
                Misses++;
            }

            StatusLine = $"第 {_shotIndex} 发";
        }
        else if (!input.PrimaryFireDown && _shotIndex > 0)
        {
            _shotIndex = 0;
            StatusLine = "连发结束";
        }

        var avgDev = _sprayShots == 0 ? 0f : _sprayDeviationAccumulator / _sprayShots;
        DetailLine = $"武器 {input.SelectedWeapon} | 平均偏差 {avgDev:0.00}°";

        return CreateResult(recoilYaw, recoilPitch);
    }
}
