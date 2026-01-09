import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { getLocalizedPath, currentLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    const currentPath = location.pathname;
    const localizedPath = getLocalizedPath(path);
    
    if (path === '/') {
      return currentPath === '/' || currentPath === '/ko';
    }
    
    return currentPath.includes(path);
  };
  
  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/project', label: t('nav.project') },
    { path: '/blog', label: t('nav.blog') },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={getLocalizedPath(item.path)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path) ? 'text-accent' : 'text-ivory hover:text-accent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <LanguageSelector />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-ivory"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container-main py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={getLocalizedPath(item.path)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  isActive(item.path) ? 'text-accent' : 'text-ivory'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
