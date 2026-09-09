@echo off
chcp 65001 >nul
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-preview.ps1"
if errorlevel 1 (
  echo.
  echo 网站启动失败，请将此窗口中的提示截图发给我。
  pause
)
