-- Base de datos para Agenda de Peluquería
CREATE DATABASE IF NOT EXISTS barbershop;
USE barbershop;

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion INT NOT NULL COMMENT 'Duración en minutos',
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('pendiente', 'confirmado', 'completado', 'cancelado') DEFAULT 'pendiente',
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);

-- Insertar servicios iniciales
INSERT INTO servicios (nombre, descripcion, duracion, precio) VALUES
('Corte de Cabello', 'Corte de cabello clásico', 30, 5000),
('Corte + Barba', 'Corte de cabello y arreglo de barba', 45, 7000),
('Barba', 'Arreglo y perfilado de barba', 20, 3000),
('Tintura', 'Tintura de cabello', 60, 8000),
('Peinado', 'Peinado para eventos', 40, 6000);

-- Insertar clientes de ejemplo
INSERT INTO clientes (nombre, telefono, email) VALUES
('Juan Pérez', '1234567890', 'juan@email.com'),
('María García', '0987654321', 'maria@email.com');
