import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from './content.js';

const categories = ['全部', ...new Set(projects.map(project => project.category))];

export default function WorkSection({ onSelect }) {
  const [filter, setFilter] = useState('全部');
  const activeFilter = categories.includes(filter) ? filter : '全部';
  const filteredProjects = activeFilter === '全部' ? projects : projects.filter(project => project.category === activeFilter);
  const count = category => String(category === '全部' ? projects.length : projects.filter(project => project.category === category).length).padStart(2, '0');

  return <section className="work section" id="work">
    <span className="section-ghost-title" aria-hidden="true">WORKS</span>
    <div className="container">
      <div className="section-top">
        <span className="eyebrow"><span className="orange">02 /</span> SELECTED WORK</span>
        <span className="section-top-note">从想法出发，让设计发生。</span>
      </div>
      <div className="work-heading">
        <h2>以设计，<br /><span className="secondary">回应世界。</span></h2>
        <div className="work-intro">
          <p className="body-copy">用视觉连接信息与感受。<br />这里记录实践，也收集新的可能。</p>
          <span className="small-note">书籍、包装与信息可视化。点击作品，走进设计细节。</span>
        </div>
      </div>
      <div className="work-filter" aria-label="筛选项目类别">
        {categories.map(category => <button key={category} aria-pressed={activeFilter === category} onClick={() => setFilter(category)} className={activeFilter === category ? 'active' : ''}>{category}<sup>{count(category)}</sup></button>)}
        <span className="work-count" aria-live="polite">{String(filteredProjects.length).padStart(2, '0')} PROJECTS</span>
      </div>
      <div className={`projects ${activeFilter !== '全部' ? 'is-filtered' : ''}`}>
        {filteredProjects.map(project => <article className={`project-card ${project.className}`} key={project.id}>
          <button className={`project-image ${project.coverClassName || ''}`} onClick={() => onSelect(project)} aria-label={`查看项目：${project.title}`}>
            <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
            <span className="project-number">/{project.number}</span>
            <span className="project-cover-type">{project.category}{project.year && ` — ${project.year}`}</span>
            {project.showCoverTitle !== false && <span className="project-cover-title">{project.english}</span>}
            {project.imageNote && <span className="image-note">{project.imageNote}</span>}
            <span className="project-arrow"><ArrowUpRight size={23} /></span>
          </button>
          <div className="project-meta">
            <div><h3><button onClick={() => onSelect(project)}>{project.title}</button></h3><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            <span className="project-year">{project.year || project.discipline || project.category}</span>
          </div>
        </article>)}
      </div>
      <div className="work-end"><span>IDEAS TAKE MANY FORMS.</span><a className="text-link" href="#contact">更多可能，与你一起创造 <ArrowUpRight size={16} /></a></div>
    </div>
  </section>;
}
