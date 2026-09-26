import { useState } from 'react';
import './ProjectScreenshots.css';
import { ArrowUpRight, Check, Circle, Search, ShoppingBag, LayoutGrid, Plus, MapPin, FileSpreadsheet, BookOpen, ImageOff } from 'lucide-react';

function ScreenshotPreview({ project, gallery }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState({});
  const screenshot = project.screenshots[selected] || project.screenshots[0];
  return <div className={`project-screenshots ${gallery ? 'screenshot-gallery' : 'screenshot-card'}`}>
    <figure className="screenshot-figure">
      <div className="screenshot-surface">
        {failed[screenshot.src] ? <div className="screenshot-unavailable"><ImageOff size={28} aria-hidden="true" /><span>Screenshot unavailable</span><span>Explore the project details below.</span></div> : <img key={screenshot.src} src={screenshot.src} alt={screenshot.alt} loading="lazy" decoding="async" width="1348" height="926" onError={() => setFailed(current => ({ ...current, [screenshot.src]: true }))} />}
      </div>
      {gallery ? <figcaption aria-live="polite">{screenshot.caption}</figcaption> : <figcaption className="screenshot-badge">Actual portfolio screenshot</figcaption>}
    </figure>
    {gallery && <div className="screenshot-controls"><div className="screenshot-options" role="group" aria-label="Portfolio screenshots">{project.screenshots.map((item, index) => <button type="button" key={item.src} className={`screenshot-option ${selected === index ? 'selected' : ''}`} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}</div>{!failed[screenshot.src] && <a href={screenshot.src} target="_blank" rel="noopener noreferrer" className="screenshot-original">Open full-size image <ArrowUpRight size={16} /></a>}</div>}
  </div>;
}

export default function ProjectPreview({ project, gallery = false }) {
  const [failed, setFailed] = useState(false);
  if (project.screenshots?.length) return <ScreenshotPreview key={project.id} project={project} gallery={gallery} />;
  if (project.image && !failed) return <div className={`project-preview tone-${project.tone}`}><img src={project.image} alt={project.imageAlt} loading="lazy" width="960" height="650" onError={() => setFailed(true)} /></div>;
  return <div className={`project-preview tone-${project.tone}`}>
    <div className={`mini-window preview-${project.preview}`} aria-hidden="true">
      <div className="mini-toolbar"><span /><span /><span /><div>{project.preview === 'shop' ? 'easybuy / discover' : project.preview === 'books' ? 'the reading room' : project.preview === 'tasks' ? 'a little more done' : project.preview === 'cms' ? 'portfolio / studio' : 'rows → places'}</div><ArrowUpRight size={12} /></div>
      {project.preview === 'shop' && <div className="shop-preview"><div className="shop-nav"><b>easybuy<span>®</span></b><span>New in&nbsp;&nbsp; Women&nbsp;&nbsp; Men</span><ShoppingBag size={15} /></div><div className="shop-banner"><span>EVERYDAY, ELEVATED.</span><strong>Less searching.<br />More finding.</strong><span className="mini-cta">Discover the collection ↗</span><div className="shop-badge">Good<br />finds.</div></div><div className="shop-categories"><span>01 / Essentials</span><span>02 / Everyday</span><span>03 / New arrivals</span></div></div>}
      {project.preview === 'books' && <div className="books-preview"><div className="books-header"><BookOpen size={17} /><b>The Reading Room</b></div><h4>Your next chapter<br />starts here.</h4><div className="mini-search"><Search size={12} /><span>Find a little inspiration…</span></div><div className="book-spines"><div><span>DESIGN</span><b>The Art<br />of Less</b></div><div><span>FICTION</span><b>Somewhere<br />New</b></div><div><span>IDEAS</span><b>Stay<br />Curious</b></div></div></div>}
      {project.preview === 'tasks' && <div className="tasks-preview"><span className="mini-eyebrow">MAKE SPACE FOR WHAT MATTERS</span><h4>A little more done<span>.</span></h4><div className="task-summary"><b>Today’s focus</b><span>2 of 3 completed</span></div><div className="task-progress"><span /></div>{['Sketch an idea', 'Build something useful', 'Make it a little better'].map((text, i) => <div key={text} className={`mini-task ${i < 2 ? 'done' : ''}`}>{i < 2 ? <Check size={14} /> : <Circle size={14} />}<span>{text}</span></div>)}<div className="mini-add"><Plus size={14} /> A new possibility</div></div>}
      {project.preview === 'cms' && <div className="cms-preview"><div className="cms-side"><LayoutGrid size={19} /><span /><span /><span /></div><div className="cms-main"><span className="mini-eyebrow">YOUR CREATIVE SPACE</span><h4>A home for your work.</h4><div className="cms-heading"><b>Project collection</b><span>+ New project</span></div><div className="cms-tiles"><div><span>01</span><b>Selected work</b></div><div><span>02</span><b>Fresh ideas</b></div></div><div className="cms-line" /><div className="cms-line short" /></div></div>}
      {project.preview === 'data' && <div className="data-preview"><div className="data-title"><FileSpreadsheet size={20} /><b>Rows → Places</b></div><h4>A fresh view of your data.</h4><div className="data-columns"><div className="data-rows"><span>LOCATION <span>LATITUDE</span></span><span>Sample A <span>21.15</span></span><span>Sample B <span>18.52</span></span><span>Sample C <span>19.07</span></span></div><div className="location-grid"><MapPin size={32} /><span>Location preview</span></div></div><span className="mini-eyebrow">EXPLORATION / CONCEPT</span></div>}
    </div>
    <span className="preview-caption">{failed ? 'Image unavailable · Interface concept' : 'Interface concept'}</span>
  </div>;
}
