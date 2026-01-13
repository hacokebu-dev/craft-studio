import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import logoSvg from '@/assets/logo.svg';

const Logo = () => {
  const { getLocalizedPath } = useLanguage();
  
  return (
    <Link to={getLocalizedPath('/')} className="flex items-center min-w-[180px] h-[2.4rem]">
      <img 
        src={logoSvg} 
        alt="HACO & KEBU" 
        className="h-[2.4rem] w-auto"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
};

export default Logo;
