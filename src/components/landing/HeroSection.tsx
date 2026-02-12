import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);
  
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initUnicornStudio = () => {
      const us = (window as any).UnicornStudio;
      if (us && typeof us.init === 'function') {
        Promise.resolve(us.init()).catch(() => {
          // cache error is a known library issue; canvas may still render
        });
      }
    };

    if ((window as any).UnicornStudio) {
      initUnicornStudio();
    } else {
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
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 구글 봇을 위한 정적 백업 이미지 */}
        <noscript>
          <img src="/og-image.jpg" alt="HACO &amp; KEBU Hero Background" className="w-full h-full object-cover" />
        </noscript>
      </div>
      
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
