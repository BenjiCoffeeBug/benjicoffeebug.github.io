import React from 'react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, text }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 px-6 py-3 rounded-lg border border-white/20 bg-black/30 backdrop-blur-sm w-64
                 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
    >
      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
          {icon}
      </span>
      <span className="text-white font-medium group-hover:text-white transition-colors duration-300">
        {text}
      </span>
    </a>
  );
};

export default SocialLink;
