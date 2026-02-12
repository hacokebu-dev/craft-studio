import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const initUnicornStudio = () => {
      try {
        const us = (window as any).UnicornStudio;
        if (us && typeof us.init === 'function') {
          if (typeof us.destroy === 'function') {
            us.destroy();
          }
          Promise.resolve(us.init()).then(() => {
            const checkLoaded = setInterval(() => {
              const canvas = containerRef.current?.querySelector('canvas');
              if (canvas) {
                setIsLoaded(true);
                clearInterval(checkLoaded);
              }
            }, 50);
            setTimeout(() => clearInterval(checkLoaded), 5000);
          }).catch((e: unknown) => {
            console.warn('UnicornStudio init error:', e);
            // Still check if canvas rendered despite error
            const checkLoaded = setInterval(() => {
              const canvas = containerRef.current?.querySelector('canvas');
              if (canvas) {
                setIsLoaded(true);
                clearInterval(checkLoaded);
              }
            }, 50);
            setTimeout(() => clearInterval(checkLoaded), 5000);
          });
        }
      } catch (e) {
        console.warn('UnicornStudio init error:', e);
      }
    };

    // Script is loaded via defer in index.html
    if ((window as any).UnicornStudio) {
      initUnicornStudio();
    } else {
      // Wait for deferred script to load
      const check = setInterval(() => {
        if ((window as any).UnicornStudio) {
          clearInterval(check);
          initUnicornStudio();
        }
      }, 100);
      setTimeout(() => clearInterval(check), 10000);
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
