/**
 * Ejercicio 9: Manejo de Arrays Complejos
 * Sistema de análisis de ventas por categoría y productos
 */

// Array de objetos que representan ventas
const ventas = [
    { id: 1, producto: "Laptop", categoria: "Tecnología", precio: 1200, cantidad: 5, fecha: "2024-01-15" },
    { id: 2, producto: "Mouse", categoria: "Tecnología", precio: 25, cantidad: 20, fecha: "2024-01-16" },
    { id: 3, producto: "Camisa", categoria: "Ropa", precio: 35, cantidad: 15, fecha: "2024-01-17" },
    { id: 4, producto: "Teclado", categoria: "Tecnología", precio: 80, cantidad: 8, fecha: "2024-01-18" },
    { id: 5, producto: "Pantalón", categoria: "Ropa", precio: 45, cantidad: 12, fecha: "2024-01-19" },
    { id: 6, producto: "Monitor", categoria: "Tecnología", precio: 300, cantidad: 3, fecha: "2024-01-20" },
    { id: 7, producto: "Zapatos", categoria: "Ropa", precio: 60, cantidad: 10, fecha: "2024-01-21" },
    { id: 8, producto: "Tablet", categoria: "Tecnología", precio: 250, cantidad: 6, fecha: "2024-01-22" },
    { id: 9, producto: "Libro JavaScript", categoria: "Educación", precio: 40, cantidad: 25, fecha: "2024-01-23" },
    { id: 10, producto: "Silla Oficina", categoria: "Muebles", precio: 150, cantidad: 4, fecha: "2024-01-24" }
];

/**
 * Calcula los totales por categoría
 * @returns {Array} Array de objetos con totales por categoría
 */
function calcularTotalesPorCategoria() {
    const categorias = {};
    
    ventas.forEach(venta => {
        const totalVenta = venta.precio * venta.cantidad;
        
        if (!categorias[venta.categoria]) {
            categorias[venta.categoria] = {
                categoria: venta.categoria,
                totalVentas: 0,
                cantidadVentas: 0,
                productosVendidos: 0
            };
        }
        
        categorias[venta.categoria].totalVentas += totalVenta;
        categorias[venta.categoria].cantidadVentas += 1;
        categorias[venta.categoria].productosVendidos += venta.cantidad;
    });
    
    return Object.values(categorias).sort((a, b) => b.totalVentas - a.totalVentas);
}

/**
 * Encuentra el producto más vendido por cantidad
 * @returns {Object} Producto más vendido
 */
function encontrarProductoMasVendido() {
    return ventas.reduce((masVendido, venta) => {
        return venta.cantidad > masVendido.cantidad ? venta : masVendido;
    }, ventas[0]);
}

/**
 * Encuentra el producto con mayor ingresos
 * @returns {Object} Producto con mayor ingresos
 */
function encontrarProductoMayorIngresos() {
    return ventas.reduce((mayorIngreso, venta) => {
        const ingresoActual = venta.precio * venta.cantidad;
        const ingresoMayor = mayorIngreso.precio * mayorIngreso.cantidad;
        return ingresoActual > ingresoMayor ? venta : mayorIngreso;
    }, ventas[0]);
}

/**
 * Calcula estadísticas generales de ventas
 * @returns {Object} Estadísticas generales
 */
function calcularEstadisticasGenerales() {
    const totalIngresos = ventas.reduce((sum, venta) => sum + (venta.precio * venta.cantidad), 0);
    const totalProductosVendidos = ventas.reduce((sum, venta) => sum + venta.cantidad, 0);
    const promedioVenta = totalIngresos / ventas.length;
    
    return {
        totalIngresos,
        totalProductosVendidos,
        totalVentas: ventas.length,
        promedioVenta,
        ventaMasAlta: Math.max(...ventas.map(v => v.precio * v.cantidad)),
        ventaMasBaja: Math.min(...ventas.map(v => v.precio * v.cantidad))
    };
}

/**
 * Obtiene ventas por rango de fechas
 * @param {string} fechaInicio - Fecha de inicio YYYY-MM-DD
 * @param {string} fechaFin - Fecha de fin YYYY-MM-DD
 * @returns {Array} Ventas en el rango de fechas
 */
function obtenerVentasPorFecha(fechaInicio, fechaFin) {
    return ventas.filter(venta => {
        return venta.fecha >= fechaInicio && venta.fecha <= fechaFin;
    });
}

// Ejecución y demostración
console.log("=== SISTEMA DE ANÁLISIS DE VENTAS ===");

// 1. Totales por categoría
console.log("\n--- TOTALES POR CATEGORÍA ---");
const totalesCategoria = calcularTotalesPorCategoria();
totalesCategoria.forEach(cat => {
    console.log(`${cat.categoria.padEnd(15)} | Ventas: $${cat.totalVentas.toFixed(2)} | Productos: ${cat.productosVendidos} | Transacciones: ${cat.cantidadVentas}`);
});

// 2. Producto más vendido
console.log("\n--- PRODUCTO MÁS VENDIDO ---");
const masVendido = encontrarProductoMasVendido();
console.log(`Producto: ${masVendido.producto}`);
console.log(`Categoría: ${masVendido.categoria}`);
console.log(`Cantidad vendida: ${masVendido.cantidad} unidades`);
console.log(`Ingresos: $${(masVendido.precio * masVendido.cantidad).toFixed(2)}`);

// 3. Producto con mayor ingresos
console.log("\n--- PRODUCTO CON MAYOR INGRESOS ---");
const mayorIngresos = encontrarProductoMayorIngresos();
console.log(`Producto: ${mayorIngresos.producto}`);
console.log(`Categoría: ${mayorIngresos.categoria}`);
console.log(`Ingresos totales: $${(mayorIngresos.precio * mayorIngresos.cantidad).toFixed(2)}`);

// 4. Estadísticas generales
console.log("\n--- ESTADÍSTICAS GENERALES ---");
const stats = calcularEstadisticasGenerales();
console.log(`Total ingresos: $${stats.totalIngresos.toFixed(2)}`);
console.log(`Total productos vendidos: ${stats.totalProductosVendidos}`);
console.log(`Total transacciones: ${stats.totalVentas}`);
console.log(`Promedio por venta: $${stats.promedioVenta.toFixed(2)}`);
console.log(`Venta más alta: $${stats.ventaMasAlta.toFixed(2)}`);
console.log(`Venta más baja: $${stats.ventaMasBaja.toFixed(2)}`);

// 5. Ventas por fecha
console.log("\n--- VENTAS POR FECHA (2024-01-18 a 2024-01-22) ---");
const ventasFechas = obtenerVentasPorFecha("2024-01-18", "2024-01-22");
ventasFechas.forEach(venta => {
    console.log(`${venta.fecha} | ${venta.producto.padEnd(20)} | $${(venta.precio * venta.cantidad).toFixed(2)}`);
});

// 6. Top 5 productos por ingresos
console.log("\n--- TOP 5 PRODUCTOS POR INGRESOS ---");
const topProductos = [...ventas]
    .sort((a, b) => (b.precio * b.cantidad) - (a.precio * a.cantidad))
    .slice(0, 5);

topProductos.forEach((producto, index) => {
    const ingreso = producto.precio * producto.cantidad;
    console.log(`${index + 1}. ${producto.producto.padEnd(20)} | $${ingreso.toFixed(2)} | ${producto.cantidad} unidades`);
});

// 7. Productos por categoría
console.log("\n--- PRODUCTOS POR CATEGORÍA ---");
const productosPorCategoria = ventas.reduce((acc, venta) => {
    if (!acc[venta.categoria]) {
        acc[venta.categoria] = [];
    }
    acc[venta.categoria].push(venta);
    return acc;
}, {});

Object.entries(productosPorCategoria).forEach(([categoria, productos]) => {
    console.log(`\n${categoria}:`);
    productos.forEach(producto => {
        console.log(`  - ${producto.producto}: ${producto.cantidad} unidades`);
    });
});
