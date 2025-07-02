@echo off
setlocal

set "PROJECT_DIR=E:\Development\ExportTools\InvoiceTrackerJS"
cd /d "%PROJECT_DIR%"
echo Current directory: %CD%

:: Atlas API credentials
set "ATLAS_PUBLIC_KEY=your_public_key_here"
set "ATLAS_PRIVATE_KEY=your_private_key_here"
set "ATLAS_PROJECT_ID=your_project_id_here"

echo Checking current public IP...
for /f "delims=" %%i in ('powershell -Command "(Invoke-RestMethod -Uri 'https://api.ipify.org?format=json').ip"') do set "CURRENT_IP=%%i"
echo Current public IP: %CURRENT_IP%

echo Checking if IP is already in MongoDB Atlas allowlist...

powershell -NoProfile -Command ^
  "$ErrorActionPreference = 'Stop';" ^
  " $publicKey = '%ATLAS_PUBLIC_KEY%';" ^
  " $privateKey = '%ATLAS_PRIVATE_KEY%';" ^
  " $groupId = '%ATLAS_PROJECT_ID%';" ^
  " $currentIp = '%CURRENT_IP%';" ^
  " $base64Auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(\"$publicKey`:$privateKey\"));" ^
  " $uri = \"https://cloud.mongodb.com/api/atlas/v1.0/groups/$groupId/accessList\";" ^
  " $headers = @{ Authorization = \"Basic $base64Auth\" };" ^
  " $allowlist = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get;" ^
  " if ($allowlist.results.ipAddress -contains $currentIp) {" ^
  "   Write-Output 'IP already in allowlist. Skipping update.';" ^
  " } else {" ^
  "   Write-Output 'IP not found, adding to allowlist...';" ^
  "   $body = @([pscustomobject]@{ ipAddress = $currentIp; comment = 'Auto-updated IP' }) | ConvertTo-Json;" ^
  "   Invoke-RestMethod -Uri $uri -Headers $headers -Method Post -Body $body -ContentType 'application/json';" ^
  "   Write-Output 'IP added successfully.';" ^
  " }"

:: continue with your original batch file stuff

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
