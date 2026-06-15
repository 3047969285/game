using AimForge.Core;
using AimForge.Core.Abstractions;
using AimForge.Core.Settings;
using AimForge.Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;

namespace AimForge.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAimForgeInfrastructure(
        this IServiceCollection services,
        Action<AppOptions>? configureOptions = null)
    {
        if (configureOptions is not null)
        {
            services.Configure(configureOptions);
        }

        services.AddAimForgeCore();
        services.AddSingleton<IStatsRepository, JsonStatsRepository>();
        return services;
    }
}
