// Utilidad de audio compartida: genera los sonidos en vivo con Web Audio API,
// sin depender de archivos de audio externos.

let contextoAudio = null;

function obtenerContextoAudio() {
    if (!contextoAudio) {
        contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (contextoAudio.state === 'suspended') {
        contextoAudio.resume();
    }
    return contextoAudio;
}

// Notas cromáticas en orden, usadas por escalas.js y para calcular frecuencias
const NOTAS_CROMATICAS = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];

// Convierte una nota (ej. "Sol") a su frecuencia en Hz, tomando La4 = 440Hz como referencia
function notaAFrecuencia(nota, octava = 4) {
    const indice = NOTAS_CROMATICAS.indexOf(nota);
    if (indice === -1) return null;

    // Distancia en semitonos desde La4 (índice 9, octava 4)
    const semitonosDesdeLa4 = (indice - 9) + (octava - 4) * 12;
    return 440 * Math.pow(2, semitonosDesdeLa4 / 12);
}

// Reproduce un único tono con una envolvente simple para evitar "clicks" al iniciar/terminar
function reproducirTono(frecuencia, duracion = 0.5) {
    const ctx = obtenerContextoAudio();
    const oscilador = ctx.createOscillator();
    const ganancia = ctx.createGain();

    oscilador.type = 'sine';
    oscilador.frequency.value = frecuencia;

    const ahora = ctx.currentTime;
    ganancia.gain.setValueAtTime(0, ahora);
    ganancia.gain.linearRampToValueAtTime(0.25, ahora + 0.02);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    oscilador.connect(ganancia);
    ganancia.connect(ctx.destination);

    oscilador.start(ahora);
    oscilador.stop(ahora + duracion);
}

// Reproduce varias frecuencias a la vez (acorde)
function reproducirAcorde(frecuencias, duracion = 0.9) {
    frecuencias.forEach((frecuencia) => reproducirTono(frecuencia, duracion));
}

// Click corto para el metrónomo; el primer tiempo del compás suena más agudo
function reproducirClick(acento = false) {
    const ctx = obtenerContextoAudio();
    const oscilador = ctx.createOscillator();
    const ganancia = ctx.createGain();

    oscilador.type = 'square';
    oscilador.frequency.value = acento ? 1500 : 1000;

    const ahora = ctx.currentTime;
    const duracion = 0.06;
    ganancia.gain.setValueAtTime(acento ? 0.35 : 0.2, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);

    oscilador.connect(ganancia);
    ganancia.connect(ctx.destination);

    oscilador.start(ahora);
    oscilador.stop(ahora + duracion);
}
