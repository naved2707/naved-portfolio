import { Command, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { SocialLinks } from './UI.jsx';

export default function Footer({ onCommand }) {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><a href="#home" className="footer-brand"><span className="wordmark">n<span>.</span></span><div><strong>{portfolio.name}</strong><span>{portfolio.title}</span></div></a><div className="footer-links"><a href="#projects">Selected work <ArrowUpRight size={14} /></a><a href="#about">About me <ArrowUpRight size={14} /></a><a href="#contact">Contact <ArrowUpRight size={14} /></a></div><SocialLinks /></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {portfolio.name}</span><span>Made with React. Built with intention.</span><button className="text-button command-footer" onClick={onCommand}><Command size={14} />Quick navigation <kbd>⌘ / Ctrl K</kbd></button></div></div></footer>;
}
