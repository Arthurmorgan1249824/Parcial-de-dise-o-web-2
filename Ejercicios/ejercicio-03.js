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
