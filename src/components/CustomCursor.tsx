import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', moveCursor);

    // Add hover effect for interactive elements
    const cursor = cursorRef.current;
    const activate = () => cursor && cursor.classList.add('cursor-active');
    const deactivate = () => cursor && cursor.classList.remove('cursor-active');
    const selectors = 'a, button, input, textarea, select, [tabindex]';
    const interactiveElements = Array.from(document.querySelectorAll(selectors));
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', activate);
      el.addEventListener('mouseleave', deactivate);
    });

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.18);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.18);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentPos.current.x}px`;
        cursorRef.current.style.top = `${currentPos.current.y}px`;
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', activate);
        el.removeEventListener('mouseleave', deactivate);
      });
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
