document.addEventListener('DOMContentLoaded', () => {
    const botonesEscuchar = document.querySelectorAll('.btn-escuchar');

    botonesEscuchar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const notas = boton.dataset.notas.split(',');
            const frecuencias = notas.map((nota) => notaAFrecuencia(nota));
            reproducirAcorde(frecuencias);
        });
    });
});
