import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Load Unicorn Studio script
    if (!(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js';
      script.onload = () => {
        const us = (window as any).UnicornStudio;
        if (us && !us.isInitialized && typeof us.init === 'function') {
          us.init();
          us.isInitialized = true;
        }
      };
      document.head.appendChild(script);
    } else {
      const us = (window as any).UnicornStudio;
      if (us && !us.isInitialized && typeof us.init === 'function') {
        us.init();
        us.isInitialized = true;
      }
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
