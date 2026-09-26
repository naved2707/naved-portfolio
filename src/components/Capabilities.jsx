import { Layout, Layers, Plug, PanelTop } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';

const icons = { Layout, Layers, Plug, PanelTop };
export default function Capabilities() {
  return <section id="capabilities" className="section capabilities-section"><div className="container"><div className="capabilities-header" data-reveal><p className="eyebrow"><span>05</span>WHAT I CAN HELP BUILD</p><h2>Good ideas deserve<br /><span className="muted-heading">a great interface.</span></h2></div><div className="capability-grid">{portfolio.capabilities.map(item => { const Icon = icons[item.icon]; return <article key={item.title} data-reveal><Icon size={27} /><h3>{item.title}</h3><p>{item.text}</p><span>{item.tags}</span></article>; })}</div></div></section>;
}
