document.addEventListener('DOMContentLoaded', () => {
    const botonesNota = document.querySelectorAll('.btn-nota');
    const btnEscalaCompleta = document.getElementById('btnEscalaCompleta');

    const ESCALA_DO_MAYOR = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'];

    const destacarBoton = (boton) => {
        boton.classList.add('activo');
        setTimeout(() => boton.classList.remove('activo'), 250);
    };

    botonesNota.forEach((boton) => {
        boton.addEventListener('click', () => {
            reproducirTono(notaAFrecuencia(boton.dataset.nota));
            destacarBoton(boton);
        });
    });

    if (btnEscalaCompleta) {
        btnEscalaCompleta.addEventListener('click', () => {
            ESCALA_DO_MAYOR.forEach((nota, indice) => {
                setTimeout(() => {
                    const octava = indice === 7 ? 5 : 4;
                    reproducirTono(notaAFrecuencia(nota, octava), 0.4);
                }, indice * 350);
            });
        });
    }
});
