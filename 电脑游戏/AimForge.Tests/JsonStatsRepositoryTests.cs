using AimForge.Core.Stats;
using AimForge.Core.Training;
using AimForge.Infrastructure.Persistence;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using AimForge.Core.Settings;

namespace AimForge.Tests;

public class JsonStatsRepositoryTests : IDisposable
{
    private readonly string _directory = Path.Combine(Path.GetTempPath(), "aimforge-tests", Guid.NewGuid().ToString("N"));

    private JsonStatsRepository CreateRepository() => new(
        Options.Create(new AppOptions { DataDirectory = _directory }),
        NullLogger<JsonStatsRepository>.Instance);

    public void Dispose()
    {
        if (Directory.Exists(_directory)) Directory.Delete(_directory, recursive: true);
    }

    [Fact]
    public async Task SaveSession_PersistsRecord()
    {
        var repo = CreateRepository();

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

    [Fact]
    public async Task FailedSessionSave_PreservesExistingFileAndRemovesTemporaryFile()
    {
        var repo = CreateRepository();
        await repo.SaveSessionAsync(new SessionRecord { Hits = 12 });
        var file = Path.Combine(_directory, "sessions.json");
        var previous = await File.ReadAllBytesAsync(file);

        await Assert.ThrowsAsync<ArgumentException>(() => repo.SaveSessionAsync(
            new SessionRecord { AccuracyPercent = float.NaN }));

        Assert.Equal(previous, await File.ReadAllBytesAsync(file));
        Assert.Equal(12, Assert.Single(await CreateRepository().LoadAllAsync()).Hits);
        Assert.Single(Directory.GetFiles(_directory));
    }

    [Fact]
    public async Task FailedPersonalBestSave_PreservesExistingFileAndRemovesTemporaryFile()
    {
        var repo = CreateRepository();
        var bests = new PersonalBestStore();
        bests.BestMetricMsByMode[TrainingModeKind.Flick] = 210;
        await repo.SavePersonalBestsAsync(bests);
        var file = Path.Combine(_directory, "personal-bests.json");
        var previous = await File.ReadAllBytesAsync(file);
        bests.BestMetricMsByMode[TrainingModeKind.Flick] = float.PositiveInfinity;

        await Assert.ThrowsAsync<ArgumentException>(() => repo.SavePersonalBestsAsync(bests));

        Assert.Equal(previous, await File.ReadAllBytesAsync(file));
        Assert.Equal(210f, (await CreateRepository().LoadPersonalBestsAsync()).BestMetricMsByMode[TrainingModeKind.Flick]);
        Assert.Single(Directory.GetFiles(_directory));
    }

    [Fact]
    public async Task ConcurrentSaves_DoNotLoseSessions()
    {
        var repo = CreateRepository();
        await Task.WhenAll(Enumerable.Range(0, 20)
            .Select(hits => repo.SaveSessionAsync(new SessionRecord { Hits = hits })));
        var records = await repo.LoadAllAsync();
        Assert.Equal(Enumerable.Range(0, 20), records.Select(record => record.Hits).Order());
        Assert.Single(Directory.GetFiles(_directory));
    }

    [Fact]
    public async Task SaveSession_KeepsOnlyLatest500Records()
    {
        var repo = CreateRepository();
        for (var hits = 0; hits < 501; hits++)
            await repo.SaveSessionAsync(new SessionRecord { Hits = hits });
        var records = await CreateRepository().LoadAllAsync();
        Assert.Equal(500, records.Count);
        Assert.Equal(1, records[0].Hits);
        Assert.Equal(500, records[^1].Hits);
    }

    [Fact]
    public async Task CancelledSave_PreservesExistingRecords()
    {
        var repo = CreateRepository();
        await repo.SaveSessionAsync(new SessionRecord { Hits = 12 });
        using var cancellation = new CancellationTokenSource();
        cancellation.Cancel();
        await Assert.ThrowsAnyAsync<OperationCanceledException>(() =>
            repo.SaveSessionAsync(new SessionRecord { Hits = 99 }, cancellation.Token));
        Assert.Equal(12, Assert.Single(await repo.LoadAllAsync()).Hits);
        Assert.Single(Directory.GetFiles(_directory));
    }
}
