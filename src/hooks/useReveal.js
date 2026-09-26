import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.06 });
    const items = document.querySelectorAll('[data-reveal]');
    items.forEach(item => { item.classList.add('will-reveal'); observer.observe(item); });
    return () => { observer.disconnect(); items.forEach(item => item.classList.remove('will-reveal')); };
  }, []);
}
