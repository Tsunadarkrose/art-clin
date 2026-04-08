param(
    [string]$Title = "Notificacao",
    [string]$Message = "Sua intervencao e necessaria."
)

# Method 1: WScript Shell Popup (most reliable)
try {
    $wshell = New-Object -ComObject WScript.Shell
    # 4096 = always on top, 1 = OK/Cancel buttons
    $wshell.Popup($Message, 15, $Title, 1 + 4096) | Out-Null
    Write-Host "WScript popup sent"
    exit 0
} catch {
    Write-Host "WScript failed: $_"
}

# Method 2: msg command
try {
    msg "LUCAS" $Message 2>$null
    if ($LASTEXITCODE -eq 0) { Write-Host "Msg sent"; exit 0 }
} catch {}

# Method 3: PowerShell GUI popup
try {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show($Message, $Title) | Out-Null
    Write-Host "WPF message box shown"
    exit 0
} catch {}

Write-Host "All methods failed"
exit 1
