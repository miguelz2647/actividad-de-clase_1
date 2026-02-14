/**
 * STOCKPRO - Sistema de Gestión de Inventarios
 * Lógica funcional con persistencia en LocalStorage
 */

class InventarioApp {
    constructor() {
        // Inicialización de datos desde LocalStorage o arreglos vacíos
        this.productos = JSON.parse(localStorage.getItem('productos')) || [];
        this.movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
        this.userRole = 'admin'; // Simulación de rol: 'admin' o 'empleado'

        // Elementos del DOM
        this.formProducto = document.getElementById('formProducto');
        this.formMovimiento = document.getElementById('formMovimiento');
        this.tablaProductos = document.getElementById('tablaProductos');
        this.tablaBajoStock = document.getElementById('tablaBajoStock');
        this.tablaMasMovimientos = document.getElementById('tablaMasMovimientos');
        this.selectProducto = document.getElementById('productoSelect');
        this.graficoStock = document.getElementById('graficoStock');

        this.init();
    }

    init() {
        // Event Listeners
        this.formProducto.addEventListener('submit', (e) => this.guardarProducto(e));
        this.formMovimiento.addEventListener('submit', (e) => this.registrarMovimiento(e));
        
        // Renderizado inicial
        this.renderTodo();
        this.aplicarRestriccionesRol();
    }

    // --- LÓGICA DE PRODUCTOS (CRUD) ---

    guardarProducto(e) {
        e.preventDefault();
        const id = document.getElementById('id').value;
        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const categoria = document.getElementById('categoria').value;
        const stock = parseInt(document.getElementById('stock').value);

        const index = this.productos.findIndex(p => p.id === id);

        if (index > -1) {
            // Editar si existe
            this.productos[index] = { id, nombre, precio, categoria, stock };
            this.mostrarAlerta('Producto actualizado con éxito', 'info');
        } else {
            // Crear nuevo
            this.productos.push({ id, nombre, precio, categoria, stock });
            this.mostrarAlerta('Producto registrado correctamente', 'success');
        }

        this.actualizarLocalStorage();
        this.renderTodo();
        this.formProducto.reset();
    }

    eliminarProducto(id) {
        if (this.userRole !== 'admin') return;
        if (confirm('¿Está seguro de eliminar este producto?')) {
            this.productos = this.productos.filter(p => p.id !== id);
            this.actualizarLocalStorage();
            this.renderTodo();
        }
    }

    // --- LÓGICA DE MOVIMIENTOS ---

    registrarMovimiento(e) {
        e.preventDefault();
        const idProd = this.selectProducto.value;
        const tipo = document.getElementById('tipoMovimiento').value;
        const cantidad = parseInt(document.getElementById('cantidadMovimiento').value);
        
        const producto = this.productos.find(p => p.id === idProd);

        if (tipo === 'salida' && producto.stock < cantidad) {
            this.mostrarAlerta('Error: Stock insuficiente para la salida', 'danger');
            return;
        }

        // Actualizar stock del producto
        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else {
            producto.stock -= cantidad;
        }

        // Registrar historial
        const nuevoMovimiento = {
            idProd,
            nombreProd: producto.nombre,
            tipo,
            cantidad,
            fecha: new Date().toLocaleString()
        };

        this.movimientos.push(nuevoMovimiento);
        this.actualizarLocalStorage();
        this.renderTodo();
        this.formMovimiento.reset();
        this.mostrarAlerta('Movimiento registrado', 'success');
    }

    // --- RENDERIZADO DE INTERFAZ ---

    renderTodo() {
        this.renderTablaPrincipal();
        this.renderSelectProductos();
        this.renderBajoStock();
        this.renderGrafico();
        this.renderMasMovimientos();
    }

    renderTablaPrincipal() {
        let html = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>`;

        this.productos.forEach(p => {
            html += `
                <tr>
                    <td>#${p.id}</td>
                    <td><strong>${p.nombre}</strong></td>
                    <td><span class="badge bg-secondary">${p.categoria}</span></td>
                    <td>$${p.precio.toFixed(2)}</td>
                    <td><span class="fw-bold ${p.stock < 5 ? 'text-danger' : 'text-success'}">${p.stock}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-info me-1" onclick="app.prepararEdicion('${p.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        ${this.userRole === 'admin' ? `
                        <button class="btn btn-sm btn-outline-danger" onclick="app.eliminarProducto('${p.id}')">
                            <i class="bi bi-trash"></i>
                        </button>` : ''}
                    </td>
                </tr>`;
        });

        this.tablaProductos.innerHTML = html + `</tbody>`;
    }

    renderSelectProductos() {
        this.selectProducto.innerHTML = this.productos.map(p => 
            `<option value="${p.id}">${p.nombre} (Stock: ${p.stock})</option>`
        ).join('');
    }

    renderBajoStock() {
        const criticos = this.productos.filter(p => p.stock < 10);
        this.tablaBajoStock.innerHTML = criticos.map(p => `
            <tr>
                <td class="ps-3">${p.nombre}</td>
                <td class="text-end pe-3"><span class="badge bg-danger">${p.stock} unid.</span></td>
            </tr>
        `).join('') || '<tr><td class="text-center p-3 text-muted">No hay stock bajo</td></tr>';
    }

renderMasMovimientos() {
    this.tablaMasMovimientos.innerHTML = '';

    if (!this.movimientos || this.movimientos.length === 0) return;

    const conteo = {};

    // 1. Obtenemos una lista de los IDs de productos que existen actualmente
    const idsExistentes = this.productos.map(p => p.id);

    this.movimientos.forEach(m => {
        // 2. SOLO contamos el movimiento si el producto todavía existe en el inventario
        if (idsExistentes.includes(m.idProd)) {
            conteo[m.nombreProd] = (conteo[m.nombreProd] || 0) + 1;
        }
    });

    const sorted = Object.entries(conteo)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    if (sorted.length === 0) return;

    this.tablaMasMovimientos.innerHTML = sorted.map(([nombre, total]) => `
        <tr>
            <td class="ps-3 py-2">${nombre}</td>
            <td class="text-end pe-3">
                <span class="badge bg-info text-dark">${total} movs.</span>
            </td>
        </tr>
    `).join('');
}

    renderGrafico() {
        this.graficoStock.innerHTML = '';
        const maxStock = Math.max(...this.productos.map(p => p.stock), 1);
        
        this.productos.slice(0, 8).forEach(p => {
            const altura = (p.stock / maxStock) * 150; // Max 150px
            const bar = document.createElement('div');
            bar.className = 'bar-item';
            bar.style.height = `${altura}px`;
            bar.title = `${p.nombre}: ${p.stock}`;
            this.graficoStock.appendChild(bar);
        });
    }

    // --- UTILIDADES ---

    prepararEdicion(id) {
        const p = this.productos.find(prod => prod.id === id);
        if (p) {
            document.getElementById('id').value = p.id;
            document.getElementById('nombre').value = p.nombre;
            document.getElementById('precio').value = p.precio;
            document.getElementById('categoria').value = p.categoria;
            document.getElementById('stock').value = p.stock;
            window.scrollTo(0, 0);
        }
    }

    aplicarRestriccionesRol() {
        if (this.userRole === 'empleado') {
            // El empleado no puede ver el ID para evitar ediciones o cambios estructurales
            // Ocultamos el botón de eliminar mediante el render dinámico anterior.
            console.log("Modo Empleado: Funciones de eliminación deshabilitadas.");
        }
    }

    mostrarAlerta(msj, tipo) {
        const alerta = document.getElementById('alertGlobal');
        alerta.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${msj}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>`;
        setTimeout(() => alerta.innerHTML = '', 3000);
    }

    actualizarLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
        localStorage.setItem('movimientos', JSON.stringify(this.movimientos));
    }
}

// Inicializar la aplicación
const app = new InventarioApp();