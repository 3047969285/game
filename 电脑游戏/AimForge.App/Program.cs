using System.Runtime.InteropServices;
using AimForge.App;
using AimForge.App.Diagnostics;
using AimForge.App.Rendering;
using AimForge.Core.Settings;
using AimForge.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

AppDomain.CurrentDomain.UnhandledException += (_, e) =>
{
    if (e.ExceptionObject is Exception ex)
    {
        AppLog.Error("未处理异常", ex);
        ShowError($"AimForge 崩溃:\n{ex.Message}\n\n日志: {AppLog.LogPath}");
    }
};

try
{
    AppLog.Info("启动 AimForge");

    var configuration = new ConfigurationBuilder()
        .SetBasePath(AppContext.BaseDirectory)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false)
        .Build();

    var services = new ServiceCollection();
    services.AddLogging(builder =>
    {
        builder.ClearProviders();
        builder.AddConsole();
        builder.SetMinimumLevel(LogLevel.Information);
    });

    services.Configure<AppOptions>(configuration.GetSection(AppOptions.SectionName));
    services.AddAimForgeInfrastructure();
    services.AddSingleton<GlSceneRenderer>();
    services.AddSingleton<GameHost>();

    using var provider = services.BuildServiceProvider();
    provider.GetRequiredService<GameHost>().Run();
}
catch (Exception ex)
{
    AppLog.Error("启动失败", ex);
    ShowError($"AimForge 启动失败:\n{ex.Message}\n\n日志: {AppLog.LogPath}");
}

static void ShowError(string message)
{
    MessageBoxW(IntPtr.Zero, message, "AimForge", 0x10);
}

[DllImport("user32.dll", CharSet = CharSet.Unicode)]
static extern int MessageBoxW(IntPtr hWnd, string text, string caption, uint type);
