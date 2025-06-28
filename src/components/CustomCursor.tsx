import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { twMerge } from 'tailwind-merge';
import styles from './CustomCursor.module.css';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface CustomCursorProps {
  size?: number;
  color?: string;
  animationSpeed?: number; // 0..1 lerp factor
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const DEFAULT_SIZE = 40;
const DEFAULT_COLOR = 'rgba(255,255,255,0.10)';
const DEFAULT_ANIMATION = 0.3;

const CustomCursor: React.FC<CustomCursorProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  animationSpeed = DEFAULT_ANIMATION,
  disabled = false,
  style = {},
  className = '',
  ...rest
}) => {
  // Early return for mobile, reduced motion, or disabled
  if (isMobile || prefersReducedMotion || disabled) return null;

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const lastUpdate = useRef(0);
  const [active, setActive] = useState(false);
  const THROTTLE_MS = 1000 / 60;

  useEffect(() => {
    const moveCursor = (e: PointerEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };
    window.addEventListener('pointermove', moveCursor, { passive: true });

    // Event delegation for hover effects
    const onPointerOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest('a, button, input, textarea, select, [tabindex]')) {
        setActive(true);
      }
    };
    const onPointerOut = (e: PointerEvent) => {
      if ((e.target as Element)?.closest('a, button, input, textarea, select, [tabindex]')) {
        setActive(false);
      }
    };
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    // Animation loop with throttling
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const animate = (now: number) => {
      if (now - lastUpdate.current > THROTTLE_MS) {
        currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, animationSpeed);
        currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, animationSpeed);
        if (cursorRef.current) {
          cursorRef.current.style.left = `${currentPos.current.x}px`;
          cursorRef.current.style.top = `${currentPos.current.y}px`;
        }
        lastUpdate.current = now;
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [animationSpeed]);

  // Set CSS variables for size and color
  const cursorVars: React.CSSProperties = {
    '--cursor-size': `${size}px`,
    '--cursor-color': color,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={cursorRef}
      className={twMerge(styles.customCursor, active ? styles.active : '', className)}
      style={cursorVars}
      aria-hidden
      {...rest}
    />
  );
};

export default CustomCursor;
