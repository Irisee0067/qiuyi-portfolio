import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    const animations = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => {
      if (reducedMotion) return;
      const inner = dialog.querySelector('.dialog-inner');
      const image = dialog.querySelector('.dialog-image');
      const cover = dialog.querySelector('.dialog-image > img');
      const copyItems = dialog.querySelectorAll('.dialog-copy > .eyebrow, .dialog-copy > h2, .dialog-subtitle, .dialog-copy > .body-copy, .project-facts, .project-note');
      animations.push(
        dialog.animate([
          { opacity: 0, transform: 'translateY(34px) scale(.975)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ], { duration: 720, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }),
        inner.animate([
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)' },
        ], { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }),
      );
      if (image) animations.push(image.animate([
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)' },
      ], { duration: 1050, delay: 170, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
      if (cover) animations.push(cover.animate([
        { transform: 'scale(1.12)' },
        { transform: 'scale(1)' },
      ], { duration: 1350, delay: 170, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
      copyItems.forEach((item, index) => animations.push(item.animate([
        { opacity: 0, transform: 'translateY(42px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 680, delay: 420 + index * 75, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' })));
    });
    return () => {
      cancelAnimationFrame(frame);
      animations.forEach(animation => animation.cancel());
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);
  const facts = project?.facts || [{ label: '参与角色', value: project?.role }, { label: '工作内容', value: project?.scope }];
  return <dialog ref={ref} className={`project-dialog ${project?.gallery ? 'project-dialog-gallery' : ''}`} aria-labelledby="project-dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    {project && <div className="dialog-inner">
      <div className="dialog-toolbar"><span>{project.title} <small>/ {project.category}</small></span><button className="dialog-close" onClick={onClose} aria-label="关闭项目详情" autoFocus><X size={21} /></button></div>
      <div className={`dialog-image ${project.coverClassName || ''}`}><img src={project.image} alt={project.imageAlt} decoding="async" />{project.imageNote && <span className="image-note">{project.imageNote}</span>}</div>
      <div className="dialog-copy">
        <span className="eyebrow orange">{project.english} / {project.year || project.category}</span>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-subtitle">{project.subtitle}</p>
        <p className="body-copy">{project.description}</p>
        <dl className="project-facts">{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        {project.note && <p className="project-note">{project.note}</p>}
        {project.gallery && <div className="project-gallery" aria-label={`${project.title}完整作品展板`}>
          <div className="gallery-heading"><h3>作品全貌</h3><span>{String(project.gallery.length).padStart(2, '0')} BOARDS</span></div>
          {project.gallery.map((board, index) => <figure className="gallery-board" key={board.src}>
            <figcaption><div><span className="eyebrow orange">{String(index + 1).padStart(2, '0')} /</span><h4>{board.title}</h4><p>{board.description}</p></div><a href={board.src} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${board.title}（新标签页）`}>查看大图 <ArrowUpRight size={15} /></a></figcaption>
            <a className="gallery-image-link" href={board.src} target="_blank" rel="noopener noreferrer" aria-label={`放大${project.title}展板${index + 1}（新标签页）`}><img src={board.src} alt={`${project.title} — ${board.title}：${board.description}`} width={board.width} height={board.height} loading="lazy" decoding="async" /></a>
          </figure>)}
        </div>}
        <a className="text-link" href="mailto:qiuyi.067@outlook.com">交流项目细节 <ArrowUpRight size={17} /></a>
      </div>
    </div>}
  </dialog>;
}
