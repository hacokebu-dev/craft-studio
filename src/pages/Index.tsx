import Layout from '@/components/Layout';
import HeroSection from '@/components/landing/HeroSection';
import IntroductionSection from '@/components/landing/IntroductionSection';
import LogoRollingSection from '@/components/landing/LogoRollingSection';
import RecentProjectsSection from '@/components/landing/RecentProjectsSection';
import RecentBlogSection from '@/components/landing/RecentBlogSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <IntroductionSection />
      <LogoRollingSection />
      <RecentProjectsSection />
      <RecentBlogSection />
    </Layout>
  );
};

export default Index;
