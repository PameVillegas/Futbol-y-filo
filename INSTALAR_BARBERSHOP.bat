@echo off
echo ========================================
echo   INSTALANDO BASE DE DATOS BARBERSHOP
echo ========================================
echo.

mysql -u root -p < database_barbershop.sql

echo.
echo ========================================
echo   BASE DE DATOS CREADA EXITOSAMENTE
echo ========================================
echo.
pause
