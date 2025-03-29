@echo off
set PORT=4000

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%PORT%') do (
    set PID=%%a
)

if defined PID (
    echo Port %PORT% is in use by PID %PID%. Killing...
    taskkill /F /PID %PID%
    echo Killed process %PID%
) else (
    echo Port %PORT% is free.
)

echo Starting backend server...
npm start
