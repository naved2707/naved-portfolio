import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Code2, MapPin, Atom, Braces } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { ResumeLink, SocialLinks } from './UI.jsx';

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const configure = () => { clearInterval(timer); if (!preference.matches) timer = setInterval(() => { if (!document.hidden) setIndex(value => (value + 1) % portfolio.roles.length); }, 4200); };
    configure(); preference.addEventListener('change', configure);
    return () => { clearInterval(timer); preference.removeEventListener('change', configure); };
  }, []);
  return <span className="rotating-role" aria-hidden="true" key={index}>{portfolio.roles[index]}</span>;
}

export default function Hero() {
  const [broken, setBroken] = useState(false);
  return <section id="home" className="hero section-anchor">
    <div className="hero-grid" aria-hidden="true" />
    <div className="container hero-content">
      <div className="hero-copy">
        <div className="hero-eyebrow"><span className="small-line" /> HELLO, I’M {portfolio.name.toUpperCase()}</div>
        <h1>Thoughtful code.<br />Meaningful<br /><span className="accent-word">experiences<span className="hero-period">.</span></span></h1>
        <div className="hero-role"><strong>{portfolio.title}</strong><span className="role-divider" aria-hidden="true">/</span><RotatingRole /></div>
        <p className="hero-description">{portfolio.description}</p>
        <div className="hero-buttons"><a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={19} /></a><a className="button button-quiet" href="#contact">Let’s connect <ArrowUpRight size={18} /></a></div>
        <div className="hero-secondary"><ResumeLink className="text-button" /><SocialLinks /></div>
      </div>
      <div className="hero-visual">
        <div className="profile-card">
          <div className="profile-top"><Code2 size={20} /><span>DESIGN MINDED. CODE DRIVEN.</span><span className="profile-corner">↗</span></div>
          <div className="portrait-area">
            {portfolio.profile.image && !broken ? <img className="profile-photo" src={portfolio.profile.image} alt={portfolio.profile.alt} width="400" height="420" onError={() => setBroken(true)} /> : <div className="monogram-portrait" aria-label="MN monogram, profile photo placeholder"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="monogram-text">mn<span>.</span></span><span className="portrait-caption">A LITTLE CURIOUS. ALWAYS BUILDING.</span></div>}
            <span className="floating-tech react-tech" aria-hidden="true"><Atom size={25} /></span><span className="floating-tech js-tech" aria-hidden="true"><Braces size={23} /></span>
            {portfolio.profile.placeholder && <span className="avatar-label">ILLUSTRATED AVATAR</span>}
          </div>
          <div className="profile-bottom"><div><strong>{portfolio.name}</strong><span>React & JavaScript</span></div><span className="profile-stamp">&lt;/&gt;</span></div>
        </div>
        <div className="code-note" aria-hidden="true"><span className="code-note-label">a little about me.js</span><code><span className="code-muted">const</span> developer = {'{'}<br />&nbsp; mindset: <span className="code-accent">'always learning'</span>,<br />&nbsp; details: <span className="code-accent">'they matter'</span><br />{'}'};</code></div>
      </div>
      <div className="hero-baseline">
        {portfolio.availability.enabled && <span className="availability"><span className="status-dot" />{portfolio.availability.text}</span>}
        <span className="location"><MapPin size={14} />{portfolio.location}</span>
        <a className="scroll-cue" href="#projects">SCROLL TO EXPLORE <ArrowDown size={16} /></a>
      </div>
    </div>
  </section>;
}
