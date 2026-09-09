import HalftoneReveal from './HalftoneReveal.jsx';
import DotGrid from './DotGrid.jsx';

export default function HeroVideo() {
  return <div className="hero-media hero-ripple">
    <img className="hero-poster" src="/assets/hero-background-palette.webp" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
    <HalftoneReveal
      src="/assets/hero-background-palette.webp"
      inkColor="#79a9c4"
      paperColor="#eeeadd"
      mode="duotone"
      dotSize={0.9}
      dotDensity={92}
      angle={28}
      shape="circle"
      contrast={1}
      revealRadius={0.3}
      edge={0.68}
      follow={0.42}
      idleReveal={0.72}
      trigger="hover"
      borderRadius="0"
      className="hero-ripple-canvas"
    />
    <DotGrid
      dotSize={4.8}
      gap={22}
      baseColor="#79a9c4"
      activeColor="#b52a35"
      proximity={190}
      speedTrigger={85}
      shockRadius={300}
      shockStrength={5.4}
      maxSpeed={2600}
      returnDuration={1.7}
      className="hero-dot-grid"
    />
    <span className="hero-interaction-note">MOVE · CLICK · DISTORT THE GRID</span>
  </div>;
}
