import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initUnicornStudio = () => {
      const us = (window as any).UnicornStudio;
      if (us && typeof us.init === 'function') {
        // Destroy existing instances first, then reinitialize
        if (typeof us.destroy === 'function') {
          us.destroy();
        }
        us.init();
      }
    };

    // Load Unicorn Studio script if not loaded
    if (!(window as any).UnicornStudio) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js';
      script.onload = () => {
        initUnicornStudio();
      };
      document.head.appendChild(script);
    } else {
      // Script already loaded, just reinitialize
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initUnicornStudio();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Fallback Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Unicorn Studio Background */}
      <div 
        ref={containerRef}
        data-us-project="HglN3zIeCBisiuYg6E4k" 
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-ivory leading-tight max-w-4xl">
          {t('hero.title')}
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
