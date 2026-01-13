import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import logoSvg from '@/assets/logo.svg';

const Logo = () => {
  const { getLocalizedPath } = useLanguage();
  
  return (
    <Link to={getLocalizedPath('/')} className="flex items-center">
      <img src={logoSvg} alt="HACO & KEBU" className="h-[2.4rem]" />
    </Link>
  );
};

export default Logo;
