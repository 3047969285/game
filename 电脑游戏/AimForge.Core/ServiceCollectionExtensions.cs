using AimForge.Core.Abstractions;
using AimForge.Core.Services;
using AimForge.Core.Settings;
using AimForge.Core.Training;
using Microsoft.Extensions.DependencyInjection;

namespace AimForge.Core;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAimForgeCore(this IServiceCollection services)
    {
        services.AddOptions<AppOptions>();
        services.AddSingleton<ITrainingModeRegistry, TrainingModeRegistry>();
        services.AddSingleton<ITrainingSessionService, TrainingSessionService>();
        return services;
    }
}
