// src/contexts/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = JSON.parse(localStorage.getItem('appSettings'))?.theme || 'light';
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Оновлюємо localStorage
    const currentSettings = JSON.parse(localStorage.getItem('appSettings')) || {};
    localStorage.setItem(
      'appSettings',
      JSON.stringify({ ...currentSettings, theme })
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
