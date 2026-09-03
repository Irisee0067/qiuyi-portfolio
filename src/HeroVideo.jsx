import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (paused) ref.current?.pause();
    else ref.current?.play().catch(() => setPaused(true));
  }, [paused]);
  return <>
    <div className="hero-media" aria-hidden="true"><img className="hero-poster" src="/assets/hero-sculpture.png" alt="" fetchPriority="high" /><video ref={ref} muted loop playsInline autoPlay={!paused} preload="metadata" poster="/assets/hero-sculpture.png" onError={() => setUnavailable(true)}><source src="/assets/hero-loop.mp4" type="video/mp4" onError={() => setUnavailable(true)} /></video></div>
    {!unavailable && <button className="video-control" onClick={() => setPaused(value => !value)} aria-label={paused ? '播放背景视频' : '暂停背景视频'}>{paused ? <Play size={11} /> : <Pause size={11} />}<span>{paused ? 'PLAY MOTION' : 'PAUSE MOTION'}</span></button>}
  </>;
}
