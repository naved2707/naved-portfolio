import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Dialog({ titleId, onClose, children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === ref.current) { const rect = ref.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}>
    <button className="icon-button dialog-close" aria-label="Close dialog" onClick={onClose}><X size={21} /></button>
    {children}
  </dialog>;
}
