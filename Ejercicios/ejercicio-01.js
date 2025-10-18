/**
 * Ejercicio 1: Variables y Tipos de Datos
 * Programa que declara variables para almacenar información de un estudiante
 * y muestra un mensaje personalizado según su estado académico.
 */

// Declaración de variables para un estudiante
const nombre = "Ana García";
let edad = 20;
const promedio = 8.5;
const semestre = 4;

// Determinar estado académico basado en el promedio
let estadoAcademico;
if (promedio >= 9.0) {
    estadoAcademico = "Excelente";
} else if (promedio >= 8.0) {
    estadoAcademico = "Muy Bueno";
} else if (promedio >= 7.0) {
    estadoAcademico = "Bueno";
} else if (promedio >= 6.0) {
    estadoAcademico = "Suficiente";
} else {
    estadoAcademico = "Necesita mejorar";
}

// Mostrar información del estudiante
console.log("=== INFORMACIÓN DEL ESTUDIANTE ===");
console.log(`Nombre: ${nombre}`);
console.log(`Edad: ${edad} años`);
console.log(`Promedio: ${promedio}`);
console.log(`Semestre: ${semestre}`);
console.log(`Estado Académico: ${estadoAcademico}`);
console.log("===================================");

// Mensaje personalizado según el estado académico
console.log(`\nMensaje para ${nombre}:`);
if (estadoAcademico === "Excelente") {
    console.log("¡Felicidades! Tu desempeño es excepcional. Sigue así.");
} else if (estadoAcademico === "Muy Bueno") {
    console.log("Excelente trabajo, estás en un muy buen nivel académico.");
} else if (estadoAcademico === "Bueno") {
    console.log("Buen trabajo, pero aún puedes mejorar un poco más.");
} else if (estadoAcademico === "Suficiente") {
    console.log("Has aprobado, pero necesitas esforzarte más en tus estudios.");
} else {
    console.log("Es importante que busques ayuda académica para mejorar tu rendimiento.");
}
