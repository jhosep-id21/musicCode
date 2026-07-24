// Este script calcula el intervalo (la distancia) entre dos notas musicales.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Guardamos en variables los elementos que vamos a usar
    const selectNotaUno = document.getElementById('notaUno');
    const selectNotaDos = document.getElementById('notaDos');
    const botonCalcular = document.getElementById('btnCalcularIntervalo');
    const resultado = document.getElementById('resultadoIntervalo');

    // Si esta página no tiene estos elementos, no hacemos nada más
    if (!botonCalcular) return;

    // 2. Lista con el nombre de cada intervalo, según la cantidad de semitonos.
    //    Por ejemplo: 0 semitonos = "Unísono", 7 semitonos = "Quinta justa"
    const NOMBRES_DE_INTERVALOS = [
        'Unísono (la misma nota)',
        'Segunda menor',
        'Segunda mayor',
        'Tercera menor',
        'Tercera mayor',
        'Cuarta justa',
        'Cuarta aumentada (tritono)',
        'Quinta justa',
        'Sexta menor',
        'Sexta mayor',
        'Séptima menor',
        'Séptima mayor',
        'Octava'
    ];

    // 3. Cuando el usuario pulsa el botón, calculamos el intervalo
    botonCalcular.addEventListener('click', () => {
        // Leemos qué nota escogió el usuario en cada select
        const notaUno = selectNotaUno.value;
        const notaDos = selectNotaDos.value;

        // Buscamos en qué posición está cada nota dentro del arreglo de 12 notas
        // (NOTAS_CROMATICAS viene definido en audio.js)
        const posicionUno = NOTAS_CROMATICAS.indexOf(notaUno);
        const posicionDos = NOTAS_CROMATICAS.indexOf(notaDos);

        // La distancia en semitonos es la resta de las dos posiciones
        let semitonos = posicionDos - posicionUno;

        // Si el resultado es negativo, le sumamos 12 para "dar la vuelta" al círculo de notas
        if (semitonos < 0) {
            semitonos = semitonos + 12;
        }

        // Buscamos el nombre del intervalo según la cantidad de semitonos
        const nombreIntervalo = NOMBRES_DE_INTERVALOS[semitonos];

        // Mostramos el resultado en pantalla
        resultado.textContent = notaUno + ' → ' + notaDos + ': ' + semitonos + ' semitonos (' + nombreIntervalo + ')';
    });
});
