import React, { useEffect, useState } from 'react';

// Define a more specific style type to include our CSS variables and animationName
interface MoteStyle extends React.CSSProperties {
  '--max-opacity': number;
  animationName: string;
}

interface Mote {
  id: number;
  top: string;
  left: string;
  size: string;
  style: MoteStyle;
  animationDuration: string;
  animationDelay: string;
}

const DustEffect: React.FC = () => {
  const [motes, setMotes] = useState<Mote[]>([]);
  const numberOfMotes = 30; // Reduced from 50 for a subtler effect
  const numAnimations = 5; // Create 5 different random animation paths

  useEffect(() => {
    // Dynamically create a few different animation keyframes
    const styleSheet = document.createElement("style");
    let keyframes = '';
    for (let i = 1; i <= numAnimations; i++) {
        // Each animation has a different, random end-point
        const x_end = -75 + Math.random() * 150;
        const y_end = -75 + Math.random() * 150;
        keyframes += `
            @keyframes float-and-fade-${i} {
                0% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                50% {
                    opacity: var(--max-opacity);
                }
                100% {
                    transform: translate(${x_end}px, ${y_end}px);
                    opacity: 0;
                }
            }
        `;
    }
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    const generatedMotes: Mote[] = [];
    for (let i = 0; i < numberOfMotes; i++) {
      const size = 1 + Math.random() * 2; // Motes of 1px to 3px
      const duration = 12 + Math.random() * 18; // Faster: 12 to 30 seconds
      const animNum = Math.ceil(Math.random() * numAnimations); // Assign a random animation path

      generatedMotes.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${size.toFixed(1)}px`,
        animationDuration: `${duration.toFixed(1)}s`,
        animationDelay: `-${(Math.random() * 30).toFixed(2)}s`, // Stagger start times with negative delay
        style: {
          '--max-opacity': 0.3 + Math.random() * 0.4,
          animationName: `float-and-fade-${animNum}`,
        },
      });
    }
    setMotes(generatedMotes);

    return () => {
      // Cleanup the dynamically created stylesheet
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {motes.map((mote) => (
        <div
          key={mote.id}
          className="absolute bg-white rounded-full"
          style={{
            ...mote.style,
            top: mote.top,
            left: mote.left,
            width: mote.size,
            height: mote.size,
            opacity: 0, // Start invisible; animation handles fading
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDuration: mote.animationDuration,
            animationDelay: mote.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default DustEffect;