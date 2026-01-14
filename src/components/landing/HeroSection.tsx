import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const initUnicornStudio = () => {
      const us = (window as any).UnicornStudio;
      if (us && typeof us.init === 'function') {
        if (typeof us.destroy === 'function') {
          us.destroy();
        }
        us.init();
        // Check for canvas to determine when loaded
        const checkLoaded = setInterval(() => {
          const canvas = containerRef.current?.querySelector('canvas');
          if (canvas) {
            setIsLoaded(true);
            clearInterval(checkLoaded);
          }
        }, 50);
        // Cleanup interval after 5 seconds max
        setTimeout(() => clearInterval(checkLoaded), 5000);
      }
    };

    if (!(window as any).UnicornStudio) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js';
      script.async = true;
      script.onload = () => {
        initUnicornStudio();
      };
      document.head.appendChild(script);
    } else {
      const timer = setTimeout(() => {
        initUnicornStudio();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <section className="relative h-[780px] w-full overflow-hidden flex items-center justify-center bg-background">
      {/* Unicorn Studio Background */}
      <div 
        ref={containerRef}
        data-us-project="HglN3zIeCBisiuYg6E4k" 
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-8 -mt-[2.5rem]">
        <h1 
          className="text-[5rem] md:text-[6rem] font-extrabold text-ivory max-w-4xl whitespace-pre-line leading-[1.2] md:leading-[1.3]"
        >
          {t('hero.title')}
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
