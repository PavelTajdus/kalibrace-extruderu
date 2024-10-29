// Funkce pro nastavení tématu
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('theme-toggle').checked = theme === 'dark';
    localStorage.setItem('theme', theme);
}

// Inicializace tématu
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');

    // Kontrola uložené preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }

    // Posluchač pro změnu systémového nastavení
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Posluchač pro přepínač
    themeToggle.addEventListener('change', function (e) {
        setTheme(e.target.checked ? 'dark' : 'light');
    });
}

// Funkce pro výpočet
function calculate() {
    const currentEsteps = parseFloat(document.getElementById('currentEsteps').value);
    const requestedLength = parseFloat(document.getElementById('requestedLength').value);
    const actualLength = parseFloat(document.getElementById('actualLength').value);
    const errorMessage = document.getElementById('error-message');
    const result = document.getElementById('result');

    // Skryjeme předchozí výsledky a chyby
    errorMessage.style.display = 'none';
    result.style.display = 'none';

    // Kontrola vyplnění všech polí
    if (!currentEsteps || !requestedLength || !actualLength) {
        errorMessage.style.display = 'block';

        // Zvýrazníme nevyplněná pole
        ['currentEsteps', 'requestedLength', 'actualLength'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value) {
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        return;
    }

    // Odstranění zvýraznění chyb
    ['currentEsteps', 'requestedLength', 'actualLength'].forEach(fieldId => {
        document.getElementById(fieldId).classList.remove('is-invalid');
    });

    // Výpočet a zobrazení výsledku
    const newEsteps = (currentEsteps * requestedLength) / actualLength;
    document.getElementById('newEsteps').textContent = newEsteps.toFixed(2);
    result.style.display = 'block';
}

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', initializeTheme);