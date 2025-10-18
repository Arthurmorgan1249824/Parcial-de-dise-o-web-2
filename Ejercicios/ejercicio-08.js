/**
 * Ejercicio 8: Operadores y expresiones
 * Calculadora básica con operaciones matemáticas
 */

class Calculadora {
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    
    /**
     * Realiza la suma de dos números
     * @returns {number} Resultado de la suma
     */
    sumar() {
        return this.num1 + this.num2;
    }
    
    /**
     * Realiza la resta de dos números
     * @returns {number} Resultado de la resta
     */
    restar() {
        return this.num1 - this.num2;
    }
    
    /**
     * Realiza la multiplicación de dos números
     * @returns {number} Resultado de la multiplicación
     */
    multiplicar() {
        return this.num1 * this.num2;
    }
    
    /**
     * Realiza la división de dos números
     * @returns {number|string} Resultado de la división o mensaje de error
     */
    dividir() {
        if (this.num2 === 0) {
            return "Error: No se puede dividir por cero";
        }
        return this.num1 / this.num2;
    }
    
    /**
     * Calcula el módulo de dos números
     * @returns {number|string} Resultado del módulo o mensaje de error
     */
    modulo() {
        if (this.num2 === 0) {
            return "Error: No se puede calcular módulo por cero";
        }
        return this.num1 % this.num2;
    }
    
    /**
     * Calcula el promedio de dos números
     * @returns {number} Promedio de los números
     */
    promedio() {
        return (this.num1 + this.num2) / 2;
    }
    
    /**
     * Determina la relación entre los números (mayor, menor, igual)
     * @returns {string} Descripción de la relación
     */
    comparar() {
        if (this.num1 > this.num2) {
            return `${this.num1} es mayor que ${this.num2}`;
        } else if (this.num1 < this.num2) {
            return `${this.num1} es menor que ${this.num2}`;
        } else {
            return "Ambos números son iguales";
        }
    }
    
    /**
     * Calcula la potencia (num1 elevado a num2)
     * @returns {number} Resultado de la potencia
     */
    potencia() {
        return Math.pow(this.num1, this.num2);
    }
    
    /**
     * Muestra todos los resultados de las operaciones
     */
    mostrarResultados() {
        console.log("=== CALCULADORA BÁSICA ===");
        console.log(`Números: ${this.num1} y ${this.num2}`);
        console.log("──────────────────────────");
        console.log(`Suma: ${this.num1} + ${this.num2} = ${this.sumar()}`);
        console.log(`Resta: ${this.num1} - ${this.num2} = ${this.restar()}`);
        console.log(`Multiplicación: ${this.num1} × ${this.num2} = ${this.multiplicar()}`);
        console.log(`División: ${this.num1} ÷ ${this.num2} = ${this.dividir()}`);
        console.log(`Módulo: ${this.num1} % ${this.num2} = ${this.modulo()}`);
        console.log(`Potencia: ${this.num1}^${this.num2} = ${this.potencia()}`);
        console.log(`Promedio: (${this.num1} + ${this.num2}) ÷ 2 = ${this.promedio()}`);
        console.log(`Comparación: ${this.comparar()}`);
    }
}

// Función para validar entrada de números
function validarNumeros(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
        throw new Error("Ambos valores deben ser números válidos");
    }
    return true;
}

// Ejemplos de uso
console.log("=== SISTEMA CALCULADORA ===");

// Caso 1: Números positivos
try {
    console.log("\n--- CASO 1: Números positivos ---");
    const calc1 = new Calculadora(15, 3);
    calc1.mostrarResultados();
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// Caso 2: División por cero
try {
    console.log("\n--- CASO 2: División por cero ---");
    const calc2 = new Calculadora(10, 0);
    calc2.mostrarResultados();
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// Caso 3: Números decimales
try {
    console.log("\n--- CASO 3: Números decimales ---");
    const calc3 = new Calculadora(7.5, 2.5);
    calc3.mostrarResultados();
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// Caso 4: Números iguales
try {
    console.log("\n--- CASO 4: Números iguales ---");
    const calc4 = new Calculadora(8, 8);
    calc4.mostrarResultados();
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// Caso 5: Números negativos
try {
    console.log("\n--- CASO 5: Números negativos ---");
    const calc5 = new Calculadora(-5, 3);
    calc5.mostrarResultados();
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// Función para calculadora simple sin clases
function calculadoraSimple(num1, num2, operacion) {
    switch (operacion) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : "Error: División por cero";
        case '%':
            return num2 !== 0 ? num1 % num2 : "Error: Módulo por cero";
        default:
            return "Operación no válida";
    }
}

console.log("\n=== CALCULADORA SIMPLE ===");
console.log(`5 + 3 = ${calculadoraSimple(5, 3, '+')}`);
console.log(`10 / 2 = ${calculadoraSimple(10, 2, '/')}`);
console.log(`8 / 0 = ${calculadoraSimple(8, 0, '/')}`);
console.log(`7 * 4 = ${calculadoraSimple(7, 4, '*')}`);
