import { ArrowUpRight, ArrowDown, Plus, Menu, X, Layers3, Aperture, Clapperboard, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { experiences, projects, capabilities } from './content.js';
import ProjectDialog from './ProjectDialog.jsx';
import HeroVideo from './HeroVideo.jsx';

const nav = [{ id: 'about', label: '关于', n: '01' }, { id: 'work', label: '作品', n: '02' }, { id: 'expertise', label: '能力', n: '03' }];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('全部');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copyState, setCopyState] = useState('');
  const icons = { layout: Layers3, brand: Aperture, film: Clapperboard, ai: Sparkles };
  const filteredProjects = filter === '全部' ? projects : projects.filter(project => project.category === filter);
  const projectCount = category => String(category === '全部' ? projects.length : projects.filter(project => project.category === category).length).padStart(2, '0');
  async function copyEmail() {
    try { await navigator.clipboard.writeText('qiuyi.067@outlook.com'); setCopyState('copied'); }
    catch { setCopyState('error'); }
  }
  return <>
    <a className="skip-link" href="#about">跳到正文</a>
    <header className="header">
      <a className="wordmark" href="#home" aria-label="顾邱宜，返回首页">qiuyi<span className="orange">.</span><span className="brand-descriptor">INDEPENDENT<br />CREATIVE MIND</span></a>
      <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="主导航">{nav.map(item => <a href={`#${item.id}`} key={item.id} onClick={() => setMenuOpen(false)}>{item.label}<sup>{item.n}</sup></a>)}</nav>
      <a className="contact-button" href="#contact">聊聊新想法 <ArrowUpRight size={16} /></a>
      <button className="menu-button" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <main>
      <section className="hero" id="home" aria-labelledby="hero-heading">
        <div className="hero-atmosphere" aria-hidden="true" />
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-content container">
          <div className="eyebrow hero-eyebrow"><span className="status-dot" /> A MIND IN MOTION. A WORLD IN DESIGN.</div>
          <h1 id="hero-heading">DESIGN<br /><span className="outline">BEYOND</span><span className="orange hero-period">.</span></h1>
          <div className="hero-caption"><span className="caption-line" /><div><p>让想象，成为可见。</p><span>顾邱宜 · 视觉设计师 / AI 设计师 / 品牌设计师</span></div></div>
        </div>
        <div className="hero-bottom container"><a className="scroll-link" href="#about"><span className="scroll-icon"><ArrowDown size={15} /></span>向下探索 <span className="muted">SCROLL TO DISCOVER</span></a><span className="hero-index">PORTFOLIO — 2026 <span className="orange">©</span></span></div>
        <span className="hero-side">BASED IN HUZHOU, CHINA</span>
      </section>
      <section id="about" className="about section container">
        <div className="section-top"><span className="eyebrow"><span className="orange">01 /</span> ABOUT ME</span><span className="section-top-note">好设计，始于好奇心。</span></div>
        <div className="about-grid"><div className="about-copy"><h2>理性的秩序，<br /><span className="secondary">感性的表达。</span><span className="orange">*</span></h2><p className="intro">你好，我是顾邱宜。<br />一名在视觉、品牌与 AI 之间探索的设计师。</p><p className="body-copy">就读于湖州学院视觉传达设计专业。我关注图形、文字与影像之间的关系，也相信设计的价值，在于让复杂的信息被清晰感知，让品牌的个性被真实看见。</p><p className="body-copy">从融媒体影像制作到企业视觉传播，将审美判断落实到每一张画面、每一次叙事与每一个细节。</p><a className="text-link" href="mailto:qiuyi.067@outlook.com">qiuyi.067@outlook.com <ArrowUpRight size={17} /></a></div><figure className="portrait"><img src="/assets/portrait.jpg" alt="顾邱宜个人头像" /><figcaption><span>顾邱宜<br /><small>QIUYI GU</small></span><span className="portrait-mark">g<span className="orange">.</span></span></figcaption><span className="portrait-tag">THE MIND BEHIND THE WORK</span></figure></div>
        <div className="stats"><div><strong>03<span>段</span></strong><p>设计与融媒体实习</p></div><div><strong>02<span>项</span></strong><p>米兰设计周全国 / 省级二等奖</p></div><div><strong>4.12<span>/ 5.0</span></strong><p>视觉传达设计专业 GPA</p></div><div className="education"><span className="eyebrow">EDUCATION</span><p>湖州学院 · 视觉传达设计</p><span className="muted">2023.09 — 2027.06（预计毕业）</span></div></div>
        <div className="experience-grid"><div className="experience-heading"><span className="eyebrow">THE JOURNEY</span><h3>每一步，<br />都成为设计的一部分。</h3><p className="body-copy">在真实项目里观察、学习、实践。</p></div><div className="experience-list">{experiences.map((experience, index) => <details className="experience-row" key={experience.date} open={index === 0 ? true : undefined}><summary><span className="experience-date">{experience.date}</span><span className="experience-title">{experience.company}<small>{experience.role}</small></span><Plus size={16} /></summary><div className="experience-detail"><p>{experience.description}</p><span>{experience.skills}</span></div></details>)}</div></div>
        <div className="award-strip"><span className="award-star" aria-hidden="true">✳</span><div><span className="eyebrow">RECOGNITION / 2026</span><p>米兰设计周 · 中国高校设计学科师生优秀作品展</p></div><span className="award-result">全国决赛二等奖<br /><span className="muted">浙江省二等奖</span></span></div>
      </section>
      <section className="work section" id="work"><div className="container"><div className="section-top"><span className="eyebrow"><span className="orange">02 /</span> SELECTED WORK</span><span className="section-top-note">从想法出发，让设计发生。</span></div><div className="work-heading"><h2>以设计，<br /><span className="secondary">回应世界。</span></h2><div className="work-intro"><p className="body-copy">用视觉连接信息与感受。<br />这里记录实践，也收集新的可能。</p><span className="small-note">首版展示：项目说明源自简历，封面为 AI 示意。</span></div></div><div className="work-filter" aria-label="筛选项目类别">{['全部', '品牌传播', '动态影像', 'AI 探索'].map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)} className={filter === category ? 'active' : ''}>{category}<sup>{projectCount(category)}</sup></button>)}<span className="work-count" aria-live="polite">{String(filteredProjects.length).padStart(2, '0')} PROJECTS</span></div><div className={`projects ${filter !== '全部' ? 'is-filtered' : ''}`}>{filteredProjects.map(project => <article className={`project-card ${project.className}`} key={project.id}><button className="project-image" onClick={() => setSelectedProject(project)} aria-label={`查看项目：${project.title}`}><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-number">/{project.number}</span><span className="project-cover-type">{project.category.toUpperCase()} — {project.year}</span><span className="project-cover-title">{project.english}</span><span className="image-note">{project.imageNote}</span><span className="project-arrow"><ArrowUpRight size={23} /></span></button><div className="project-meta"><div><h3><button onClick={() => setSelectedProject(project)}>{project.title}</button></h3><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="project-year">{project.year}</span></div></article>)}</div><div className="work-end"><span>IDEAS TAKE MANY FORMS.</span><a className="text-link" href="#contact">更多可能，与你一起创造 <ArrowUpRight size={16} /></a></div></div></section>
      <section className="expertise section container" id="expertise"><div className="section-top"><span className="eyebrow"><span className="orange">03 /</span> WHAT I BRING</span><span className="section-top-note">跨越工具，回到创意本身。</span></div><div className="expertise-heading"><h2>不止一种视角，<br /><span className="secondary">不设限的创造力。</span></h2><p className="body-copy">让不同能力相互连接，<br />从一个想法，走向完整的视觉表达。</p></div><div className="capabilities">{capabilities.map(capability => { const Icon = icons[capability.icon]; return <article className="capability" key={capability.id}><div className="capability-top"><Icon size={31} strokeWidth={1} /><span>/{capability.id}</span></div><span className="eyebrow">{capability.english}</span><h3>{capability.title}</h3><p>{capability.description}</p><div className="capability-tags">{capability.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>; })}</div><div className="toolbox"><span className="eyebrow">MY EVERYDAY TOOLBOX</span><div><span>Photoshop</span><span>Premiere Pro</span><span>After Effects</span><span>Final Cut Pro</span><span>Canva</span></div></div></section>
      <section className="contact section" id="contact"><div className="container"><div className="section-top"><span className="eyebrow"><span className="orange">04 /</span> LET’S CONNECT</span><span className="contact-invitation"><span className="status-dot" /> 欢迎设计交流与合作</span></div><div className="contact-display" aria-hidden="true">LET’S TALK<span className="orange">.</span><a href="mailto:qiuyi.067@outlook.com" tabIndex={-1} className="contact-orb"><ArrowUpRight strokeWidth={1} /></a></div><h2>下一个好想法，<span className="secondary">从一句你好开始。</span></h2><div className="email-row"><a href="mailto:qiuyi.067@outlook.com" className="big-email">qiuyi.067@outlook.com <ArrowUpRight /></a><button className="copy-button" onClick={copyEmail} aria-label="复制邮箱">{copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}</button></div><div className="copy-feedback" role="status">{copyState === 'copied' ? '邮箱已复制，期待你的来信。' : copyState === 'error' ? '请长按或选中上方邮箱复制，也可以点击邮箱直接发送邮件。' : ''}</div><div className="contact-info"><a href="tel:+8619818159967">+86 198 1815 9967 <ArrowUpRight size={13} /></a><span>中国 · 浙江 · 湖州</span><span className="contact-signature">GOOD DESIGN STARTS WITH A CONVERSATION.</span></div></div></section>
    </main>
    <footer className="container"><span>© 2026 顾邱宜 QIUYI GU</span><span>MADE WITH INTENTION.</span><a href="#home">回到顶部 ↑</a></footer>
    <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
  </>;
}

