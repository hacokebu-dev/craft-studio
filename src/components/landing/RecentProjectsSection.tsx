import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '@/lib/content';
import { useLanguage } from '@/hooks/useLanguage';

const RecentProjectsSection = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  
  const recentProjects = getProjects(currentLang as 'en' | 'ko').slice(0, 6);
  
  return (
    <section className="pt-[5rem] pb-[7.5rem] bg-background">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[3rem] font-bold text-ivory">
            {t('recentProjects.title')}
          </h2>
          <Link
            to={getLocalizedPath('/project')}
            className="flex items-center gap-2 text-ivory hover:text-accent transition-colors text-[1.5rem]"
          >
            {t('recentProjects.more')}
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentProjects.map((project) => (
            <Link
              key={project.id}
              to={getLocalizedPath(`/project/${project.id}`)}
              className="project-card group"
            >
              <div 
                className="w-full bg-muted"
                style={{ aspectRatio: '16 / 10' }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjectsSection;
