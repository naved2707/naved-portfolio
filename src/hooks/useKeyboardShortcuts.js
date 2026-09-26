import { useEffect } from 'react';

export function useKeyboardShortcuts({ onCommand, onTheme, onSecret, enabled }) {
  useEffect(() => {
    let typed = '';
    const handler = event => {
      const target = event.target;
      const editing = target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [contenteditable="true"]'));
      if (editing || event.repeat || event.isComposing) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!document.querySelector('dialog[open]')) onCommand();
        return;
      }
      if (document.querySelector('dialog[open]') || event.ctrlKey || event.metaKey || event.altKey) return;
      typed = (typed + event.key.toLowerCase()).slice(-5);
      if (typed === 'naved') { onSecret(); typed = ''; return; }
      if (!enabled) return;
      if (event.key.toLowerCase() === 'd') { event.preventDefault(); onTheme(); }
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      if (event.key.toLowerCase() === 'p') { event.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior }); }
      if (event.key.toLowerCase() === 'c') { event.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior }); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCommand, onTheme, onSecret, enabled]);
}
