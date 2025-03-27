# setup-node.ps1

# Desired Node.js version
$nodeVersion = "18.18.2"

# Check if nvm is installed
if (!(Get-Command nvm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ nvm is not installed. Please install it from https://github.com/coreybutler/nvm-windows"
    exit 1
}

# Install Node version if not already installed
$nvmList = nvm list
if ($nvmList -notmatch $nodeVersion) {
    Write-Host "⬇ Installing Node.js v$nodeVersion..."
    nvm install $nodeVersion
} else {
    Write-Host "✅ Node.js v$nodeVersion is already installed."
}

# Set as default
Write-Host "⚙ Setting Node.js v$nodeVersion as default..."
nvm use $nodeVersion
nvm alias default $nodeVersion

# Write .nvmrc
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Content -Path "$projectRoot\.nvmrc" -Value $nodeVersion -Encoding ASCII

Write-Host "💾 Saved Node version to .nvmrc"
Write-Host "✅ Done. Node.js v$nodeVersion is ready to use."
