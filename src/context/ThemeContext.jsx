import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const [manual, setManual] = useState(() => {
    try { return ['light', 'dark'].includes(localStorage.getItem('naved-theme')); } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101715' : '#f5f6f0');
    if (manual) { try { localStorage.setItem('naved-theme', theme); } catch { /* Theme still works without storage. */ } }
  }, [theme, manual]);
  useEffect(() => {
    if (manual) return;
    const preference = matchMedia('(prefers-color-scheme: dark)');
    const update = event => setTheme(event.matches ? 'dark' : 'light');
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, [manual]);
  const toggleTheme = () => { setManual(true); setTheme(current => current === 'dark' ? 'light' : 'dark'); };
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() { return useContext(ThemeContext); }
