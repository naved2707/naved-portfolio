import { useEffect, useState } from 'react';

export function useScrollSpy(ids) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = Math.min(window.innerHeight * 0.35, 260);
      const visible = ids.map(id => document.getElementById(id)).filter(Boolean).sort((a, b) => a.offsetTop - b.offsetTop);
      let next = visible[0]?.id || 'home';
      for (const element of visible) if (element.getBoundingClientRect().top <= threshold) next = element.id;
      setActive(next);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, [ids]);
  return active;
}
