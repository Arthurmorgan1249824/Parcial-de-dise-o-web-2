cat > Ejercicios/ejercicio-02.js << 'EOF'
/**
 * Ejercicio 2: Funciones
 * Implementar funciones para calcular el área de diferentes figuras geométricas
 */

function areaRectangulo(base, altura) {
    return base * altura;
}

function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}

function areaTriangulo(base, altura) {
    return (base * altura) / 2;
}

// Ejemplos de uso
console.log("=== CÁLCULO DE ÁREAS DE FIGURAS GEOMÉTRICAS ===");

const baseRect = 5;
const alturaRect = 3;
console.log(`Rectángulo (base: ${baseRect}, altura: ${alturaRect}): ${areaRectangulo(baseRect, alturaRect).toFixed(2)}`);

const radioCirc = 4;
console.log(`Círculo (radio: ${radioCirc}): ${areaCirculo(radioCirc).toFixed(2)}`);

const baseTri = 6;
const alturaTri = 4;
console.log(`Triángulo (base: ${baseTri}, altura: ${alturaTri}): ${areaTriangulo(baseTri, alturaTri).toFixed(2)}`);
EOF


cat > Ejercicios/ejercicio-03.js << 'EOF'
/**
 * Ejercicio 3: Arrays
 * Funciones para manipular arrays de números
 */

const numeros = [12, 5, 23, 8, 17, 34, 2, 19, 7, 25];

function encontrarMayor(arr) {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

function encontrarMenor(arr) {
    if (arr.length === 0) return null;
    return Math.min(...arr);
}

function calcularPromedio(arr) {
    if (arr.length === 0) return 0;
    const suma = arr.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    return suma / arr.length;
}

function filtrarPares(arr) {
    return arr.filter(numero => numero % 2 === 0);
}

function ordenarArray(arr) {
    return [...arr].sort((a, b) => a - b);
}

// Ejecución y demostración
console.log("=== MANIPULACIÓN DE ARRAYS ===");
console.log("Array original:", numeros);
console.log(`Número mayor: ${encontrarMayor(numeros)}`);
console.log(`Número menor: ${encontrarMenor(numeros)}`);
console.log(`Promedio: ${calcularPromedio(numeros).toFixed(2)}`);
console.log("Números pares:", filtrarPares(numeros));
console.log("Array ordenado:", ordenarArray(numeros));
EOF
cat > Ejercicios/ejercicio-04.js << 'EOF'
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

console.log(producto1.mostrarInformacion());
console.log(`Precio con 15% de descuento: $${producto1.calcularPrecioConDescuento(15).toFixed(2)}`);
console.log(`¿Disponible para 5 unidades? ${producto1.verificarDisponibilidad(5)}`);

console.log("\n" + producto2.mostrarInformacion());
console.log(`Precio con 20% de descuento: $${producto2.calcularPrecioConDescuento(20).toFixed(2)}`);
EOF
git add Ejercicios/ejercicio-02.js Ejercicios/ejercicio-03.js Ejercicios/ejercicio-04.js
