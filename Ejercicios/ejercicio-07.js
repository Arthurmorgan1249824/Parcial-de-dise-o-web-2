/**
 * Ejercicio 7: Programación Funcional
 * Transformación de arrays de estudiantes usando map/filter/reduce
 */

const estudiantes = [
    { nombre: "Ana", promedio: 8.5, edad: 20, carrera: "Ingeniería" },
    { nombre: "Luis", promedio: 6.2, edad: 22, carrera: "Medicina" },
    { nombre: "María", promedio: 9.1, edad: 19, carrera: "Derecho" },
    { nombre: "Carlos", promedio: 5.8, edad: 21, carrera: "Administración" },
    { nombre: "Elena", promedio: 7.9, edad: 20, carrera: "Psicología" },
    { nombre: "Pedro", promedio: 8.8, edad: 23, carrera: "Ingeniería" },
    { nombre: "Sofia", promedio: 4.5, edad: 19, carrera: "Arquitectura" },
    { nombre: "Javier", promedio: 7.2, edad: 22, carrera: "Medicina" }
];

/**
 * Transforma el array de estudiantes agregando propiedad "estado" basada en promedio
 */
const estudiantesConEstado = estudiantes.map(estudiante => ({
    ...estudiante,
    estado: estudiante.promedio >= 7.0 ? "Aprobado" : "Reprobado",
    nivel: estudiante.promedio >= 9 ? "Excelente" : 
           estudiante.promedio >= 8 ? "Muy Bueno" :
           estudiante.promedio >= 7 ? "Bueno" : "Necesita Mejorar"
}));

/**
 * Filtra estudiantes aprobados
 */
const estudiantesAprobados = estudiantesConEstado.filter(est => est.estado === "Aprobado");

/**
 * Filtra estudiantes reprobados
 */
const estudiantesReprobados = estudiantesConEstado.filter(est => est.estado === "Reprobado");

/**
 * Calcula el promedio general de todos los estudiantes
 */
const promedioGeneral = estudiantes.reduce((acumulador, estudiante) => 
    acumulador + estudiante.promedio, 0) / estudiantes.length;

/**
 * Agrupa estudiantes por carrera
 */
const estudiantesPorCarrera = estudiantesConEstado.reduce((acumulador, estudiante) => {
    const carrera = estudiante.carrera;
    if (!acumulador[carrera]) {
        acumulador[carrera] = [];
    }
    acumulador[carrera].push(estudiante);
    return acumulador;
}, {});

/**
 * Encuentra el estudiante con el promedio más alto
 */
const mejorEstudiante = estudiantesConEstado.reduce((mejor, actual) => 
    actual.promedio > mejor.promedio ? actual : mejor
);

/**
 * Calcula estadísticas por carrera
 */
const estadisticasPorCarrera = Object.entries(estudiantesPorCarrera).map(([carrera, estudiantes]) => {
    const promedios = estudiantes.map(est => est.promedio);
    const promedioCarrera = promedios.reduce((a, b) => a + b, 0) / promedios.length;
    const aprobados = estudiantes.filter(est => est.estado === "Aprobado").length;
    
    return {
        carrera,
        cantidad: estudiantes.length,
        promedio: promedioCarrera,
        aprobados,
        tasaAprobacion: (aprobados / estudiantes.length) * 100
    };
});

// Mostrar resultados
console.log("=== PROGRAMACIÓN FUNCIONAL CON ESTUDIANTES ===");

console.log("\n--- TODOS LOS ESTUDIANTES CON ESTADO ---");
estudiantesConEstado.forEach(est => {
    console.log(`${est.nombre.padEnd(10)} | Prom: ${est.promedio.toFixed(1)} | Estado: ${est.estado.padEnd(9)} | Nivel: ${est.nivel}`);
});

console.log(`\n--- ESTADÍSTICAS GENERALES ---`);
console.log(`Total estudiantes: ${estudiantes.length}`);
console.log(`Promedio general: ${promedioGeneral.toFixed(2)}`);
console.log(`Aprobados: ${estudiantesAprobados.length}`);
console.log(`Reprobados: ${estudiantesReprobados.length}`);
console.log(`Tasa de aprobación: ${((estudiantesAprobados.length / estudiantes.length) * 100).toFixed(1)}%`);

console.log(`\n--- MEJOR ESTUDIANTE ---`);
console.log(`${mejorEstudiante.nombre} - Promedio: ${mejorEstudiante.promedio} - Carrera: ${mejorEstudiante.carrera}`);

console.log(`\n--- ESTADÍSTICAS POR CARRERA ---`);
estadisticasPorCarrera.forEach(stat => {
    console.log(`${stat.carrera.padEnd(15)} | Estud: ${stat.cantidad} | Prom: ${stat.promedio.toFixed(2)} | Aprob: ${stat.tasaAprobacion.toFixed(1)}%`);
});

// Funciones adicionales de programación funcional
console.log(`\n--- FUNCIONES ADICIONALES ---`);

// Estudiantes con promedio mayor a 8
const excelentes = estudiantesConEstado.filter(est => est.promedio > 8);
console.log(`Estudiantes con promedio > 8: ${excelentes.map(est => est.nombre).join(', ')}`);

// Nombres de todos los estudiantes en mayúsculas
const nombresMayusculas = estudiantes.map(est => est.nombre.toUpperCase());
console.log(`Nombres en mayúsculas: ${nombresMayusculas.join(', ')}`);

// Suma de todas las edades
const sumaEdades = estudiantes.reduce((sum, est) => sum + est.edad, 0);
console.log(`Edad promedio: ${(sumaEdades / estudiantes.length).toFixed(1)} años`);

// Estudiantes únicos por carrera
const carrerasUnicas = [...new Set(estudiantes.map(est => est.carrera))];
console.log(`Carreras disponibles: ${carrerasUnicas.join(', ')}`);
