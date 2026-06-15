namespace AimForge.App.Diagnostics;

public static class AppLog
{
    private static readonly object Gate = new();
    private static string? _path;

    public static string LogPath
    {
        get
        {
            if (_path is not null)
            {
                return _path;
            }

            var dir = Path.Combine(AppContext.BaseDirectory, "data");
            Directory.CreateDirectory(dir);
            _path = Path.Combine(dir, "aimforge.log");
            return _path;
        }
    }

    public static void Info(string message) => Write("INFO", message);
    public static void Error(string message, Exception? ex = null) => Write("ERROR", ex is null ? message : $"{message}{Environment.NewLine}{ex}");

    private static void Write(string level, string message)
    {
        var line = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {level} {message}{Environment.NewLine}";
        lock (Gate)
        {
            File.AppendAllText(LogPath, line);
        }
    }
}
