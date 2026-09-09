import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

import './DotGrid.css';

const hexToRgb = hex => {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return match
    ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
    : { r: 0, g: 0, b: 0 };
};

export default function DotGrid({
  dotSize = 4,
  gap = 28,
  baseColor = '#79a9c4',
  activeColor = '#b52a35',
  proximity = 140,
  speedTrigger = 115,
  shockRadius = 220,
  shockStrength = 3.5,
  maxSpeed = 2400,
  returnDuration = 1.35,
  className = '',
  style,
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const frameRef = useRef(0);
  const visibleRef = useRef(true);
  const reducedRef = useRef(false);
  const pointerRef = useRef({ x: -9999, y: -9999, lastX: 0, lastY: 0, lastTime: 0 });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const path = new window.Path2D();
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return path;
  }, [dotSize]);

  const draw = useCallback(() => {
    frameRef.current = 0;
    const canvas = canvasRef.current;
    if (!canvas || !circlePath || !visibleRef.current || document.hidden) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);
    const pointer = pointerRef.current;
    const proximitySquared = proximity * proximity;
    const time = reducedRef.current ? 0 : performance.now() * 0.001;

    dotsRef.current.forEach(dot => {
      const dx = dot.cx - pointer.x;
      const dy = dot.cy - pointer.y;
      const distanceSquared = dx * dx + dy * dy;
      let color = baseColor;
      if (distanceSquared <= proximitySquared) {
        const amount = 1 - Math.sqrt(distanceSquared) / proximity;
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * amount);
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * amount);
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * amount);
        color = `rgb(${r}, ${g}, ${b})`;
      }
      const ambientX = reducedRef.current ? 0 : Math.sin(time * 1.55 + dot.cx * 0.018 + dot.cy * 0.009) * 4.8;
      const ambientY = reducedRef.current ? 0 : Math.cos(time * 1.25 + dot.cx * 0.01 - dot.cy * 0.016) * 3.6;
      context.save();
      context.translate(dot.cx + dot.xOffset + ambientX, dot.cy + dot.yOffset + ambientY);
      context.fillStyle = color;
      context.fill(circlePath);
      context.restore();
    });
  }, [activeRgb, baseColor, baseRgb, circlePath, proximity]);

  const requestDraw = useCallback(() => {
    if (!frameRef.current && visibleRef.current && !document.hidden) {
      frameRef.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = dotSize + gap;
    const columns = Math.max(1, Math.floor((width + gap) / cell));
    const rows = Math.max(1, Math.floor((height + gap) / cell));
    const startX = (width - (cell * columns - gap)) / 2 + dotSize / 2;
    const startY = (height - (cell * rows - gap)) / 2 + dotSize / 2;
    dotsRef.current = Array.from({ length: columns * rows }, (_, index) => ({
      cx: startX + (index % columns) * cell,
      cy: startY + Math.floor(index / columns) * cell,
      xOffset: 0,
      yOffset: 0,
      moving: false,
    }));
    requestDraw();
  }, [dotSize, gap, requestDraw]);

  const animateDot = useCallback((dot, x, y, outwardDuration = 0.28) => {
    if (dot.moving) return;
    dot.moving = true;
    gsap.killTweensOf(dot);
    gsap.to(dot, {
      xOffset: x,
      yOffset: y,
      duration: outwardDuration,
      ease: 'power3.out',
      overwrite: true,
      onUpdate: requestDraw,
      onComplete: () => {
        gsap.to(dot, {
          xOffset: 0,
          yOffset: 0,
          duration: returnDuration,
          ease: 'power4.out',
          onUpdate: requestDraw,
          onComplete: () => { dot.moving = false; },
        });
      },
    });
  }, [requestDraw, returnDuration]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas || !circlePath) return;
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    buildGrid();

    const resizeObserver = new ResizeObserver(buildGrid);
    resizeObserver.observe(wrapper);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) requestDraw();
      else if (frameRef.current) cancelAnimationFrame(frameRef.current);
    }, { rootMargin: '80px' });
    visibilityObserver.observe(wrapper);

    const ambientTimer = window.setInterval(() => {
      if (visibleRef.current && !document.hidden && !reducedRef.current) requestDraw();
    }, 56);

    let moveFrame = 0;
    const onPointerMove = event => {
      if (!visibleRef.current || reducedRef.current || moveFrame) return;
      moveFrame = requestAnimationFrame(() => {
        moveFrame = 0;
        const rect = canvas.getBoundingClientRect();
        const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        const pointer = pointerRef.current;
        if (!inside) {
          pointer.x = -9999;
          pointer.y = -9999;
          requestDraw();
          return;
        }
        const now = performance.now();
        const delta = Math.max(16, now - (pointer.lastTime || now - 16));
        const vx = ((event.clientX - pointer.lastX) / delta) * 1000;
        const vy = ((event.clientY - pointer.lastY) / delta) * 1000;
        const speed = Math.min(maxSpeed, Math.hypot(vx, vy));
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointer.lastX = event.clientX;
        pointer.lastY = event.clientY;
        pointer.lastTime = now;

        if (speed > speedTrigger) {
          const force = Math.min(24, 6 + speed / 180);
          dotsRef.current.forEach(dot => {
            const dx = dot.cx - pointer.x;
            const dy = dot.cy - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < proximity && !dot.moving) {
              const falloff = 1 - distance / proximity;
              animateDot(dot, (dx / distance) * force * falloff + vx * 0.0012, (dy / distance) * force * falloff + vy * 0.0012);
            }
          });
        }
        requestDraw();
      });
    };

    const onPointerDown = event => {
      if (!visibleRef.current || reducedRef.current || event.button !== 0) return;
      const rect = canvas.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      dotsRef.current.forEach(dot => {
        const dx = dot.cx - x;
        const dy = dot.cy - y;
        const distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < shockRadius && !dot.moving) {
          const force = Math.min(46, shockStrength * 12 * (1 - distance / shockRadius));
          animateDot(dot, (dx / distance) * force, (dy / distance) * force, 0.22);
        }
      });
    };

    const onVisibilityChange = () => {
      if (document.hidden && frameRef.current) cancelAnimationFrame(frameRef.current);
      else requestDraw();
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.clearInterval(ambientTimer);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(moveFrame);
      cancelAnimationFrame(frameRef.current);
      gsap.killTweensOf(dotsRef.current);
    };
  }, [animateDot, buildGrid, circlePath, maxSpeed, proximity, requestDraw, shockRadius, shockStrength, speedTrigger]);

  return (
    <div className={`dot-grid ${className}`.trim()} style={style} aria-hidden="true">
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </div>
  );
}
