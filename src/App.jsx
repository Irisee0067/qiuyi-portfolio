import { ArrowUpRight, ArrowDown, Plus, Menu, X, Layers3, Aperture, Clapperboard, Sparkles, Copy, Check } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences, capabilities } from './content.js';
import WorkSection from './WorkSection.jsx';
import ProjectDialog from './ProjectDialog.jsx';
import HeroVideo from './HeroVideo.jsx';
import ClickSpark from './ClickSpark.jsx';

const nav = [{ id: 'about', label: '关于', n: '01' }, { id: 'work', label: '作品', n: '02' }, { id: 'expertise', label: '能力', n: '03' }];
const toolboxItems = ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'Final Cut Pro', 'Canva', '视觉排版', '图像处理', '品牌包装', '信息可视化', '摄影摄像', '视频剪辑', 'AI 创意'];
const secondaryAwards = [
  ['2025.12', '“白鹭齐飞 夏耕树人”实践活动 · 优秀学生'],
  ['2025.10', '“绿水青山号”公交车身创意征集 · 优秀奖'],
  ['2025.09', '“繁华姑苏杯”文创精英挑战赛 · 文创精英奖'],
  ['2023.09—2024.06', '公益服务奖学金'],
];

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const pageRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copyState, setCopyState] = useState('');
  const icons = { layout: Layers3, brand: Aperture, film: Clapperboard, ai: Sparkles };
  async function copyEmail() {
    try { await navigator.clipboard.writeText('qiuyi.067@outlook.com'); setCopyState('copied'); }
    catch { setCopyState('error'); }
  }
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionMedia = gsap.matchMedia();
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.opening-screen', { display: 'none' });
        return;
      }

      document.body.classList.add('is-opening');
      const opening = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
        onComplete: () => {
          document.body.classList.remove('is-opening');
          ScrollTrigger.refresh();
        }
      });
      opening
        .set('.opening-screen', { autoAlpha: 1 })
        .fromTo('.opening-word span',
          { yPercent: 125, skewY: 8, scaleY: 1.35 },
          { yPercent: 0, skewY: 0, scaleY: 1, duration: 1.35, stagger: 0.11 }, 0.15)
        .fromTo('.opening-progress span', { scaleX: 0 }, { scaleX: 1, duration: 1.45, ease: 'power4.inOut' }, 0.18)
        .to('.opening-word span', { yPercent: -125, skewY: -5, duration: 1.05, stagger: 0.06 }, 1.55)
        .to('.opening-screen', { clipPath: 'inset(0 0 100% 0)', duration: 1.35 }, 1.75)
        .fromTo('.header', { yPercent: -110 }, { yPercent: 0, duration: 1.05 }, 2.05)
        .fromTo('.hero-heading-meta', { y: 42, clipPath: 'inset(100% 0 0 0)' }, { y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.05 }, 2.1)
        .fromTo('.hero-main-word', { yPercent: 70, scaleY: 0.5, clipPath: 'inset(100% 0 0 0)' }, { yPercent: 0, scaleY: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.35 }, 2.18)
        .fromTo('.hero h1 .outline', { xPercent: -24, scaleX: 0.58, clipPath: 'inset(0 100% 0 0)' }, { xPercent: 0, scaleX: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.35 }, 2.35)
        .fromTo('.hero-media', { xPercent: 18, scale: 0.9, clipPath: 'inset(0 0 100% 0)' }, { xPercent: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.55 }, 2.25)
        .fromTo('.hero-caption', { y: 52, clipPath: 'inset(100% 0 0 0)' }, { y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.05 }, 2.75)
        .fromTo('.hero-bottom', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 3.05)
        .set('.opening-screen', { display: 'none' });

      gsap.utils.toArray('.section').forEach(section => {
        const ghostTitle = section.querySelector('.section-ghost-title');
        const sectionTop = section.querySelector('.section-top');
        const leadHeading = section.querySelector('.about-copy > h2, .work-heading > h2, .expertise-heading > h2, .contact-lead');
        const cards = section.querySelectorAll('.portrait, .award-strip, .secondary-awards, .project-card, .capability, .toolbox, .email-row, .contact-info');

        if (ghostTitle) {
          gsap.fromTo(ghostTitle,
            { xPercent: -38, scaleX: 1.35, opacity: 0 },
            { xPercent: 0, scaleX: 1, opacity: 1, duration: 1.7, ease: 'expo.out', scrollTrigger: { trigger: section, start: 'top 82%', once: true } });
        }
        if (sectionTop) {
          gsap.fromTo(sectionTop,
            { y: 54, clipPath: 'inset(100% 0 0 0)' },
            { y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: sectionTop, start: 'top 88%', once: true } });
        }
        if (leadHeading) {
          gsap.fromTo(leadHeading,
            { y: 100, scaleY: 0.65, clipPath: 'inset(100% 0 0 0)', transformOrigin: 'bottom left' },
            { y: 0, scaleY: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.45, ease: 'expo.out', scrollTrigger: { trigger: leadHeading, start: 'top 88%', once: true } });
        }
        if (cards.length) {
          gsap.fromTo(cards,
            { y: 92, clipPath: 'inset(0 0 100% 0)' },
            { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.25, stagger: 0.13, ease: 'power4.out', scrollTrigger: { trigger: cards[0], start: 'top 88%', once: true }, onComplete: () => gsap.set(cards, { clearProps: 'clipPath,transform' }) });
        }
      });

      const statCells = gsap.utils.toArray('#about .stats > div');
      if (statCells.length) {
        const statsMotion = gsap.timeline({
          scrollTrigger: { trigger: '#about .stats', start: 'top 96%', end: 'bottom 4%', scrub: 1.15 }
        });
        statsMotion
          .fromTo(statCells,
            { y: 120, autoAlpha: 0, rotateX: -18, transformPerspective: 900, transformOrigin: '50% 100%' },
            { y: 0, autoAlpha: 1, rotateX: 0, duration: 0.38, stagger: 0.065, ease: 'power4.out' })
          .to({}, { duration: 0.28 })
          .to(statCells, { y: -64, autoAlpha: 0, rotateX: 10, duration: 0.25, stagger: 0.035, ease: 'power2.in' });
      }

      const journeyHeading = document.querySelector('#about .experience-heading');
      const journeyRows = gsap.utils.toArray('#about .experience-row');
      if (journeyHeading && journeyRows.length) {
        const journeyMotion = gsap.timeline({
          scrollTrigger: { trigger: '#about .experience-grid', start: 'top 94%', end: 'bottom 6%', scrub: 1.2 }
        });
        journeyMotion
          .fromTo(journeyHeading,
            { x: -110, y: 70, autoAlpha: 0, rotate: -2.5 },
            { x: 0, y: 0, autoAlpha: 1, rotate: 0, duration: 0.34, ease: 'power4.out' })
          .fromTo(journeyRows,
            { x: 130, y: 55, autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' },
            { x: 0, y: 0, autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.4, stagger: 0.055, ease: 'power4.out' }, 0.08)
          .to({}, { duration: 0.25 })
          .to(journeyHeading, { x: -70, y: -45, autoAlpha: 0, duration: 0.24, ease: 'power2.in' })
          .to(journeyRows, { x: 70, y: -42, autoAlpha: 0, duration: 0.25, stagger: 0.035, ease: 'power2.in' }, '<0.03');
      }

      motionMedia.add('(min-width: 821px)', () => {
        gsap.utils.toArray('.project-image > img').forEach(image => {
          gsap.fromTo(image, { yPercent: -4, scale: 1.07 }, {
            yPercent: 5,
            scale: 1.07,
            ease: 'none',
            scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.1 }
          });
        });
      });
    }, pageRef);

    return () => {
      document.body.classList.remove('is-opening');
      motionMedia.revert();
      context.revert();
    };
  }, []);

  return <ClickSpark sparkColor="#b52a35" sparkSize={11} sparkRadius={25} sparkCount={8} duration={560}>
  <div ref={pageRef} className="site-shell">
    <div className="opening-screen" aria-hidden="true">
      <div className="opening-meta"><span>QIUYI GU</span><span>PORTFOLIO · 2026</span></div>
      <div className="opening-word"><span>CREATIVE</span><span className="opening-italic">MOTION</span></div>
      <div className="opening-progress"><span /></div>
    </div>
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
          <div className="hero-heading-meta"><div className="eyebrow hero-eyebrow"><span className="status-dot" /> PORTFOLIO / 01</div><span>VISUAL · BRAND · AI</span></div>
          <h1 id="hero-heading"><span className="hero-main-word">DESIGN</span><span className="outline">BEYOND<span className="orange hero-period">.</span></span></h1>
          <div className="hero-caption"><span className="caption-line" /><div><p>让想象，成为可见。</p><span>顾邱宜 · 视觉设计师 / AI 设计师 / 品牌设计师</span></div></div>
        </div>
        <div className="hero-bottom container"><a className="scroll-link" href="#about"><span className="scroll-icon"><ArrowDown size={15} /></span>向下探索 <span className="muted">SCROLL TO DISCOVER</span></a><span className="hero-index">PORTFOLIO — 2026 <span className="orange">©</span></span></div>
        <span className="hero-side">BASED IN HUZHOU, CHINA</span>
        <div className="hero-scatter" aria-hidden="true"><span>TYPE / IMAGE / MOTION</span><span>AN ARCHIVE OF<br />VISIBLE IDEAS</span><span>ISSUE 01 — 26</span></div>
      </section>
      <section id="about" className="about section container">
        <span className="section-ghost-title" aria-hidden="true">ABOUT</span>
        <div className="section-top"><span className="eyebrow"><span className="orange">01 /</span> ABOUT ME</span><span className="section-top-note">好设计，始于好奇心。</span></div>
        <div className="about-grid"><div className="about-copy"><h2>理性的秩序，<br /><span className="secondary">感性的表达。</span><span className="orange">*</span></h2><p className="intro">你好，我是顾邱宜。<br />一名在视觉、品牌与 AI 之间探索的设计师。</p><p className="body-copy">就读于湖州学院视觉传达设计专业。我关注图形、文字与影像之间的关系，也相信设计的价值，在于让复杂的信息被清晰感知，让品牌的个性被真实看见。</p><p className="body-copy">从融媒体影像制作到企业视觉传播，将审美判断落实到每一张画面、每一次叙事与每一个细节。</p><a className="text-link" href="mailto:qiuyi.067@outlook.com">qiuyi.067@outlook.com <ArrowUpRight size={17} /></a></div><figure className="portrait"><img src="/assets/about-portrait.webp" alt="顾邱宜个人生活照" loading="lazy" decoding="async" /><figcaption><span>顾邱宜<br /><small>QIUYI GU</small></span><span className="portrait-mark">g<span className="orange">.</span></span></figcaption><span className="portrait-tag">THE MIND BEHIND THE WORK</span></figure></div>
        <div className="stats"><div><strong>03<span>段</span></strong><p>设计与融媒体实习</p></div><div><strong>02<span>项</span></strong><p>米兰设计周全国 / 省级二等奖</p></div><div><strong>4.13<span>/ 5.0</span></strong><p>视觉传达设计专业 GPA</p></div><div className="education"><span className="eyebrow">EDUCATION</span><p>湖州学院 · 视觉传达设计</p><span className="muted">2023.09 — 2027.06（预计毕业）</span></div></div>
        <div className="experience-grid"><div className="experience-heading"><span className="eyebrow">THE JOURNEY</span><h3>每一步，<br />都成为设计的一部分。</h3><p className="body-copy">在真实项目里观察、学习、实践。</p></div><div className="experience-list">{experiences.map((experience, index) => <details className="experience-row" key={experience.date} open={index === 0 ? true : undefined}><summary><span className="experience-date">{experience.date}</span><span className="experience-title">{experience.company}<small>{experience.role}</small></span><Plus size={16} /></summary><div className="experience-detail"><p>{experience.description}</p><span>{experience.skills}</span></div></details>)}</div></div>
        <div className="award-strip"><span className="award-star" aria-hidden="true">✳</span><div><span className="eyebrow">RECOGNITION / 2026</span><p>米兰设计周 · 中国高校设计学科师生优秀作品展</p></div><span className="award-result">全国决赛二等奖<br /><span className="muted">浙江省二等奖</span></span></div>
        <div className="secondary-awards" aria-label="其他奖项与荣誉"><span className="eyebrow">ADDITIONAL MENTIONS</span><div>{secondaryAwards.map(([date, title]) => <p key={date}><time>{date}</time><span>{title}</span></p>)}</div></div>
      </section>
      <WorkSection onSelect={setSelectedProject} />
      <section className="expertise section container" id="expertise"><span className="section-ghost-title" aria-hidden="true">EXPERTISE</span><div className="section-top"><span className="eyebrow"><span className="orange">03 /</span> WHAT I BRING</span><span className="section-top-note">跨越工具，回到创意本身。</span></div><div className="expertise-heading"><h2>不止一种视角，<br /><span className="secondary">不设限的创造力。</span></h2><p className="body-copy">让不同能力相互连接，<br />从一个想法，走向完整的视觉表达。</p></div><div className="capabilities">{capabilities.map(capability => { const Icon = icons[capability.icon]; return <article className="capability" key={capability.id}><div className="capability-top"><Icon size={31} strokeWidth={1} /><span>/{capability.id}</span></div><span className="eyebrow">{capability.english}</span><h3>{capability.title}</h3><p>{capability.description}</p><div className="capability-tags">{capability.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>; })}</div><div className="toolbox"><span className="eyebrow">MY EVERYDAY TOOLBOX</span><div className="toolbox-marquee" aria-label={`常用软件与能力：${toolboxItems.join('、')}`}><div className="toolbox-track">{[...toolboxItems, ...toolboxItems].map((item, index) => <span aria-hidden={index >= toolboxItems.length ? 'true' : undefined} key={`${item}-${index}`}>{item}<i aria-hidden="true">✳</i></span>)}</div></div></div></section>
      <section className="contact section" id="contact"><span className="section-ghost-title" aria-hidden="true">CONTACT</span><div className="container"><div className="section-top"><span className="eyebrow"><span className="orange">04 /</span> LET’S CONNECT</span><span className="contact-invitation"><span className="status-dot" /> 欢迎设计交流与合作</span></div><div className="contact-display contact-lead" aria-hidden="true">LET’S TALK<span className="orange">.</span><a href="mailto:qiuyi.067@outlook.com" tabIndex={-1} className="contact-orb"><ArrowUpRight strokeWidth={1} /></a></div><h2>下一个好想法，<span className="secondary">从一句你好开始。</span></h2><div className="email-row"><a href="mailto:qiuyi.067@outlook.com" className="big-email">qiuyi.067@outlook.com <ArrowUpRight /></a><button className="copy-button" onClick={copyEmail} aria-label="复制邮箱">{copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}</button></div><div className="copy-feedback" role="status">{copyState === 'copied' ? '邮箱已复制，期待你的来信。' : copyState === 'error' ? '请长按或选中上方邮箱复制，也可以点击邮箱直接发送邮件。' : ''}</div><div className="contact-info"><a href="tel:+8619818159967">+86 198 1815 9967 <ArrowUpRight size={13} /></a><span>中国 · 浙江 · 湖州</span><span className="contact-signature">GOOD DESIGN STARTS WITH A CONVERSATION.</span></div></div></section>
    </main>
    <footer className="container"><span>© 2026 顾邱宜 QIUYI GU</span><span>MADE WITH INTENTION.</span><a href="#home">回到顶部 ↑</a></footer>
    <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>
  </ClickSpark>;
}
