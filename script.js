document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved preferences
    const savedLanguage = localStorage.getItem('language') || 'bn';
    const savedTheme = localStorage.getItem('theme') || 'light-mode';

    // Apply saved language
    setLanguage(savedLanguage);
    updateLanguageToggleButton(savedLanguage);

    // Apply saved theme
    body.classList.add(savedTheme);
    updateThemeToggleButton(savedTheme);

    // Language Toggle
    languageToggle.addEventListener('click', () => {
        const currentLang = body.dataset.lang;
        const newLang = currentLang === 'bn' ? 'en' : 'bn';
        setLanguage(newLang);
        updateLanguageToggleButton(newLang);
        localStorage.setItem('language', newLang);
    });

    function setLanguage(lang) {
        body.dataset.lang = lang;
        document.querySelectorAll('[data-en], [data-bn]').forEach(element => {
            if (lang === 'en' && element.dataset.en) {
                element.textContent = element.dataset.en;
            } else if (lang === 'bn' && element.dataset.bn) {
                element.textContent = element.dataset.bn;
            }
        });
        document.querySelector('html').lang = lang; // Update HTML lang attribute
    }

    function updateLanguageToggleButton(lang) {
        if (lang === 'en') {
            languageToggle.textContent = languageToggle.dataset.bn; // Show BN to switch to Bengali
        } else {
            languageToggle.textContent = languageToggle.dataset.en; // Show EN to switch to English
        }
    }

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            updateThemeToggleButton('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            updateThemeToggleButton('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    function updateThemeToggleButton(theme) {
        if (theme === 'dark-mode') {
            themeToggle.innerHTML = `<i class="fas fa-sun"></i>`; // Sun icon for light mode
            themeToggle.setAttribute('data-en', 'Light');
            themeToggle.setAttribute('data-bn', 'লাইট');
        } else {
            themeToggle.innerHTML = `<i class="fas fa-moon"></i>`; // Moon icon for dark mode
            themeToggle.setAttribute('data-en', 'Dark');
            themeToggle.setAttribute('data-bn', 'ডার্ক');
        }
    }

    // Smooth Scrolling for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});