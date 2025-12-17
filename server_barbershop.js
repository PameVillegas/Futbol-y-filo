const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'barbershop'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL - FUTBOL Y FILO');
});

// RUTAS - CLIENTES
app.get('/api/clientes', (req, res) => {
    db.query('SELECT * FROM clientes ORDER BY nombre', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/clientes', (req, res) => {
    const { nombre, telefono, email } = req.body;
    db.query('INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)',
        [nombre, telefono, email],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, mensaje: 'Cliente creado' });
        });
});

// RUTAS - SERVICIOS
app.get('/api/servicios', (req, res) => {
    db.query('SELECT * FROM servicios WHERE activo = TRUE', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// RUTAS - TURNOS
app.get('/api/turnos', (req, res) => {
    const query = `
        SELECT t.*, c.nombre as cliente_nombre, c.telefono, 
               s.nombre as servicio_nombre, s.duracion, s.precio
        FROM turnos t
        JOIN clientes c ON t.cliente_id = c.id
        JOIN servicios s ON t.servicio_id = s.id
        ORDER BY t.fecha DESC, t.hora DESC
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/turnos/fecha/:fecha', (req, res) => {
    const { fecha } = req.params;
    const query = `
        SELECT t.*, c.nombre as cliente_nombre, c.telefono,
               s.nombre as servicio_nombre, s.duracion
        FROM turnos t
        JOIN clientes c ON t.cliente_id = c.id
        JOIN servicios s ON t.servicio_id = s.id
        WHERE t.fecha = ? AND t.estado != 'cancelado'
        ORDER BY t.hora
    `;
    db.query(query, [fecha], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/turnos', (req, res) => {
    const { cliente_id, servicio_id, fecha, hora, observaciones } = req.body;
    db.query(
        'INSERT INTO turnos (cliente_id, servicio_id, fecha, hora, observaciones) VALUES (?, ?, ?, ?, ?)',
        [cliente_id, servicio_id, fecha, hora, observaciones],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, mensaje: 'Turno creado' });
        });
});

app.put('/api/turnos/:id/estado', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    db.query('UPDATE turnos SET estado = ? WHERE id = ?', [estado, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Estado actualizado' });
    });
});

app.delete('/api/turnos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM turnos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Turno eliminado' });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor FUTBOL Y FILO corriendo en puerto ${PORT}`);
});
