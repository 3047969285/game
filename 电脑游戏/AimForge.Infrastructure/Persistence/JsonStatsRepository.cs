using System.Text.Json;
using AimForge.Core.Abstractions;
using AimForge.Core.Stats;
using AimForge.Core.Training;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AimForge.Core.Settings;

namespace AimForge.Infrastructure.Persistence;

public sealed class JsonStatsRepository : IStatsRepository
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        WriteIndented = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    private readonly string _sessionsPath;
    private readonly string _bestsPath;
    private readonly ILogger<JsonStatsRepository> _logger;
    private readonly SemaphoreSlim _gate = new(1, 1);

    public JsonStatsRepository(IOptions<AppOptions> options, ILogger<JsonStatsRepository> logger)
    {
        _logger = logger;
        var dataDir = Path.GetFullPath(options.Value.DataDirectory);
        Directory.CreateDirectory(dataDir);
        _sessionsPath = Path.Combine(dataDir, "sessions.json");
        _bestsPath = Path.Combine(dataDir, "personal-bests.json");
    }

    public async Task<IReadOnlyList<SessionRecord>> LoadAllAsync(CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            if (!File.Exists(_sessionsPath))
            {
                return [];
            }

            await using var stream = File.OpenRead(_sessionsPath);
            var records = await JsonSerializer.DeserializeAsync<List<SessionRecord>>(stream, JsonOptions, cancellationToken)
                .ConfigureAwait(false);
            return records ?? [];
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task SaveSessionAsync(SessionRecord record, CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            var all = (await LoadAllInternalAsync(cancellationToken).ConfigureAwait(false)).ToList();
            all.Add(record);

            while (all.Count > 500)
            {
                all.RemoveAt(0);
            }

            await SaveInternalAsync(_sessionsPath, all, cancellationToken).ConfigureAwait(false);
            _logger.LogDebug("已保存训练记录 {Mode} hits={Hits}", record.Mode, record.Hits);
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<PersonalBestStore> LoadPersonalBestsAsync(CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            if (!File.Exists(_bestsPath))
            {
                return new PersonalBestStore();
            }

            await using var stream = File.OpenRead(_bestsPath);
            return await JsonSerializer.DeserializeAsync<PersonalBestStore>(stream, JsonOptions, cancellationToken)
                   .ConfigureAwait(false)
                   ?? new PersonalBestStore();
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task SavePersonalBestsAsync(PersonalBestStore store, CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            await SaveInternalAsync(_bestsPath, store, cancellationToken).ConfigureAwait(false);
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<IReadOnlyList<SessionRecord>> LoadAllInternalAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_sessionsPath))
        {
            return [];
        }

        await using var stream = File.OpenRead(_sessionsPath);
        return await JsonSerializer.DeserializeAsync<List<SessionRecord>>(stream, JsonOptions, cancellationToken)
               .ConfigureAwait(false)
               ?? [];
    }

    private async Task SaveInternalAsync<T>(string path, T payload, CancellationToken cancellationToken)
    {
        // 同目录写完后再替换，序列化失败不会截断已有统计文件。
        var temporaryPath = $"{path}.{Guid.NewGuid():N}.tmp";
        try
        {
            await using (var stream = new FileStream(temporaryPath, FileMode.CreateNew,
                             FileAccess.Write, FileShare.None, 4096, useAsync: true))
            {
                await JsonSerializer.SerializeAsync(stream, payload, JsonOptions, cancellationToken).ConfigureAwait(false);
                await stream.FlushAsync(cancellationToken).ConfigureAwait(false);
            }
            cancellationToken.ThrowIfCancellationRequested();
            File.Move(temporaryPath, path, overwrite: true);
        }
        finally
        {
            try
            {
                File.Delete(temporaryPath);
            }
            catch (Exception exception) when (exception is IOException or UnauthorizedAccessException)
            {
                // 清理失败只能留下可识别的临时文件，不能掩盖保存异常或误报成功保存失败。
                _logger.LogWarning(exception, "无法清理统计临时文件 {Path}", temporaryPath);
            }
        }
    }
}
