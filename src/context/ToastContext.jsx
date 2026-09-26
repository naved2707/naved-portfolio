import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const notify = (message, type = 'success') => {
    clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 5000);
  };
  return <ToastContext.Provider value={notify}>
    {children}
    <div className="toast-region" role="status" aria-live="polite" aria-atomic="true">
      {toast && <div className={`toast ${toast.type}`}>
        {toast.type === 'error' ? <AlertCircle size={19} /> : <CheckCircle2 size={19} />}
        <span>{toast.message}</span>
        <button className="icon-button" aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={17} /></button>
      </div>}
    </div>
  </ToastContext.Provider>;
}
export function useToast() { return useContext(ToastContext); }
