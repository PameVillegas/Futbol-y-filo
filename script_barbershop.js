const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api' 
    : '/api';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
    cargarServicios();
    cargarTurnos();
    
    // Establecer fecha de hoy por defecto
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('filtroFecha').value = hoy;
    document.getElementById('turnoFecha').value = hoy;
});

// Navegación entre secciones
function mostrarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(seccionId).classList.add('active');
    
    // Activar el botón correspondiente
    const tabs = document.querySelectorAll('.tab-btn');
    if (seccionId === 'agenda') tabs[0].classList.add('active');
    if (seccionId === 'nuevo-turno') tabs[1].classList.add('active');
    if (seccionId === 'clientes') tabs[2].classList.add('active');
    
    if (seccionId === 'clientes') {
        cargarListaClientes();
    }
}

// CLIENTES
async function cargarClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        const clientes = await response.json();
        
        const select = document.getElementById('clienteSelect');
        select.innerHTML = '<option value="">Seleccionar cliente...</option>';
        
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} - ${cliente.telefono}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando clientes:', error);
    }
}

async function cargarListaClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        const clientes = await response.json();
        
        const lista = document.getElementById('listaClientes');
        lista.innerHTML = '';
        
        clientes.forEach(cliente => {
            const card = document.createElement('div');
            card.className = 'cliente-card';
            card.innerHTML = `
                <h3>${cliente.nombre}</h3>
                <p>📞 ${cliente.telefono}</p>
                <p>📧 ${cliente.email || 'Sin email'}</p>
                <p style="font-size: 0.9em; color: #95a5a6;">
                    Registrado: ${new Date(cliente.fecha_registro).toLocaleDateString()}
                </p>
            `;
            lista.appendChild(card);
        });
    } catch (error) {
        console.error('Error cargando lista de clientes:', error);
    }
}

function mostrarFormCliente() {
    document.getElementById('formNuevoCliente').style.display = 'block';
}

function cancelarFormCliente() {
    document.getElementById('formNuevoCliente').style.display = 'none';
    document.getElementById('nuevoClienteNombre').value = '';
    document.getElementById('nuevoClienteTelefono').value = '';
    document.getElementById('nuevoClienteEmail').value = '';
}

async function guardarCliente() {
    const nombre = document.getElementById('nuevoClienteNombre').value;
    const telefono = document.getElementById('nuevoClienteTelefono').value;
    const email = document.getElementById('nuevoClienteEmail').value;
    
    if (!nombre || !telefono) {
        alert('Nombre y teléfono son obligatorios');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            mostrarMensaje('Cliente guardado exitosamente', 'exito');
            cancelarFormCliente();
            await cargarClientes();
            await cargarListaClientes();
        } else {
            mostrarMensaje('Error al guardar cliente: ' + (data.error || 'Error desconocido'), 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error de conexión: ' + error.message, 'error');
    }
}

// SERVICIOS
async function cargarServicios() {
    try {
        const response = await fetch(`${API_URL}/servicios`);
        const servicios = await response.json();
        
        const select = document.getElementById('servicioSelect');
        select.innerHTML = '<option value="">Seleccionar servicio...</option>';
        
        servicios.forEach(servicio => {
            const option = document.createElement('option');
            option.value = servicio.id;
            option.textContent = `${servicio.nombre} - $${servicio.precio} (${servicio.duracion} min)`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando servicios:', error);
    }
}

// TURNOS
async function cargarTurnos() {
    try {
        const response = await fetch(`${API_URL}/turnos`);
        const turnos = await response.json();
        mostrarTurnos(turnos);
    } catch (error) {
        console.error('Error cargando turnos:', error);
    }
}

async function cargarTurnosPorFecha() {
    const fecha = document.getElementById('filtroFecha').value;
    if (!fecha) return;
    
    try {
        const response = await fetch(`${API_URL}/turnos/fecha/${fecha}`);
        const turnos = await response.json();
        mostrarTurnos(turnos);
    } catch (error) {
        console.error('Error cargando turnos:', error);
    }
}

function mostrarTurnos(turnos) {
    const lista = document.getElementById('listaTurnos');
    lista.innerHTML = '';
    
    if (turnos.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#95a5a6; padding:40px;">No hay turnos para mostrar</p>';
        return;
    }
    
    turnos.forEach(turno => {
        const card = document.createElement('div');
        card.className = 'turno-card';
        card.innerHTML = `
            <div class="turno-header">
                <div class="turno-cliente">${turno.cliente_nombre}</div>
                <span class="turno-estado estado-${turno.estado}">${turno.estado.toUpperCase()}</span>
            </div>
            <div class="turno-info">
                <div class="info-item">
                    <strong>📅 Fecha:</strong> ${new Date(turno.fecha).toLocaleDateString()}
                </div>
                <div class="info-item">
                    <strong>🕐 Hora:</strong> ${turno.hora}
                </div>
                <div class="info-item">
                    <strong>✂️ Servicio:</strong> ${turno.servicio_nombre}
                </div>
                <div class="info-item">
                    <strong>⏱️ Duración:</strong> ${turno.duracion} min
                </div>
                <div class="info-item">
                    <strong>💰 Precio:</strong> $${turno.precio}
                </div>
                <div class="info-item">
                    <strong>📞 Teléfono:</strong> ${turno.telefono}
                </div>
            </div>
            ${turno.observaciones ? `<p><strong>Observaciones:</strong> ${turno.observaciones}</p>` : ''}
            <div class="turno-acciones">
                ${turno.estado === 'pendiente' ? `<button class="btn btn-confirmar" onclick="cambiarEstado(${turno.id}, 'confirmado')">Confirmar</button>` : ''}
                ${turno.estado === 'confirmado' ? `<button class="btn btn-completar" onclick="cambiarEstado(${turno.id}, 'completado')">Completar</button>` : ''}
                ${turno.estado !== 'cancelado' && turno.estado !== 'completado' ? `<button class="btn btn-cancelar" onclick="cambiarEstado(${turno.id}, 'cancelado')">Cancelar</button>` : ''}
                <button class="btn btn-eliminar" onclick="eliminarTurno(${turno.id})">Eliminar</button>
            </div>
        `;
        lista.appendChild(card);
    });
}

async function guardarTurno(event) {
    event.preventDefault();
    
    const turno = {
        cliente_id: document.getElementById('clienteSelect').value,
        servicio_id: document.getElementById('servicioSelect').value,
        fecha: document.getElementById('turnoFecha').value,
        hora: document.getElementById('turnoHora').value,
        observaciones: document.getElementById('turnoObservaciones').value
    };
    
    try {
        const response = await fetch(`${API_URL}/turnos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(turno)
        });
        
        if (response.ok) {
            mostrarMensaje('Turno guardado exitosamente', 'exito');
            document.getElementById('formTurno').reset();
            cargarTurnos();
            mostrarSeccion('agenda');
        } else {
            mostrarMensaje('Error al guardar turno', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error de conexión', 'error');
    }
}

async function cambiarEstado(id, estado) {
    try {
        const response = await fetch(`${API_URL}/turnos/${id}/estado`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado })
        });
        
        if (response.ok) {
            cargarTurnos();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function eliminarTurno(id) {
    if (!confirm('¿Estás seguro de eliminar este turno?')) return;
    
    try {
        const response = await fetch(`${API_URL}/turnos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            mostrarMensaje('Turno eliminado', 'exito');
            cargarTurnos();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje mensaje-${tipo}`;
    mensaje.textContent = texto;
    
    const seccionActiva = document.querySelector('.seccion.active');
    seccionActiva.insertBefore(mensaje, seccionActiva.firstChild);
    
    setTimeout(() => mensaje.remove(), 3000);
}
