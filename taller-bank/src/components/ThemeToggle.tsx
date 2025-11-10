import { useState, useEffect } from 'react';

function ThemeToggle() {

    // 4.1. UseState para el tema
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 4.2. UseEffect para aplicar la clase 'dark' al <html>
    useEffect(function() {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]); // Depende del estado 'theme'

    function toggleTheme(): void {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-md transition-colors duration-300"
        >
            {theme === 'light' ? 'Modo Oscuro 🌙' : 'Modo Claro ☀️'}
        </button>
    );
}

export default ThemeToggle;