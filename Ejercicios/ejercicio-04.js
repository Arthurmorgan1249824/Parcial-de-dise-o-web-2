/**
 * Ejercicio 4: Objetos y Propiedades
 * Crear un objeto Producto con propiedades y funciones
 */

function Producto(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    
    this.calcularPrecioConDescuento = function(porcentaje) {
        if (porcentaje < 0 || porcentaje > 100) {
            throw new Error("El porcentaje debe estar entre 0 y 100");
        }
        return this.precio * (1 - porcentaje / 100);
    };
    
    this.verificarDisponibilidad = function(cantidad = 1) {
        return this.stock >= cantidad;
    };
    
    this.mostrarInformacion = function() {
        return `
        PRODUCTO: ${this.nombre}
        Precio: $${this.precio.toFixed(2)}
        Stock: ${this.stock} unidades
        Disponible: ${this.verificarDisponibilidad() ? 'Sí' : 'No'}
        `;
    };
}

// Ejemplos de uso
console.log("=== SISTEMA DE GESTIÓN DE PRODUCTOS ===");

const producto1 = new Producto("Laptop Gaming", 1500, 10);
const producto2 = new Producto("Mouse Inalámbrico", 25, 50);
const producto3 = new Producto("Teclado Mecánico", 80, 0);

console.log(producto1.mostrarInformacion());
console.log(`Precio con 15% de descuento: $${producto1.calcularPrecioConDescuento(15).toFixed(2)}`);
console.log(`¿Disponible para 5 unidades? ${producto1.verificarDisponibilidad(5)}`);

console.log("\n" + producto2.mostrarInformacion());
console.log(`Precio con 20% de descuento: $${producto2.calcularPrecioConDescuento(20).toFixed(2)}`);

console.log("\n" + producto3.mostrarInformacion());
console.log(`¿Disponible? ${producto3.verificarDisponibilidad()}`);

// Array de productos para gestión
const inventario = [producto1, producto2, producto3];

// Función para mostrar todo el inventario
function mostrarInventario(productos) {
    console.log("\n=== INVENTARIO COMPLETO ===");
    productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.mostrarInformacion()}`);
    });
}

mostrarInventario(inventario);
