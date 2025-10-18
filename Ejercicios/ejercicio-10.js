/**
 * Ejercicio 10: Integración de Conceptos - Sistema de Gestión de Biblioteca
 * Sistema completo con clases, validaciones y programación funcional
 */

class Libro {
    constructor(titulo, autor, isbn, categoria, ejemplaresDisponibles) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.categoria = categoria;
        this.ejemplaresDisponibles = ejemplaresDisponibles;
        this.ejemplaresTotales = ejemplaresDisponibles;
        this.prestamosActivos = [];
    }
    
    /**
     * Verifica si el libro está disponible para préstamo
     * @returns {boolean} True si hay ejemplares disponibles
     */
    estaDisponible() {
        return this.ejemplaresDisponibles > 0;
    }
    
    /**
     * Presta un ejemplar del libro
     * @param {string} usuarioId - ID del usuario
     * @returns {boolean} True si el préstamo fue exitoso
     */
    prestar(usuarioId) {
        if (this.estaDisponible()) {
            this.ejemplaresDisponibles--;
            this.prestamosActivos.push({
                usuarioId,
                fechaPrestamo: new Date().toISOString().split('T')[0],
                fechaDevolucion: null
            });
            return true;
        }
        return false;
    }
    
    /**
     * Devuelve un ejemplar del libro
     * @param {string} usuarioId - ID del usuario
     * @returns {boolean} True si la devolución fue exitosa
     */
    devolver(usuarioId) {
        const prestamo = this.prestamosActivos.find(p => p.usuarioId === usuarioId && !p.fechaDevolucion);
        if (prestamo) {
            this.ejemplaresDisponibles++;
            prestamo.fechaDevolucion = new Date().toISOString().split('T')[0];
            return true;
        }
        return false;
    }
    
    /**
     * Obtiene información del libro
     * @returns {string} Información formateada
     */
    obtenerInformacion() {
        return `"${this.titulo}" por ${this.autor} | ${this.categoria} | Disponibles: ${this.ejemplaresDisponibles}/${this.ejemplaresTotales}`;
    }
}

class Usuario {
    constructor(id, nombre, email, tipo = "estudiante") {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.tipo = tipo;
        this.librosPrestados = [];
        this.fechaRegistro = new Date().toISOString().split('T')[0];
    }
    
    /**
     * Verifica si el usuario puede tomar más préstamos
     * @returns {boolean} True si puede tomar más préstamos
     */
    puedeTomarPrestamo() {
        const maxPrestamos = this.tipo === "profesor" ? 10 : 5;
        return this.librosPrestados.length < maxPrestamos;
    }
    
    /**
     * Agrega un libro a los préstamos del usuario
     * @param {string} libroIsbn - ISBN del libro
     * @returns {boolean} True si se agregó exitosamente
     */
    agregarPrestamo(libroIsbn) {
        if (this.puedeTomarPrestamo()) {
            this.librosPrestados.push({
                libroIsbn,
                fechaPrestamo: new Date().toISOString().split('T')[0],
                fechaDevolucion: null
            });
            return true;
        }
        return false;
    }
    
    /**
     * Devuelve un libro prestado
     * @param {string} libroIsbn - ISBN del libro
     * @returns {boolean} True si se devolvió exitosamente
     */
    devolverLibro(libroIsbn) {
        const prestamoIndex = this.librosPrestados.findIndex(p => 
            p.libroIsbn === libroIsbn && !p.fechaDevolucion
        );
        
        if (prestamoIndex !== -1) {
            this.librosPrestados[prestamoIndex].fechaDevolucion = new Date().toISOString().split('T')[0];
            return true;
        }
        return false;
    }
    
    /**
     * Obtiene información del usuario
     * @returns {string} Información formateada
     */
    obtenerInformacion() {
        const prestamosActivos = this.librosPrestados.filter(p => !p.fechaDevolucion).length;
        return `${this.nombre} (${this.tipo}) | Préstamos activos: ${prestamosActivos}`;
    }
}

class SistemaBiblioteca {
    constructor() {
        this.libros = [];
        this.usuarios = [];
        this.prestamos = [];
    }
    
    /**
     * Agrega un libro al sistema
     * @param {Libro} libro - Instancia de Libro
     */
    agregarLibro(libro) {
        if (this.libros.some(l => l.isbn === libro.isbn)) {
            throw new Error(`El libro con ISBN ${libro.isbn} ya existe en el sistema`);
        }
        this.libros.push(libro);
    }
    
    /**
     * Registra un usuario en el sistema
     * @param {Usuario} usuario - Instancia de Usuario
     */
    registrarUsuario(usuario) {
        if (this.usuarios.some(u => u.id === usuario.id)) {
            throw new Error(`El usuario con ID ${usuario.id} ya está registrado`);
        }
        this.usuarios.push(usuario);
    }
    
    /**
     * Realiza un préstamo de libro
     * @param {string} usuarioId - ID del usuario
     * @param {string} libroIsbn - ISBN del libro
     * @returns {boolean} True si el préstamo fue exitoso
     */
    realizarPrestamo(usuarioId, libroIsbn) {
        const usuario = this.usuarios.find(u => u.id === usuarioId);
        const libro = this.libros.find(l => l.isbn === libroIsbn);
        
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        
        if (!libro) {
            throw new Error("Libro no encontrado");
        }
        
        if (!usuario.puedeTomarPrestamo()) {
            throw new Error("El usuario ha alcanzado el límite de préstamos");
        }
        
        if (!libro.estaDisponible()) {
            throw new Error("El libro no está disponible");
        }
        
        // Realizar préstamo
        const prestamoExitoso = libro.prestar(usuarioId) && usuario.agregarPrestamo(libroIsbn);
        
        if (prestamoExitoso) {
            this.prestamos.push({
                usuarioId,
                libroIsbn,
                fechaPrestamo: new Date().toISOString().split('T')[0],
                fechaDevolucion: null
            });
        }
        
        return prestamoExitoso;
    }
    
    /**
     * Busca libros por diferentes criterios
     * @param {Object} criterios - Criterios de búsqueda
     * @returns {Array} Libros que coinciden con los criterios
     */
    buscarLibros(criterios = {}) {
        return this.libros.filter(libro => {
            return Object.entries(criterios).every(([key, value]) => {
                if (key === 'titulo' || key === 'autor' || key === 'categoria') {
                    return libro[key].toLowerCase().includes(value.toLowerCase());
                }
                if (key === 'disponible') {
                    return value ? libro.estaDisponible() : !libro.estaDisponible();
                }
                return libro[key] === value;
            });
        });
    }
    
    /**
     * Genera reportes usando programación funcional
     */
    generarReportes() {
        console.log("=== REPORTES DE LA BIBLIOTECA ===");
        
        // Reporte 1: Libros más prestados
        const librosMasPrestados = [...this.libros]
            .sort((a, b) => b.prestamosActivos.length - a.prestamosActivos.length)
            .slice(0, 5);
        
        console.log("\n--- TOP 5 LIBROS MÁS PRESTADOS ---");
        librosMasPrestados.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.prestamosActivos.length} préstamos`);
        });
        
        // Reporte 2: Usuarios más activos
        const usuariosMasActivos = [...this.usuarios]
            .sort((a, b) => b.librosPrestados.length - a.librosPrestados.length)
            .slice(0, 5);
        
        console.log("\n--- TOP 5 USUARIOS MÁS ACTIVOS ---");
        usuariosMasActivos.forEach((usuario, index) => {
            console.log(`${index + 1}. ${usuario.nombre} - ${usuario.librosPrestados.length} préstamos totales`);
        });
        
        // Reporte 3: Disponibilidad por categoría
        const disponibilidadCategoria = this.libros.reduce((acc, libro) => {
            if (!acc[libro.categoria]) {
                acc[libro.categoria] = { total: 0, disponibles: 0 };
            }
            acc[libro.categoria].total += libro.ejemplaresTotales;
            acc[libro.categoria].disponibles += libro.ejemplaresDisponibles;
            return acc;
        }, {});
        
        console.log("\n--- DISPONIBILIDAD POR CATEGORÍA ---");
        Object.entries(disponibilidadCategoria).forEach(([categoria, datos]) => {
            const porcentaje = (datos.disponibles / datos.total) * 100;
            console.log(`${categoria.padEnd(15)}: ${datos.disponibles}/${datos.total} (${porcentaje.toFixed(1)}% disponible)`);
        });
        
        // Reporte 4: Préstamos activos
        const prestamosActivos = this.prestamos.filter(p => !p.fechaDevolucion);
        console.log(`\n--- PRÉSTAMOS ACTIVOS: ${prestamosActivos.length} ---`);
    }
}

// DEMOSTRACIÓN DEL SISTEMA
console.log("=== SISTEMA DE GESTIÓN DE BIBLIOTECA ===");

// Crear instancia del sistema
const biblioteca = new SistemaBiblioteca();

// Agregar libros
try {
    biblioteca.agregarLibro(new Libro("Cien años de soledad", "Gabriel García Márquez", "978-8437604947", "Ficción", 3));
    biblioteca.agregarLibro(new Libro("El Quijote", "Miguel de Cervantes", "978-8467031257", "Clásico", 2));
    biblioteca.agregarLibro(new Libro("1984", "George Orwell", "978-0451524935", "Ciencia Ficción", 4));
    biblioteca.agregarLibro(new Libro("JavaScript: The Good Parts", "Douglas Crockford", "978-0596517748", "Programación", 5));
    biblioteca.agregarLibro(new Libro("Clean Code", "Robert C. Martin", "978-0132350884", "Programación", 2));
    console.log("✅ Libros agregados exitosamente");
} catch (error) {
    console.log(`❌ Error al agregar libros: ${error.message}`);
}

// Registrar usuarios
try {
    biblioteca.registrarUsuario(new Usuario("U001", "Ana García", "ana@email.com", "estudiante"));
    biblioteca.registrarUsuario(new Usuario("U002", "Carlos López", "carlos@email.com", "profesor"));
    biblioteca.registrarUsuario(new Usuario("U003", "María Rodríguez", "maria@email.com", "estudiante"));
    console.log("✅ Usuarios registrados exitosamente");
} catch (error) {
    console.log(`❌ Error al registrar usuarios: ${error.message}`);
}

// Realizar préstamos
try {
    console.log("\n--- REALIZANDO PRÉSTAMOS ---");
    biblioteca.realizarPrestamo("U001", "978-8437604947");
    console.log("✅ Préstamo 1 exitoso");
    
    biblioteca.realizarPrestamo("U002", "978-0596517748");
    console.log("✅ Préstamo 2 exitoso");
    
    biblioteca.realizarPrestamo("U001", "978-0451524935");
    console.log("✅ Préstamo 3 exitoso");
} catch (error) {
    console.log(`❌ Error en préstamo: ${error.message}`);
}

// Búsqueda de libros
console.log("\n--- BÚSQUEDA DE LIBROS ---");
const librosProgramacion = biblioteca.buscarLibros({ categoria: "programación" });
console.log("Libros de programación:");
librosProgramacion.forEach(libro => console.log(`- ${libro.obtenerInformacion()}`));

const librosDisponibles = biblioteca.buscarLibros({ disponible: true });
console.log(`\nTotal de libros disponibles: ${librosDisponibles.length}`);

// Generar reportes
biblioteca.generarReportes();

// Mostrar información del sistema
console.log("\n--- INFORMACIÓN DEL SISTEMA ---");
console.log(`Total libros: ${biblioteca.libros.length}`);
console.log(`Total usuarios: ${biblioteca.usuarios.length}`);
console.log(`Total préstamos: ${biblioteca.prestamos.length}`);

// Mostrar estado actual
console.log("\n--- ESTADO ACTUAL ---");
console.log("Libros en el sistema:");
biblioteca.libros.forEach(libro => console.log(`- ${libro.obtenerInformacion()}`));

console.log("\nUsuarios registrados:");
biblioteca.usuarios.forEach(usuario => console.log(`- ${usuario.obtenerInformacion()}`));
