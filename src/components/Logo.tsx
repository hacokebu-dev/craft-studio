import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const Logo = () => {
  const { getLocalizedPath } = useLanguage();
  
  return (
    <Link to={getLocalizedPath('/')} className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-bold text-lg tracking-tight">HACO<span className="text-muted-foreground">&</span>KEBU</span>
    </Link>
  );
};

export default Logo;
