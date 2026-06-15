using AimForge.Core.Stats;
using AimForge.Core.Training;
using AimForge.Infrastructure.Persistence;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using AimForge.Core.Settings;

namespace AimForge.Tests;

public class JsonStatsRepositoryTests
{
    [Fact]
    public async Task SaveSession_PersistsRecord()
    {
        var dir = Path.Combine(Path.GetTempPath(), "aimforge-tests", Guid.NewGuid().ToString("N"));
        var repo = new JsonStatsRepository(
            Options.Create(new AppOptions { DataDirectory = dir }),
            NullLogger<JsonStatsRepository>.Instance);

        var record = new SessionRecord
        {
            Mode = TrainingModeKind.Flick,
            ProfileName = "CS2 Profile",
            Hits = 10,
            Misses = 2,
            AccuracyPercent = 83.3f,
            PrimaryMetricMs = 210f
        };

        await repo.SaveSessionAsync(record);
        var all = await repo.LoadAllAsync();

        Assert.Single(all);
        Assert.Equal(10, all[0].Hits);
    }
}
