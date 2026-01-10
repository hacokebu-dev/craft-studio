import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang, switchLanguage } = useLanguage();
  
  const handleSelect = (lang: 'en' | 'ko') => {
    switchLanguage(lang);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-ivory hover:text-accent transition-colors"
      >
        <span className="text-sm font-medium uppercase">{currentLang === 'en' ? 'En' : 'Ko'}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-[80px]">
            <button
              onClick={() => handleSelect('en')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors ${
                currentLang === 'en' ? 'text-accent' : 'text-ivory'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleSelect('ko')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors ${
                currentLang === 'ko' ? 'text-accent' : 'text-ivory'
              }`}
            >
              한국어
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
