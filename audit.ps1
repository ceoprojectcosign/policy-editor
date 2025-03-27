Write-Host "`n=== AUDIT START ===`n" -ForegroundColor Cyan

# Check frontend scripts
Write-Host "Checking frontend/package.json scripts..." -ForegroundColor Yellow
Get-Content frontend/package.json | Select-String '"dev":|"build":|"preview":'

# Check backend scripts
Write-Host "`nChecking backend/package.json scripts..." -ForegroundColor Yellow
Get-Content backend/package.json | Select-String '"start":|"dev":'

# Check folder structure
Write-Host "`nProject structure overview..." -ForegroundColor Yellow
tree /f | Out-Host

# Check for localhost usage
Write-Host "`nSearching for hardcoded localhost URLs..." -ForegroundColor Yellow
Get-ChildItem -Recurse -Include *.js, *.jsx -File | Select-String "localhost" | Format-List

# Check for undefined errors
Write-Host "`nScanning for 'undefined' usage..." -ForegroundColor Yellow
Get-ChildItem -Recurse -Include *.js, *.jsx -File | Select-String "undefined" | Format-List

# Look for debug logs
Write-Host "`nSearching for console.logs..." -ForegroundColor Yellow
Get-ChildItem -Recurse -Include *.js, *.jsx -File | Select-String "console.log" | Format-List

# Check if .env is ignored
Write-Host "`nChecking .gitignore for .env..." -ForegroundColor Yellow
if ((Get-Content .gitignore) -match "\.env") {
    Write-Host ".env is correctly ignored by git." -ForegroundColor Green
}
else {
    Write-Host ".env is NOT ignored by git." -ForegroundColor Red
}

Write-Host "`n=== AUDIT COMPLETE ===" -ForegroundColor Cyan
