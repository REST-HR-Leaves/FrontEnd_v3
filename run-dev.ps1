# HR Leave Management System - Development Server Launcher
# This script helps bypass PowerShell execution policy issues

# Refresh PATH to include Node.js
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Use npm.cmd directly to avoid execution policy issues
& "C:\Program Files\nodejs\npm.cmd" run dev

