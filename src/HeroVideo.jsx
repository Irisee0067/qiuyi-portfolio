import HalftoneReveal from './HalftoneReveal.jsx';

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
    <span className="hero-interaction-note">MOVE TO REVEAL · HALFTONE FIELD</span>
  </div>;
}
