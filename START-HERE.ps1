# Copy and paste this ENTIRE block into your PowerShell terminal:

# Step 1: Refresh PATH to include Node.js
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Step 2: Set alias to use npm.cmd (avoids execution policy issues)
Set-Alias -Name npm -Value "C:\Program Files\nodejs\npm.cmd" -Scope Global -Force

# Step 3: Verify npm works
Write-Host "Testing npm..." -ForegroundColor Green
npm --version

# Step 4: Start the development server
Write-Host "`nStarting development server..." -ForegroundColor Green
Write-Host "Open http://localhost:8080/ in your browser when ready!`n" -ForegroundColor Yellow
npm run dev

