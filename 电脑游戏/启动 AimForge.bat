@echo off
chcp 65001 >nul
cd /d "%~dp0"

set "OUT=%~dp0AimForge.App\bin\Release\net9.0\win-x64"
set "EXE=%OUT%\AimForge.App.exe"

echo [AimForge] 正在编译...
dotnet build "%~dp0AimForge.App\AimForge.App.csproj" -c Release -v q
if errorlevel 1 (
    echo.
    echo 编译失败。请安装 .NET 9 SDK: https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

if not exist "%EXE%" (
    echo 找不到程序: %EXE%
    pause
    exit /b 1
)

cd /d "%OUT%"
start "" "%EXE%"
exit /b 0
