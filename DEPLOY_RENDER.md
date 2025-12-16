# 🚀 Guía de Despliegue en Render.com - FUTBOL Y FILO

## Pasos para desplegar:

### 1. Preparar el repositorio Git
```bash
git init
git add .
git commit -m "Initial commit - FUTBOL Y FILO"
```

Sube tu código a GitHub, GitLab o Bitbucket.

### 2. Crear Base de Datos MySQL en Render

1. Ve a https://render.com y crea una cuenta
2. Click en "New +" → "MySQL"
3. Configura:
   - Name: `futbol-y-filo-db`
   - Database: `barbershop`
   - User: (se genera automáticamente)
   - Region: Elige la más cercana
4. Click "Create Database"
5. **GUARDA** los datos de conexión (Host, User, Password)

### 3. Importar la Base de Datos

1. Conecta a tu base de datos MySQL de Render usando un cliente MySQL
2. Ejecuta el archivo `database_barbershop.sql` para crear las tablas

### 4. Crear Web Service en Render

1. Click en "New +" → "Web Service"
2. Conecta tu repositorio Git
3. Configura:
   - **Name**: `futbol-y-filo`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 5. Configurar Variables de Entorno

En la sección "Environment Variables" agrega:

```
DB_HOST=tu-host-mysql.render.com
DB_USER=tu-usuario-mysql
DB_PASSWORD=tu-password-mysql
DB_NAME=barbershop
PORT=3001
```

(Usa los datos que guardaste del paso 2)

### 6. Deploy

1. Click "Create Web Service"
2. Render automáticamente desplegará tu aplicación
3. Una vez completado, tendrás una URL como: `https://futbol-y-filo.onrender.com`

## ⚠️ Notas Importantes

- El plan gratuito de Render pone la app en "sleep" después de 15 minutos de inactividad
- La primera carga después del "sleep" puede tardar 30-60 segundos
- Para mantenerla activa 24/7, necesitas un plan de pago

## 📝 Archivos Importantes

- `server_barbershop.js` - Servidor Node.js
- `index.html` - Frontend de la aplicación
- `database_barbershop.sql` - Estructura de la base de datos
- `logo.jpg` - Logo de FUTBOL Y FILO

¡Listo! Tu aplicación estará disponible en línea. 🎉
