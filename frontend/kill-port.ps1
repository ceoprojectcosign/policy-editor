$port = 5173
$targetPid = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess

if ($targetPid) {
    Write-Host "Killing process on port $port (PID: $targetPid)"
    Stop-Process -Id $targetPid -Force
} else {
    Write-Host "No process found on port $port"
}
