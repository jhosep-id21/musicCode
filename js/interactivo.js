// js/interactivo.js

// Notas y definiciones musicales
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const CHORD_TYPES = {
    Mayor: { formula: '1 - 3 - 5', intervals: [0, 4, 7], description: 'Acorde mayor clásico con sonido brillante.' },
    Menor: { formula: '1 - b3 - 5', intervals: [0, 3, 7], description: 'Acorde menor con sonido suave y melancólico.' },
    Mayor7: { formula: '1 - 3 - 5 - 7', intervals: [0, 4, 7, 11], description: 'Acorde mayor con séptima mayor.' },
    Menor7: { formula: '1 - b3 - 5 - b7', intervals: [0, 3, 7, 10], description: 'Acorde menor con séptima menor.' },
    Dominante7: { formula: '1 - 3 - 5 - b7', intervals: [0, 4, 7, 10], description: 'Acorde dominante con sonido tenso.' },
    Disminuido: { formula: '1 - b3 - b5', intervals: [0, 3, 6], description: 'Acorde de tensión con sonido oscuro.' },
    Aumentado: { formula: '1 - 3 - #5', intervals: [0, 4, 8], description: 'Acorde aumentado con sensación de expansión.' }
};

const SCALE_TYPES = {
    Mayor: { formula: 'T - T - S - T - T - T - S', intervals: [2, 2, 1, 2, 2, 2, 1], description: 'Escala mayor con sonido alegre.' },
    MenorNatural: { formula: 'T - S - T - T - S - T - T', intervals: [2, 1, 2, 2, 1, 2, 2], description: 'Escala menor natural con carácter melancólico.' },
    MenorArmonica: { formula: 'T - S - T - T - S - 3 - S', intervals: [2, 1, 2, 2, 1, 3, 1], description: 'Escala menor armónica con séptima elevada.' },
    MenorMelodica: { formula: 'T - S - T - T - T - T - S', intervals: [2, 1, 2, 2, 2, 2, 1], description: 'Escala menor melódica con sonido ascendente suave.' }
};

const DEGREE_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

// Inicializa tema oscuro / claro
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('musiccode-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('musiccode-theme', theme);

    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');

    const iconSun = themeToggle.querySelector('.icon-sun');
    const iconMoon = themeToggle.querySelector('.icon-moon');

    if (iconSun && iconMoon) {
        iconSun.style.display = theme === 'dark' ? 'none' : 'inline';
        iconMoon.style.display = theme === 'dark' ? 'inline' : 'none';
    }
}

// Inicializa la tabla interactiva de acordes
function initChordExplorer() {
    const chordRoot = document.getElementById('chordRoot');
    const chordType = document.getElementById('chordType');
    const chordName = document.getElementById('chordName');
    const chordNotes = document.getElementById('chordNotes');
    const chordFormula = document.getElementById('chordFormula');
    const chordDescription = document.getElementById('chordDescription');

    if (!chordRoot || !chordType || !chordName || !chordNotes || !chordFormula || !chordDescription) {
        return;
    }

    function updateChord() {
        const root = chordRoot.value;
        const type = chordType.value;
        const chordInfo = CHORD_TYPES[type];

        const notes = chordInfo.intervals.map(interval => {
            const index = (NOTE_NAMES.indexOf(root) + interval) % NOTE_NAMES.length;
            return NOTE_NAMES[index];
        });

        chordName.textContent = `Acorde de ${root} ${type.replace('Mayor7', 'Maj7').replace('Menor7', 'm7')}`;
        chordNotes.textContent = notes.join(' - ');
        chordFormula.textContent = chordInfo.formula;
        chordDescription.textContent = chordInfo.description;
    }

    chordRoot.addEventListener('change', updateChord);
    chordType.addEventListener('change', updateChord);

    updateChord();
}

// Inicializa el explorador de escalas
function initScaleExplorer() {
    const scaleRoot = document.getElementById('scaleRoot');
    const scaleType = document.getElementById('scaleType');
    const scaleName = document.getElementById('scaleName');
    const scaleFormula = document.getElementById('scaleFormula');
    const scaleNotes = document.getElementById('scaleNotes');
    const scaleDegrees = document.getElementById('scaleDegrees');
    const keyboardContainer = document.getElementById('scaleKeyboard');

    if (!scaleRoot || !scaleType || !scaleName || !scaleFormula || !scaleNotes || !scaleDegrees || !keyboardContainer) {
        return;
    }

    generateKeyboard(keyboardContainer);

    function updateScale() {
        const root = scaleRoot.value;
        const type = scaleType.value;
        const scaleInfo = SCALE_TYPES[type];
        const notes = buildScale(root, scaleInfo.intervals);

        scaleName.textContent = `Escala de ${root} ${type === 'Mayor' ? 'Mayor' : type.replace('MenorNatural', 'Menor natural').replace('MenorArmonica', 'Menor armónica').replace('MenorMelodica', 'Menor melódica')}`;
        scaleFormula.textContent = scaleInfo.formula;
        scaleNotes.textContent = notes.join(' - ');
        scaleDegrees.textContent = DEGREE_LABELS.join(' - ');

        highlightScaleKeys(notes);
    }

    scaleRoot.addEventListener('change', updateScale);
    scaleType.addEventListener('change', updateScale);

    updateScale();
}

function buildScale(root, intervals) {
    const rootIndex = NOTE_NAMES.indexOf(root);
    const notes = [root];
    let currentIndex = rootIndex;

    intervals.forEach(step => {
        currentIndex = (currentIndex + step) % NOTE_NAMES.length;
        notes.push(NOTE_NAMES[currentIndex]);
    });

    return notes.slice(0, 7);
}

function generateKeyboard(container) {
    const keyboardNotes = NOTE_NAMES.map(name => ({
        name,
        isBlack: name.includes('#')
    }));

    keyboardNotes.forEach(note => {
        const key = document.createElement('div');
        key.className = `key ${note.isBlack ? 'black' : 'white'}`;
        key.dataset.note = note.name;
        key.setAttribute('aria-hidden', 'true');
        key.innerHTML = `<span>${note.name}</span>`;
        container.appendChild(key);
    });
}

function highlightScaleKeys(notes) {
    const keys = document.querySelectorAll('#scaleKeyboard .key');
    keys.forEach(key => {
        key.classList.toggle('active', notes.includes(key.dataset.note));
    });
}

// Ejecuta la inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initChordExplorer();
    initScaleExplorer();
});
