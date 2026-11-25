import HalftoneReveal from './HalftoneReveal.jsx';
import DotGrid from './DotGrid.jsx';
import { assetUrl } from './assetUrl.js';

const heroBackground = assetUrl('assets/hero-background-palette.webp');

export default function HeroVideo() {
  return <div className="hero-media hero-ripple">
    <img className="hero-poster" src={heroBackground} alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
    <HalftoneReveal
      src={heroBackground}
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
      dotSize={5.2}
      gap={20}
      baseColor="#79a9c4"
      activeColor="#b52a35"
      proximity={225}
      speedTrigger={70}
      shockRadius={330}
      shockStrength={6.2}
      maxSpeed={2600}
      returnDuration={1.85}
      className="hero-dot-grid"
    />
    <span className="hero-interaction-note">MOVE · CLICK · DISTORT THE GRID</span>
  </div>;
}
