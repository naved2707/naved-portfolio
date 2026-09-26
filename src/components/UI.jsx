import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, Download, Github, Instagram, Linkedin, Mail, Moon, Sun, MessageCircle } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { useTheme } from '../context/ThemeContext.jsx';
import { whatsappUrl } from '../utils/links.js';

export function WhatsAppLink({ compact = false }) {
  const href = whatsappUrl(portfolio.whatsapp);
  if (!href) return null;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={compact ? 'icon-button' : 'whatsapp-link'} aria-label={compact ? 'Chat with Naved on WhatsApp' : undefined}>
    <MessageCircle size={compact ? 20 : 24} />
    {!compact && <><span><strong>Chat on WhatsApp</strong><span>{portfolio.whatsapp.label}</span></span><ArrowUpRight size={19} /></>}
  </a>;
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title="Switch theme">{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>;
}
export function ResumeLink({ className = 'button button-outline', children = 'Download résumé' }) {
  if (!portfolio.resume.enabled || !portfolio.resume.url) return null;
  return <a className={className} href={portfolio.resume.url} download={portfolio.resume.filename}>{children}<Download size={16} /></a>;
}
export function SocialLinks({ labels = false }) {
  const links = [{ name: 'GitHub', url: portfolio.social.github, icon: Github }, { name: 'LinkedIn', url: portfolio.social.linkedin, icon: Linkedin }, { name: 'Instagram', url: portfolio.social.instagram, icon: Instagram }, { name: 'Email', url: portfolio.email ? `mailto:${portfolio.email}` : '', icon: Mail }].filter(link => link.url);
  if (!links.length) return null;
  return <div className="social-links">{links.map(({ name, url, icon: Icon }) => <a key={name} href={url} className={labels ? 'social-label' : 'icon-button'} aria-label={name} target={name === 'Email' ? undefined : '_blank'} rel="noopener noreferrer"><Icon size={18} />{labels && name}{labels && <ArrowUpRight size={15} />}</a>)}{!labels && <WhatsAppLink compact />}</div>;
}
export function SectionHeading({ number, eyebrow, title, children }) {
  return <div className="section-heading" data-reveal><div><p className="eyebrow"><span>{number}</span>{eyebrow}</p><h2>{title}</h2></div>{children && <div className="section-intro">{children}</div>}</div>;
}
export function ScrollProgress() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let frame;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
      setVisible(window.scrollY > 750);
    };
    const scroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('resize', scroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); };
  }, []);
  return <><div ref={ref} className="scroll-progress" aria-hidden="true" />{visible && <a className="back-to-top icon-button" href="#home" aria-label="Back to top"><ArrowUp size={20} /></a>}</>;
}
