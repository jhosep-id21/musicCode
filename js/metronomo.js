document.addEventListener('DOMContentLoaded', () => {
    const btnMetronomo = document.getElementById('btnMetronomo');
    const bpmRango = document.getElementById('bpmRango');
    const bpmValor = document.getElementById('bpmValor');
    const compasSelect = document.getElementById('compasSelect');
    const indicador = document.getElementById('indicadorPulso');

    if (!btnMetronomo) return;

    let intervalId = null;
    let tiempoActual = 0;

    const tick = () => {
        const tiemposPorCompas = Number(compasSelect.value);
        const esAcento = tiempoActual === 0;

        reproducirClick(esAcento);

        indicador.classList.add('pulso-activo');
        setTimeout(() => indicador.classList.remove('pulso-activo'), 100);

        tiempoActual = (tiempoActual + 1) % tiemposPorCompas;
    };

    const iniciar = () => {
        tiempoActual = 0;
        const bpm = Number(bpmRango.value);
        intervalId = setInterval(tick, 60000 / bpm);
        btnMetronomo.textContent = '■ Detener';
    };

    const detener = () => {
        clearInterval(intervalId);
        intervalId = null;
        btnMetronomo.textContent = '▶ Iniciar';
    };

    btnMetronomo.addEventListener('click', () => {
        if (intervalId) {
            detener();
        } else {
            iniciar();
        }
    });

    bpmRango.addEventListener('input', () => {
        bpmValor.textContent = bpmRango.value;
        if (intervalId) {
            detener();
            iniciar();
        }
    });
});
