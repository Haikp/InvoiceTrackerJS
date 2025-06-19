:: Windows Exclusive
@echo off
:: Set your project path below (adjust this)
set PROJECT_DIR=E:\Development\Projects\InvoiceTrackerJS

cd /d "%PROJECT_DIR%"

echo Checking for updates...
git pull > temp_git_output.txt
findstr /C:"Already up to date." temp_git_output.txt >nul
if %errorlevel%==0 (
    echo No updates found.
) else (
    echo Updates pulled from git.
    echo Running fresh build...
    npm run build
)
del temp_git_output.txt

IF NOT EXIST node_modules (
    echo First-time setup: Installing dependencies...
    npm install
)

echo Building the project...
npm run build

echo Starting the server...
npm run start &
timeout /t 2 >nul
start "" http://localhost:3000