import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import Layout from '@/components/Layout';
import HeroSection from '@/components/landing/HeroSection';
import IntroductionSection from '@/components/landing/IntroductionSection';
import LogoRollingSection from '@/components/landing/LogoRollingSection';
import RecentProjectsSection from '@/components/landing/RecentProjectsSection';
import RecentBlogSection from '@/components/landing/RecentBlogSection';

const Index = () => {
  const { currentLang } = useLanguage();
  const isKo = currentLang === 'ko';

  useEffect(() => {
    document.title = 'HACO&KEBU';
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>HACO&KEBU</title>
        <meta name="description" content={isKo ? '작은 디지털 도구와 장난감을 만듭니다' : 'Create small digital tools and toys'} />
        <link rel="canonical" href={`https://hacokebu.com/${isKo ? 'ko/' : ''}`} />
      </Helmet>
      <HeroSection />
      <IntroductionSection />
      <LogoRollingSection />
      <RecentProjectsSection />
      <RecentBlogSection />
    </Layout>
  );
};

export default Index;
