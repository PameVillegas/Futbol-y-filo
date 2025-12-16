# 🪒 BarberShop - Sistema de Agenda de Peluquería

Sistema completo para gestionar turnos de peluquería con MySQL, Node.js y HTML.

## 📋 Características

- ✅ Gestión de clientes
- ✅ Gestión de turnos (crear, confirmar, completar, cancelar)
- ✅ Múltiples servicios (corte, barba, tintura, etc.)
- ✅ Filtrado por fecha
- ✅ Estados de turnos (pendiente, confirmado, completado, cancelado)
- ✅ Interfaz moderna y responsive

## 🚀 Instalación

### 1. Instalar la base de datos
Ejecuta: `INSTALAR_BARBERSHOP.bat`
(Te pedirá la contraseña de MySQL)

### 2. Iniciar el servidor
Ejecuta: `INICIAR_BARBERSHOP.bat`

### 3. Abrir la aplicación
Abre en tu navegador: `index.html`
O visita: `http://localhost:3001`

## 📁 Archivos

- `index.html` - Interfaz principal
- `styles_barbershop.css` - Estilos
- `script_barbershop.js` - Lógica del frontend
- `server_barbershop.js` - Servidor Node.js
- `database_barbershop.sql` - Base de datos MySQL

## 💡 Uso

1. **Clientes**: Agrega clientes con nombre, teléfono y email
2. **Nuevo Turno**: Selecciona cliente, servicio, fecha y hora
3. **Agenda**: Visualiza todos los turnos y cambia sus estados

## 🔧 Configuración

El servidor usa el puerto 3001 por defecto.
La base de datos se llama `barbershop`.

## 📞 Servicios Incluidos

- Corte de Cabello - $5000 (30 min)
- Corte + Barba - $7000 (45 min)
- Barba - $3000 (20 min)
- Tintura - $8000 (60 min)
- Peinado - $6000 (40 min)
