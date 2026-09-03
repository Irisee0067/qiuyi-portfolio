import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [project]);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    {project && <div className="dialog-inner">
      <button className="dialog-close" onClick={onClose} aria-label="关闭项目详情"><X size={21} /></button>
      <div className="dialog-image"><img src={project.image} alt={project.imageAlt} /><span className="image-note">{project.imageNote}</span></div>
      <div className="dialog-copy"><span className="eyebrow orange">{project.english} / {project.year}</span><h2 id="project-dialog-title">{project.title}</h2><p className="dialog-subtitle">{project.subtitle}</p><p className="body-copy">{project.description}</p><dl className="project-facts"><div><dt>参与角色</dt><dd>{project.role}</dd></div><div><dt>工作内容</dt><dd>{project.scope}</dd></div></dl><p className="project-note">{project.note}</p><a className="text-link" href="mailto:qiuyi.067@outlook.com">交流项目细节 <ArrowUpRight size={17} /></a></div>
    </div>}
  </dialog>;
}
