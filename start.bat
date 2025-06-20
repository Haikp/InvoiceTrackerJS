:: Windows Exclusive
@echo off
set "PROJECT_DIR=E:\Development\ExportTools\InvoiceTrackerJS"
cd /d "%PROJECT_DIR%"
echo Current directory: %CD%

echo Checking for git updates...
git pull origin windows-package | findstr /C:"Already up to date." >nul
if %errorlevel%==0 (
    echo No updates found.
) else (
    echo Updates pulled from git.
)

IF NOT EXIST node_modules (
    echo First-time setup: Installing dependencies...
    call npm install
)

echo Building the project...
call npm run build
echo Build finished with errorlevel %ERRORLEVEL%

if ERRORLEVEL 1 (
    echo Build failed, exiting batch script.
    pause
    exit /b 1
)

echo Starting the server...
start "" http://localhost:3000
set NODE_ENV=production
call npm run start

echo Server stopped or exited.
pause
