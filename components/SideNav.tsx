import React from 'react';

interface SideNavProps {
  totalSections: number;
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const sectionLabels = ['Home', 'Work', 'Contact'];

const SideNav: React.FC<SideNavProps> = ({ totalSections, activeIndex, onNavigate }) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className="group relative flex items-center justify-center w-12 h-12"
          aria-label={`Go to ${sectionLabels[index]} section`}
        >
          {/* Updated Dot Indicator */}
          <div
            className={`
              w-3 h-3 rounded-full transition-all duration-300 ease-in-out
              ${activeIndex === index
                ? 'bg-white scale-150' // Active: bigger, solid white dot
                : 'bg-white/40 group-hover:bg-white group-hover:scale-110' // Inactive: semi-transparent dot, brighter on hover
              }
            `}
          />
        </button>
      ))}
    </div>
  );
};

export default SideNav;