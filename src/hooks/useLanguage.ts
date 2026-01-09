import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentLang = location.pathname.startsWith('/ko') ? 'ko' : 'en';
  
  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);
  
  const switchLanguage = useCallback((lang: 'en' | 'ko') => {
    const currentPath = location.pathname;
    let newPath: string;
    
    if (lang === 'ko') {
      if (currentPath.startsWith('/ko')) {
        newPath = currentPath;
      } else {
        newPath = `/ko${currentPath === '/' ? '' : currentPath}`;
      }
    } else {
      if (currentPath.startsWith('/ko')) {
        newPath = currentPath.replace('/ko', '') || '/';
      } else {
        newPath = currentPath;
      }
    }
    
    i18n.changeLanguage(lang);
    navigate(newPath);
  }, [location.pathname, navigate, i18n]);
  
  const getLocalizedPath = useCallback((path: string) => {
    if (currentLang === 'ko') {
      return `/ko${path === '/' ? '' : path}`;
    }
    return path;
  }, [currentLang]);
  
  return {
    currentLang,
    switchLanguage,
    getLocalizedPath,
  };
};
