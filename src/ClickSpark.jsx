import { useCallback, useEffect, useRef } from 'react';

const easingFunctions = {
  linear: value => value,
  'ease-in': value => value * value,
  'ease-in-out': value => (value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value),
  'ease-out': value => value * (2 - value),
};

export default function ClickSpark({
  sparkColor = '#b52a35',
  sparkSize = 10,
  sparkRadius = 24,
  sparkCount = 8,
  duration = 520,
  easing = 'ease-out',
  extraScale = 1,
  children,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animationRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const context = canvas.getContext('2d');
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => { reducedMotionRef.current = media.matches; };
    updateMotionPreference();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    media.addEventListener?.('change', updateMotionPreference);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      media.removeEventListener?.('change', updateMotionPreference);
      cancelAnimationFrame(animationRef.current);
    };
  }, [resizeCanvas]);

  const draw = useCallback(timestamp => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const ease = easingFunctions[easing] || easingFunctions['ease-out'];
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    sparksRef.current = sparksRef.current.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;
      const eased = ease(elapsed / duration);
      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
      context.globalAlpha = 1 - eased;
      context.strokeStyle = sparkColor;
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      return true;
    });
    context.globalAlpha = 1;
    if (sparksRef.current.length) animationRef.current = requestAnimationFrame(draw);
    else context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }, [duration, easing, extraScale, sparkColor, sparkRadius, sparkSize]);

  const handleClick = event => {
    if (reducedMotionRef.current || event.button > 0) return;
    const now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, index) => ({
      x: event.clientX,
      y: event.clientY,
      angle: (Math.PI * 2 * index) / sparkCount,
      startTime: now,
    })));
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(draw);
  };

  return (
    <div className="click-spark-root" onPointerDown={handleClick}>
      <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
      {children}
    </div>
  );
}
