using AimForge.Core.Stats;

namespace AimForge.Core.Abstractions;

public interface IStatsRepository
{
    Task<IReadOnlyList<SessionRecord>> LoadAllAsync(CancellationToken cancellationToken = default);
    Task SaveSessionAsync(SessionRecord record, CancellationToken cancellationToken = default);
    Task<PersonalBestStore> LoadPersonalBestsAsync(CancellationToken cancellationToken = default);
    Task SavePersonalBestsAsync(PersonalBestStore store, CancellationToken cancellationToken = default);
}
