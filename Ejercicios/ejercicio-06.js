/**
 * Ejercicio 6: Programación Estructurada
 * Tablas de multiplicar y números primos
 */

function generarTablaMultiplicar(numero, limite = 10) {
    console.log(`\n=== TABLA DE MULTIPLICAR DEL ${numero} ===`);
    
    if (numero < 1 || limite < 1) {
        console.log("Error: El número y el límite deben ser mayores a 0");
        return;
    }
    
    for (let i = 1; i <= limite; i++) {
        const resultado = numero * i;
        console.log(`${numero} × ${i} = ${resultado}`);
    }
}

function esPrimo(numero) {
    if (numero <= 1) return false;
    if (numero <= 3) return true;
    if (numero % 2 === 0 || numero % 3 === 0) return false;
    
    for (let i = 5; i * i <= numero; i += 6) {
        if (numero % i === 0 || numero % (i + 2) === 0) return false;
    }
    return true;
}

function generarNumerosPrimos(limite) {
    const primos = [];
    
    if (limite < 2) {
        console.log("No hay números primos menores a 2");
        return primos;
    }
    
    for (let i = 2; i <= limite; i++) {
        if (esPrimo(i)) {
            primos.push(i);
        }
    }
    
    return primos;
}

function mostrarInformacionPrimos(limite) {
    const primos = generarNumerosPrimos(limite);
    
    console.log(`\n=== NÚMEROS PRIMOS HASTA ${limite} ===`);
    console.log(`Cantidad encontrada: ${primos.length}`);
    console.log(`Números primos: ${primos.join(', ')}`);
    
    if (primos.length > 0) {
        console.log(`Primer primo: ${primos[0]}`);
        console.log(`Último primo: ${primos[primos.length - 1]}`);
        console.log(`Suma de todos: ${primos.reduce((a, b) => a + b, 0)}`);
    }
}

// Ejecución de las funciones
console.log("=== PROGRAMA DE MATEMÁTICAS ESTRUCTURADAS ===");

// Generar tablas de multiplicar
console.log("\n--- TABLAS DE MULTIPLICAR ---");
generarTablaMultiplicar(5);
generarTablaMultiplicar(7, 15);
generarTablaMultiplicar(12, 5);

// Generar números primos
console.log("\n--- NÚMEROS PRIMOS ---");
mostrarInformacionPrimos(30);
mostrarInformacionPrimos(50);
mostrarInformacionPrimos(100);

// Función adicional: tabla de multiplicar completa
function mostrarTodasTablas(hastaNumero, limite = 10) {
    console.log(`\n=== TODAS LAS TABLAS DEL 1 AL ${hastaNumero} ===`);
    
    for (let i = 1; i <= hastaNumero; i++) {
        generarTablaMultiplicar(i, limite);
    }
}

// Función adicional: verificar número específico
function analizarNumero(numero) {
    console.log(`\n=== ANÁLISIS DEL NÚMERO ${numero} ===`);
    console.log(`¿Es primo? ${esPrimo(numero) ? 'Sí' : 'No'}`);
    console.log(`Tabla de multiplicar:`);
    generarTablaMultiplicar(numero, 5);
}

// Ejemplos adicionales
mostrarTodasTablas(3, 5);
analizarNumero(17);
analizarNumero(25);
