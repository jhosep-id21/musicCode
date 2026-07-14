document.addEventListener('DOMContentLoaded', () => {
    const selectRaiz = document.getElementById('notaRaiz');
    const selectTipo = document.getElementById('tipoEscala');
    const btnGenerar = document.getElementById('btnGenerarEscala');
    const btnReproducir = document.getElementById('btnReproducirEscala');
    const resultado = document.getElementById('resultadoEscala');

    if (!selectRaiz || !btnGenerar) return;

    const PATRONES = {
        mayor: [2, 2, 1, 2, 2, 2, 1],
        menor: [2, 1, 2, 2, 1, 2, 2]
    };

    let escalaActual = [];

    const generarEscala = (notaRaiz, tipo) => {
        const indiceRaiz = NOTAS_CROMATICAS.indexOf(notaRaiz);
        const patron = PATRONES[tipo];
        const notas = [notaRaiz];
        let indiceActual = indiceRaiz;

        patron.forEach((semitonos) => {
            indiceActual = (indiceActual + semitonos) % NOTAS_CROMATICAS.length;
            notas.push(NOTAS_CROMATICAS[indiceActual]);
        });

        return notas;
    };

    btnGenerar.addEventListener('click', () => {
        escalaActual = generarEscala(selectRaiz.value, selectTipo.value);

        resultado.innerHTML = escalaActual
            .map((nota) => `<span class="nota">${nota}</span>`)
            .join('');

        btnReproducir.style.display = 'inline-block';
    });

    btnReproducir.addEventListener('click', () => {
        escalaActual.forEach((nota, indice) => {
            setTimeout(() => reproducirTono(notaAFrecuencia(nota), 0.4), indice * 350);
        });
    });
});
