/**
 * Ejercicio 5: Programación Estructurada - Condicionales
 * Sistema de calificaciones con validación de errores
 */

function evaluarCalificacion(puntuacion) {
    if (typeof puntuacion !== 'number' || isNaN(puntuacion)) {
        throw new Error("Error: La puntuación debe ser un número válido");
    }
    
    if (puntuacion < 0 || puntuacion > 100) {
        throw new Error("Error: La puntuación debe estar entre 0 y 100");
    }
    
    let letra, estado, mensaje;
    
    if (puntuacion >= 90) {
        letra = 'A';
        estado = 'Excelente';
        mensaje = '¡Felicidades! Desempeño excepcional.';
    } else if (puntuacion >= 80) {
        letra = 'B';
        estado = 'Muy Bueno';
        mensaje = 'Muy buen trabajo, sigue así.';
    } else if (puntuacion >= 70) {
        letra = 'C';
        estado = 'Bueno';
        mensaje = 'Buen trabajo, pero hay margen de mejora.';
    } else if (puntuacion >= 60) {
        letra = 'D';
        estado = 'Suficiente';
        mensaje = 'Has aprobado, pero necesitas mejorar.';
    } else {
        letra = 'F';
        estado = 'Reprobado';
        mensaje = 'No has aprobado. Busca ayuda académica.';
    }
    
    const aprobado = puntuacion >= 60;
    
    return {
        puntuacion,
        letra,
        estado,
        aprobado,
        mensaje
    };
}

// Casos de prueba
const casosPrueba = [95, 85, 75, 65, 55, 105, -5, 92.5];

console.log("=== SISTEMA DE CALIFICACIONES ===");
casosPrueba.forEach((puntuacion, index) => {
    console.log(`\nEstudiante ${index + 1}:`);
    try {
        const resultado = evaluarCalificacion(puntuacion);
        console.log(`Puntuación: ${resultado.puntuacion}`);
        console.log(`Letra: ${resultado.letra}`);
        console.log(`Estado: ${resultado.estado}`);
        console.log(`Resultado: ${resultado.aprobado ? 'APROBADO' : 'REPROBADO'}`);
        console.log(`Mensaje: ${resultado.mensaje}`);
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
});

// Función para mostrar estadísticas
function mostrarEstadisticas(calificaciones) {
    const aprobados = calificaciones.filter(p => {
        try {
            const resultado = evaluarCalificacion(p);
            return resultado.aprobado;
        } catch {
            return false;
        }
    }).length;
    
    console.log("\n=== ESTADÍSTICAS ===");
    console.log(`Total evaluaciones: ${calificaciones.length}`);
    console.log(`Aprobados: ${aprobados}`);
    console.log(`Reprobados: ${calificaciones.length - aprobados}`);
    console.log(`Tasa de aprobación: ${((aprobados / calificaciones.length) * 100).toFixed(1)}%`);
}

mostrarEstadisticas(casosPrueba);
