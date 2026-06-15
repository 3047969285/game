using AimForge.Core.Combat;
using AimForge.Core.Scenarios;
using System.Diagnostics;
using System.Numerics;

namespace AimForge.Core.Training.Modes;

public sealed class PreAimTrainingMode : TrainingModeBase
{
    private enum Phase
    {
        WaitingPeek,
        TargetVisible
    }

    private Phase _phase;
    private int _scenarioIndex;
    private float _timer;
    private Vector3 _targetPosition;
    private Stopwatch? _visibleTimer;

    public PreAimTrainingMode() : base(TrainingModeKind.PreAim, "预瞄 Pre-aim")
    {
        Reset();
    }

    public override void Reset()
    {
        Hits = 0;
        Misses = 0;
        BestMetricMs = float.MaxValue;
        LastMetricMs = 0f;
        _scenarioIndex = 0;
        BeginScenario();
    }

    public override TrainingFrameResult Update(in TrainingFrameInput input)
    {
        var scenario = PreAimScenarioLibrary.All[_scenarioIndex];

        switch (_phase)
        {
            case Phase.WaitingPeek:
                _timer -= input.DeltaSeconds;
                if (_timer <= 0f)
                {
                    _phase = Phase.TargetVisible;
                    _visibleTimer = Stopwatch.StartNew();
                    StatusLine = $"{scenario.Name} — peek!";
                }

                break;

            case Phase.TargetVisible:
                if (input.PrimaryFirePressed)
                {
                    if (AimMath.IsOnTarget(input.CameraYaw, input.CameraPitch, EyePosition, _targetPosition, 2.2f))
                    {
                        RegisterHit((float)_visibleTimer!.Elapsed.TotalMilliseconds);
                        StatusLine = $"预瞄命中 {LastMetricMs:0} ms";
                    }
                    else
                    {
                        RegisterMiss();
                        StatusLine = "预瞄失败";
                    }

                    AdvanceScenario();
                }

                break;
        }

        Scene.ResetRoom();
        if (_phase == Phase.TargetVisible)
        {
            Scene.Targets.Add(MakeTarget(_targetPosition, TargetColor));
        }

        DetailLine = $"场景 {_scenarioIndex + 1}/{PreAimScenarioLibrary.All.Count} {scenario.Name}";
        return CreateResult();
    }

    private void BeginScenario()
    {
        var scenario = PreAimScenarioLibrary.All[_scenarioIndex];
        _targetPosition = scenario.TargetPosition;
        _timer = scenario.PeekDelaySeconds;
        _phase = Phase.WaitingPeek;
        StatusLine = $"架枪 — {scenario.Name}";
    }

    private void AdvanceScenario()
    {
        _scenarioIndex = (_scenarioIndex + 1) % PreAimScenarioLibrary.All.Count;
        BeginScenario();
    }
}
