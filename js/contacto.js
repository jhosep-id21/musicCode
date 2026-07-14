document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContacto');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

    if (!form) return;

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombreContacto').value.trim();
        const email = document.getElementById('emailContacto').value.trim();
        const mensaje = document.getElementById('mensajeContacto').value.trim();

        if (nombre === '' || email === '' || mensaje === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        form.style.display = 'none';
        mensajeConfirmacion.style.display = 'block';
    });
});
