@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo [AimForge] 正在重新编译...
dotnet build "%~dp0AimForge.App\AimForge.App.csproj" -c Release
if errorlevel 1 (
    echo 编译失败。
    pause
    exit /b 1
)

set "OUT=%~dp0AimForge.App\bin\Release\net9.0\win-x64"
cd /d "%OUT%"
start "" "%OUT%\AimForge.App.exe"
exit /b 0
