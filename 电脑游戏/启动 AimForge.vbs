Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
folder = fso.GetParentFolderName(WScript.ScriptFullName)
exe = folder & "\AimForge.App\bin\Release\net9.0\win-x64\AimForge.App.exe"

If Not fso.FileExists(exe) Then
    MsgBox "请先双击「启动 AimForge.bat」完成编译。", vbInformation, "AimForge"
    WScript.Quit 1
End If

shell.CurrentDirectory = fso.GetParentFolderName(exe)
shell.Run """" & exe & """", 1, False
