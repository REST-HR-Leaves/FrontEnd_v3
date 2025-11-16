@echo off
title HR Leave Management System - Dev Server
color 0A
echo ========================================
echo   HR Leave Management System
echo   Development Server
echo ========================================
echo.
echo Starting server...
echo.
echo When you see "Local: http://localhost:8080/"
echo Open that URL in your browser!
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

"C:\Program Files\nodejs\npm.cmd" run dev

pause

