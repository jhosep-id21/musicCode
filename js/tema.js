document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema');
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (temaGuardado === 'oscuro' || (!temaGuardado && prefiereOscuro)) {
        document.body.classList.add('dark-mode');
    }

    const botonTema = document.querySelector('.toggle-tema');
    if (!botonTema) return;

    const actualizarIcono = () => {
        const esOscuro = document.body.classList.contains('dark-mode');
        botonTema.textContent = esOscuro ? '☀️' : '🌙';
        botonTema.setAttribute('aria-label', esOscuro ? 'Activar modo claro' : 'Activar modo oscuro');
    };

    actualizarIcono();

    botonTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('tema', document.body.classList.contains('dark-mode') ? 'oscuro' : 'claro');
        actualizarIcono();
    });
});
