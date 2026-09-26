import { useState } from 'react';
import { Command, Menu } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { ResumeLink, ThemeToggle } from './UI.jsx';
import Dialog from './Dialog.jsx';

const navIds = portfolio.navigation.map(item => item.id);

export default function Navbar({ onCommand }) {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(navIds);
  return <header className="site-header">
    <div className="container nav-inner">
      <a href="#home" className="wordmark" aria-label="Mohammad Naved home">n<span>.</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{portfolio.navigation.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>)}</nav>
      <div className="nav-actions">
        <button className="icon-button command-trigger" onClick={onCommand} aria-label="Open command palette" title="Command palette (Ctrl or Cmd + K)"><Command size={18} /></button>
        <ThemeToggle />
        <ResumeLink className="button button-nav">Résumé</ResumeLink>
        <button className="icon-button mobile-toggle" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-haspopup="dialog"><Menu size={23} /></button>
      </div>
    </div>
    {open && <Dialog titleId="mobile-nav-title" className="mobile-dialog" onClose={() => setOpen(false)}>
      <span id="mobile-nav-title" className="eyebrow">Explore the portfolio</span>
      <nav aria-label="Mobile navigation">{portfolio.navigation.map((item, i) => <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} aria-current={active === item.id ? 'location' : undefined}><span>0{i + 1}</span>{item.label}</a>)}</nav>
      <ResumeLink />
      <button className="text-button" onClick={() => { setOpen(false); onCommand(); }}><Command size={17} />Quick navigation</button>
    </Dialog>}
  </header>;
}
