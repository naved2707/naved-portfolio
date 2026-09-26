import { useEffect, useRef, useState } from 'react';
import { Search, ArrowUpRight, Moon, Download, Github, Linkedin, CornerDownLeft, MessageCircle, Mail, Instagram } from 'lucide-react';
import Dialog from './Dialog.jsx';
import { portfolio } from '../data/portfolioData.js';
import { useTheme } from '../context/ThemeContext.jsx';
import { whatsappUrl } from '../utils/links.js';

export default function CommandPalette({ onClose, shortcuts, onShortcutsChange }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const resultsRef = useRef(null);
  useEffect(() => { resultsRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }); }, [index]);
  const { toggleTheme } = useTheme();
  const navigate = id => { onClose(); requestAnimationFrame(() => { const target = document.getElementById(id); target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); } }); };
  const actions = [
    ...portfolio.navigation.map(item => ({ id: item.id, title: `Go to ${item.label}`, icon: ArrowUpRight, action: () => navigate(item.id) })),
    { id: 'theme', title: 'Toggle color theme', icon: Moon, action: () => { toggleTheme(); onClose(); } },
    ...(portfolio.resume.enabled ? [{ id: 'resume', title: 'Download résumé', icon: Download, url: portfolio.resume.url, download: true }] : []),
    ...(portfolio.social.github ? [{ id: 'github', title: 'Open GitHub', icon: Github, url: portfolio.social.github }] : []),
    ...(portfolio.social.linkedin ? [{ id: 'linkedin', title: 'Open LinkedIn', icon: Linkedin, url: portfolio.social.linkedin }] : []),
    ...(portfolio.social.instagram ? [{ id: 'instagram', title: 'Open Instagram', icon: Instagram, url: portfolio.social.instagram }] : []),
    ...(portfolio.email ? [{ id: 'email', title: 'Email Naved', icon: Mail, url: `mailto:${portfolio.email}` }] : []),
    ...(whatsappUrl(portfolio.whatsapp) ? [{ id: 'whatsapp', title: 'Chat on WhatsApp', icon: MessageCircle, url: whatsappUrl(portfolio.whatsapp) }] : []),
  ];
  const filtered = actions.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  const execute = item => {
    if (!item) return;
    if (item.action) item.action();
    else { const anchor = document.createElement('a'); anchor.href = item.url; if (item.download) anchor.download = portfolio.resume.filename; else { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; } document.body.appendChild(anchor); anchor.click(); anchor.remove(); onClose(); }
  };
  return <Dialog titleId="command-title" className="command-dialog" onClose={onClose}><h2 className="sr-only" id="command-title">Quick navigation</h2><div className="command-search"><Search size={20} /><input autoFocus placeholder="Where would you like to go?" aria-label="Search commands" role="combobox" aria-controls="command-results" aria-expanded="true" aria-autocomplete="list" aria-activedescendant={filtered[index] ? `command-${filtered[index].id}` : undefined} value={query} onChange={event => { setQuery(event.target.value); setIndex(0); }} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setIndex(value => filtered.length ? (value + 1) % filtered.length : 0); } if (event.key === 'ArrowUp') { event.preventDefault(); setIndex(value => filtered.length ? (value - 1 + filtered.length) % filtered.length : 0); } if (event.key === 'Enter') { event.preventDefault(); execute(filtered[index]); } }} /></div><p className="command-label">JUMP TO SOMETHING GOOD</p><div ref={resultsRef} id="command-results" role="listbox" aria-label="Commands" className="command-results">{filtered.map((item, i) => { const Icon = item.icon; return <div key={item.id} id={`command-${item.id}`} role="option" aria-selected={index === i} className={`command-option ${index === i ? 'highlighted' : ''}`} onMouseMove={() => setIndex(i)} onMouseDown={event => event.preventDefault()} onClick={() => execute(item)}><Icon size={18} /><span>{item.title}</span>{index === i && <CornerDownLeft size={15} />}</div>; })}{!filtered.length && <p className="command-empty">No commands match. Try “projects” or “theme”.</p>}</div><div className="command-settings"><label><input type="checkbox" checked={shortcuts} onChange={event => onShortcutsChange(event.target.checked)} />Enable single-key shortcuts</label><span>D theme · P projects · C contact</span></div><div className="command-help"><span>↑ ↓ navigate <span>↵ select</span></span><span><kbd>esc</kbd> close</span></div></Dialog>;
}
