using System.Numerics;

namespace AimForge.Core.Scenarios;

public readonly struct PreAimScenario
{
    public PreAimScenario(string name, Vector3 targetPosition, float peekDelaySeconds)
    {
        Name = name;
        TargetPosition = targetPosition;
        PeekDelaySeconds = peekDelaySeconds;
    }

    public string Name { get; }
    public Vector3 TargetPosition { get; }
    public float PeekDelaySeconds { get; }
}

public static class PreAimScenarioLibrary
{
    public static IReadOnlyList<PreAimScenario> All { get; } =
    [
        new("A 门短角", new Vector3(-4.5f, 1.75f, 17.2f), 0.35f),
        new("B 包点架枪", new Vector3(5.8f, 1.85f, 17.2f), 0.45f),
        new("中路宽 peek", new Vector3(0.6f, 1.65f, 17.2f), 0.55f),
        new("左墙窄角", new Vector3(-8.2f, 1.7f, 17.2f), 0.4f),
        new("右墙高角", new Vector3(8.0f, 2.2f, 17.2f), 0.5f)
    ];
}
