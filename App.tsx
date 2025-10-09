import React, { useState, useEffect, useRef, useCallback } from 'react';
import FullScreenSection from './components/FullScreenSection';
import RainEffect from './components/RainEffect';
import SocialLink from './components/SocialLink';
import { GithubIcon } from './components/icons/GithubIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { LinkedinIcon } from './components/icons/LinkedinIcon';
import SliderSection from './components/SliderSection';
import SideNav from './components/SideNav';
import DustEffect from './components/DustEffect';

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isThrottled = useRef(false);
  const appRef = useRef<HTMLDivElement>(null);
  const totalSections = 3;

  const navigateTo = useCallback((index: number) => {
    if (isThrottled.current) return;
    if (index >= 0 && index < totalSections) {
      isThrottled.current = true;
      setActiveIndex(index);
      setTimeout(() => {
        isThrottled.current = false;
      }, 700); // Must match CSS transition duration
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollDown = e.deltaY > 0;
      if (scrollDown) {
        navigateTo(activeIndex + 1);
      } else {
        navigateTo(activeIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            navigateTo(activeIndex + 1);
        } else if (e.key === 'ArrowUp') {
            navigateTo(activeIndex - 1);
        }
    };

    const currentAppRef = appRef.current;
    if (currentAppRef) {
      currentAppRef.addEventListener('wheel', handleWheel, { passive: true });
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (currentAppRef) {
        currentAppRef.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, navigateTo]);

  return (
    <div id="main-container" ref={appRef} className="relative h-screen w-screen overflow-hidden">
      <DustEffect />
      <RainEffect />
      <SideNav 
        totalSections={totalSections}
        activeIndex={activeIndex}
        onNavigate={navigateTo}
      />
      <div
        className="h-full w-full scrolling-container"
        style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
      >
        <FullScreenSection>
          <div className="text-center z-10 animate-fade-in">
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_5px_15px_rgba(255,255,255,0.1)]">
              YOUR NAME
            </h1>
            <p className="text-gray-300 mt-4 text-lg md:text-2xl">
              Frontend Developer & UI/UX Enthusiast
            </p>
          </div>
        </FullScreenSection>

        <SliderSection />

        <FullScreenSection>
          <div className="z-10 flex flex-col items-center justify-center gap-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Connect With Me</h2>
              <SocialLink 
                  href="#"
                  icon={<GithubIcon />}
                  text="GitHub"
              />
              <SocialLink 
                  href="#"
                  icon={<LinkedinIcon />}
                  text="LinkedIn"
              />
              <SocialLink 
                  href="#"
                  icon={<TwitterIcon />}
                  text="Twitter / X"
              />
          </div>
        </FullScreenSection>
      </div>
    </div>
  );
};

export default App;