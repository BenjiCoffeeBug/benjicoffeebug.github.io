import React, { useState } from 'react';
import FullScreenSection from './FullScreenSection';

// Updated slides data with placeholder content and new structure
const slides = [
  {
    title: 'Project Echo',
    description: 'A cutting-edge web application developed to streamline data visualization for enterprise clients.',
    details: 'Built with React, D3.js, and a Node.js backend. Focused on creating a highly interactive and performant user experience with real-time data updates.'
  },
  {
    title: 'Quantum Leap UI',
    description: 'A complete design system and component library created for a fintech startup to ensure brand consistency.',
    details: 'Included 50+ reusable components with comprehensive documentation. The system accelerated development by 40% and improved UI consistency across all products.'
  },
  {
    title: 'Project Nova',
    description: 'An immersive e-commerce platform with a focus on 3D product visualization and a seamless checkout process.',
    details: 'Utilized Three.js for the 3D viewer and integrated with Stripe for payments. The platform saw a 25% increase in user engagement after launch.'
  },
  {
    title: 'Aperture Mobile',
    description: 'A cross-platform mobile app for photographers to manage and showcase their portfolios on the go.',
    details: 'Developed using React Native, providing a native look and feel on both iOS and Android. Features included cloud sync and social media integration.'
  },
  {
    title: 'Helios Dashboard',
    description: 'A complex data analytics dashboard for the renewable energy sector, tracking solar panel performance.',
    details: 'The interface handles thousands of data points, offering powerful filtering and reporting tools to help operators optimize energy production.'
  },
];

const PlaceholderImage: React.FC = () => (
    <div className="w-full h-full bg-gray-900/50 border border-white/10 rounded-lg shadow-2xl shadow-white/5 flex items-center justify-center pointer-events-none backdrop-blur-sm filter grayscale">
    </div>
);


const SliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <FullScreenSection>
      <div className="z-10 flex flex-col items-center justify-center w-full h-full px-4 pb-16">
        <div className="relative w-full max-w-4xl h-[45vh] flex items-center justify-center">
            {slides.map((slide, index) => {
                const offset = index - currentIndex;
                const absOffset = Math.abs(offset);

                const getTransformStyle = () => {
                    if (offset === 0) return 'translateX(0%) scale(0.9)';
                    if (offset === 1) return 'translateX(80%) scale(0.65)';
                    if (offset === -1) return 'translateX(-80%) scale(0.65)';
                    if (offset > 1) return `translateX(160%) scale(0.5)`;
                    return `translateX(-160%) scale(0.5)`;
                };

                const getOpacity = () => {
                    if (offset === 0) return 1;
                    if (absOffset === 1) return 0.5;
                    return 0;
                };

                const isClickable = index !== currentIndex && absOffset === 1;

                return (
                    <div
                        key={index}
                        className={`absolute w-full h-full top-0 left-0 transition-all duration-500 ease-in-out ${isClickable ? 'cursor-pointer' : ''}`}
                        style={{
                            transform: getTransformStyle(),
                            opacity: getOpacity(),
                            zIndex: slides.length - absOffset,
                        }}
                        onClick={() => {
                           if(isClickable) setCurrentIndex(index);
                        }}
                    >
                        <PlaceholderImage />
                    </div>
                );
            })}
        </div>
        <div className="relative w-full max-w-5xl text-center mt-8 h-24 px-4">
            {slides.map((slide, index) => (
                 <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex flex-row justify-center gap-8 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Left Column */}
                    <div className="w-1/2 text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
                        <p className="text-gray-400">{slide.description}</p>
                    </div>
                    {/* Right Column */}
                    <div className="w-1/2 text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">Technical Details</h3>
                        <p className="text-gray-400">{slide.details}</p>
                    </div>
                 </div>
            ))}
        </div>
      </div>
    </FullScreenSection>
  );
};

export default SliderSection;