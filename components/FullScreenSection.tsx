
import React from 'react';

interface FullScreenSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FullScreenSection: React.FC<FullScreenSectionProps> = ({ children, className = '' }) => {
  return (
    <section 
      className={`h-screen w-screen flex flex-col items-center justify-center relative snap-start shrink-0 ${className}`}
    >
      {children}
    </section>
  );
};

export default FullScreenSection;
