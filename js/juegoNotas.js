// Este script es un juego sencillo para entrenar el oído musical:
// el programa toca una nota al azar y el usuario debe adivinar cuál fue.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Guardamos en variables los elementos que vamos a usar
    const botonNuevaNota = document.getElementById('btnNuevaNota');
    const botonEscucharOtraVez = document.getElementById('btnEscucharOtraVez');
    const botonesDeNota = document.querySelectorAll('.juego-notas .btn-nota');
    const textoResultado = document.getElementById('resultadoJuego');
    const textoPuntaje = document.getElementById('puntajeJuego');

    // Si esta página no tiene el juego, no hacemos nada más
    if (!botonNuevaNota) return;

    // 2. Notas que puede elegir el juego (las 7 notas naturales)
    const NOTAS_DEL_JUEGO = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

    // 3. Variables para llevar el control del juego
    let notaSecreta = null; // aquí guardamos la nota que el usuario debe adivinar
    let aciertos = 0;
    let intentos = 0;

    // 4. Función que actualiza el texto del puntaje
    const actualizarPuntaje = () => {
        textoPuntaje.textContent = 'Aciertos: ' + aciertos + ' / Intentos: ' + intentos;
    };

    // 5. Al pulsar "Nueva nota": elegimos una nota al azar y la reproducimos
    botonNuevaNota.addEventListener('click', () => {
        // Math.random() da un número entre 0 y 1, lo multiplicamos por la cantidad
        // de notas y redondeamos hacia abajo para obtener una posición del arreglo
        const posicionAlAzar = Math.floor(Math.random() * NOTAS_DEL_JUEGO.length);
        notaSecreta = NOTAS_DEL_JUEGO[posicionAlAzar];

        reproducirTono(notaAFrecuencia(notaSecreta));

        textoResultado.textContent = 'Escucha con atención y elige una nota.';
    });

    // 6. Al pulsar "Escuchar de nuevo": repetimos el mismo sonido
    botonEscucharOtraVez.addEventListener('click', () => {
        if (notaSecreta === null) {
            textoResultado.textContent = 'Primero pulsa "Nueva nota".';
            return;
        }

        reproducirTono(notaAFrecuencia(notaSecreta));
    });

    // 7. Cuando el usuario pulsa una de las 7 notas, comprobamos si acertó
    botonesDeNota.forEach((boton) => {
        boton.addEventListener('click', () => {
            if (notaSecreta === null) {
                textoResultado.textContent = 'Primero pulsa "Nueva nota".';
                return;
            }

            const notaElegida = boton.dataset.nota;
            intentos = intentos + 1;

            if (notaElegida === notaSecreta) {
                aciertos = aciertos + 1;
                textoResultado.textContent = '¡Correcto! Era ' + notaSecreta + '.';
            } else {
                textoResultado.textContent = 'Incorrecto. Era ' + notaSecreta + ', elegiste ' + notaElegida + '.';
            }

            actualizarPuntaje();

            // Pedimos una nueva ronda antes de poder volver a adivinar
            notaSecreta = null;
        });
    });
});
