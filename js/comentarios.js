document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos los elementos del DOM
    const form = document.getElementById('formComentarios');
    const listaComentarios = document.querySelector('.lista-comentarios');
    const inputNombre = document.getElementById('inputNombre');
    const inputComentario = document.getElementById('inputComentario');

    // Verificamos que existan para evitar errores en páginas que no tengan formulario
    if (form && listaComentarios) {
        
        // 2. Escuchamos el evento "submit" (cuando dan click al botón)
        form.addEventListener('submit', (evento) => {
            
            // Evita que la página se recargue
            evento.preventDefault();

            // 3. Obtenemos los valores escritos
            const nombre = inputNombre.value.trim();
            const comentario = inputComentario.value.trim();

            // Estructura de control: Si están vacíos, mostramos alerta
            if (nombre === '' || comentario === '') {
                alert('Por favor, completa tu nombre y tu comentario.');
                return; // Detenemos la ejecución aquí
            }

            // 4. Manipulación del DOM: Creamos el nuevo elemento
            const nuevoComentario = document.createElement('div');
            nuevoComentario.className = 'comentario-ejemplo';
            
            // Insertamos el HTML dentro del nuevo div
            nuevoComentario.innerHTML = `
                <h4>${nombre}</h4>
                <p>${comentario}</p>
            `;

            // 5. Lo agregamos al inicio de la lista (el más nuevo arriba)
            listaComentarios.prepend(nuevoComentario);

            // 6. Limpiamos el formulario para el siguiente usuario
            form.reset();
        });
    }
});