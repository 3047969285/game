using AimForge.Core.Abstractions;
using AimForge.Core.Settings;
using AimForge.Core.Stats;
using AimForge.Core.Training;
using Microsoft.Extensions.Logging;

namespace AimForge.Core.Services;

public sealed class TrainingSessionService : ITrainingSessionService
{
    private readonly ITrainingModeRegistry _registry;
    private readonly IStatsRepository _statsRepository;
    private readonly ILogger<TrainingSessionService> _logger;
    private TrainingModeKind _activeKind = TrainingModeKind.Flick;
    private TrainingHudState _hud = TrainingHudState.Empty;
    private string _lastProfileName = GameProfile.Cs2.DisplayName;

    public TrainingSessionService(
        ITrainingModeRegistry registry,
        IStatsRepository statsRepository,
        ILogger<TrainingSessionService> logger)
    {
        _registry = registry;
        _statsRepository = statsRepository;
        _logger = logger;
    }

    public ITrainingMode ActiveMode => _registry.Get(_activeKind);
    public TrainingModeKind ActiveKind => _activeKind;
    public TrainingHudState Hud => _hud;

    public void SelectMode(TrainingModeKind kind)
    {
        if (_activeKind == kind)
        {
            return;
        }

        _logger.LogInformation("切换训练模式: {From} -> {To}", _activeKind, kind);
        _activeKind = kind;
        ActiveMode.Reset();
    }

    public TrainingFrameResult Tick(in TrainingFrameInput input)
    {
        _lastProfileName = input.Settings.Profile.DisplayName;
        var result = ActiveMode.Update(in input);
        _hud = result.Hud;
        return result;
    }

    public void ResetActiveMode() => ActiveMode.Reset();

    public async Task FlushStatsAsync(CancellationToken cancellationToken = default)
    {
        if (_hud.Hits + _hud.Misses == 0)
        {
            return;
        }

        await PersistSnapshotAsync(_lastProfileName, cancellationToken).ConfigureAwait(false);
    }

    private async Task PersistSnapshotAsync(string profileName, CancellationToken cancellationToken = default)
    {
        try
        {
            var record = new SessionRecord
            {
                Mode = _activeKind,
                ProfileName = profileName,
                Hits = _hud.Hits,
                Misses = _hud.Misses,
                AccuracyPercent = _hud.AccuracyPercent,
                PrimaryMetricMs = _hud.LastMetricMs,
                Notes = _hud.DetailLine
            };

            await _statsRepository.SaveSessionAsync(record, cancellationToken).ConfigureAwait(false);

            var bests = await _statsRepository.LoadPersonalBestsAsync(cancellationToken).ConfigureAwait(false);
            if (_hud.LastMetricMs > 0f &&
                (!bests.BestMetricMsByMode.TryGetValue(_activeKind, out var best) || _hud.LastMetricMs < best))
            {
                bests.BestMetricMsByMode[_activeKind] = _hud.LastMetricMs;
                await _statsRepository.SavePersonalBestsAsync(bests, cancellationToken).ConfigureAwait(false);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "保存训练统计失败");
        }
    }
}
