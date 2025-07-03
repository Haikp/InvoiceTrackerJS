@echo off
setlocal EnableDelayedExpansion

:: ------------------------------
:: Load Atlas credentials from .env
:: ------------------------------
echo Loading MongoDB Atlas credentials from .env...
if not exist ".env" (
    echo Error: .env file not found in %CD%
    pause
    exit /b 1
)

for /f "tokens=1,* delims==" %%A in ('type ".env"') do (
    set "%%A=%%B"
)

:: ------------------------------
:: Set project directory
:: ------------------------------
set "PROJECT_DIR=E:\Development\ExportTools\InvoiceTrackerJS"
cd /d "%PROJECT_DIR%"
echo Current directory: %CD%

:: ------------------------------
:: Get current public IP
:: ------------------------------
echo Checking current public IP...
for /f "delims=" %%i in ('powershell -Command "(Invoke-RestMethod -Uri 'https://api.ipify.org?format=json').ip"') do set "CURRENT_IP=%%i"
echo Current public IP: %CURRENT_IP%

:: ------------------------------
:: Update MongoDB Atlas allowlist if needed (using curl v2 API)
:: ------------------------------
echo Checking if IP is already in MongoDB Atlas allowlist...

powershell -NoProfile -ExecutionPolicy Bypass -File updateAtlasAllowlist.ps1 ^
  -publicKey "%ATLAS_PUBLIC_KEY%" -privateKey "%ATLAS_PRIVATE_KEY%" -groupId "%ATLAS_PROJECT_ID%" -currentIp "%CURRENT_IP%"

:: ------------------------------
:: Continue with normal operations
:: ------------------------------
echo Checking for git updates...
git pull | findstr /C:"Already up to date." >nul
if %errorlevel%==0 (
    echo No updates found.
) else (
    echo Updates pulled from git.
)

IF NOT EXIST node_modules (
    echo First-time setup: Installing dependencies...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "npm install"
)

echo Building the project...
powershell -NoProfile -ExecutionPolicy Bypass -Command "npm run build"
echo Build finished with errorlevel %ERRORLEVEL%

if ERRORLEVEL 1 (
    echo Build failed, exiting batch script.
    pause
    exit /b 1
)

echo Starting the server...
start "" http://localhost:3000

set NODE_ENV=production
powershell -NoProfile -ExecutionPolicy Bypass -Command "npm run windows"

echo Server stopped or exited.
pause

endlocal
