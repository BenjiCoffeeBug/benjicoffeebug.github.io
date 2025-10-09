import React, { useEffect, useState, useRef } from 'react';

interface Drop {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  height: string;
  width: string;
  opacity: number;
  blur: string;
}

const RainEffect: React.FC = () => {
  const [backgroundDrops, setBackgroundDrops] = useState<Drop[]>([]);
  const [foregroundDrops, setForegroundDrops] = useState<Drop[]>([]);
  const foregroundRainRef = useRef<HTMLDivElement>(null);
  const numberOfBackgroundDrops = 50;
  const numberOfForegroundDrops = 3;

  useEffect(() => {
    const generatedBackgroundDrops: Drop[] = [];
    for (let i = 0; i < numberOfBackgroundDrops; i++) {
      const depthFactor = Math.random(); // 0 (yakın) to 1 (uzak)
      const duration = 0.8 + depthFactor * 0.7;
      const height = 60 + (1 - depthFactor) * 60;
      const width = 1 + (1 - depthFactor) * 0.5;
      const opacity = 0.3 + (1 - depthFactor) * 0.3;
      const blur = 0.5 + depthFactor * 1.5; // Farther drops get more blur

      generatedBackgroundDrops.push({
        id: i,
        left: `${-25 + Math.random() * 150}%`,
        animationDuration: `${duration}s`,
        animationDelay: `-${(Math.random() * 5).toFixed(2)}s`,
        height: `${height}px`,
        width: `${width}px`,
        opacity: opacity,
        blur: `${blur.toFixed(1)}px`,
      });
    }
    setBackgroundDrops(generatedBackgroundDrops);

    const generatedForegroundDrops: Drop[] = [];
    for (let i = 0; i < numberOfForegroundDrops; i++) {
      const duration = 0.4 + Math.random() * 0.2;
      const height = 225 + Math.random() * 120; // Increased by 1.5x
      const width = 3 + Math.random() * 1.5;   // Increased by 1.5x
      const opacity = 0.7 + Math.random() * 0.2;
      const blur = 2.5 + Math.random() * 1; // More blur for foreground

      generatedForegroundDrops.push({
        id: i + numberOfBackgroundDrops,
        left: `${-25 + Math.random() * 150}%`,
        animationDuration: `${duration}s`,
        animationDelay: `-${(Math.random() * 5).toFixed(2)}s`,
        height: `${height}px`,
        width: `${width}px`,
        opacity: opacity,
        blur: `${blur.toFixed(1)}px`,
      });
    }
    setForegroundDrops(generatedForegroundDrops);

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes fall {
        0% { transform: translate(0px, -200px) rotate(-20deg); }
        100% { transform: translate(400px, calc(100vh + 200px)) rotate(-20deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    const handleAnimationIteration = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.dataset.isForeground === 'true') {
        target.style.left = `${-25 + Math.random() * 150}%`;
      }
    };

    const container = foregroundRainRef.current;
    if (container) {
      container.addEventListener('animationiteration', handleAnimationIteration);
    }

    return () => {
      document.head.removeChild(styleSheet);
      if (container) {
        container.removeEventListener('animationiteration', handleAnimationIteration);
      }
    };
  }, []);

  const renderDrop = (drop: Drop, isForeground: boolean) => (
    <div
      key={drop.id}
      className="absolute bg-gradient-to-b from-transparent to-white"
      data-is-foreground={isForeground}
      style={{
        left: drop.left,
        width: drop.width,
        height: drop.height,
        opacity: drop.opacity,
        animationName: 'fall',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationDuration: drop.animationDuration,
        animationDelay: drop.animationDelay,
        animationFillMode: 'backwards',
        filter: `blur(${drop.blur})`,
      }}
    />
  );

  return (
    <>
      {/* Background Rain & Vignette Layer */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 vignette">
        {backgroundDrops.map((drop) => renderDrop(drop, false))}
      </div>
      
      {/* Foreground Rain Layer */}
      <div ref={foregroundRainRef} className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[100]">
        {foregroundDrops.map((drop) => renderDrop(drop, true))}
      </div>
    </>
  );
};

export default RainEffect;