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
    <section className="pt-[3.5rem] md:pt-[5rem] pb-[5rem] md:pb-[7.5rem] bg-background">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[2rem] md:text-[3rem] font-bold text-ivory">
            {t('recentProjects.title')}
          </h2>
          <Link
            to={getLocalizedPath('/project')}
            className="flex items-center gap-2 text-ivory hover:text-accent transition-colors text-[1rem] md:text-[1.5rem]"
          >
            {t('recentProjects.more')}
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
          </Link>
        </div>
        
        {/* Grid */}
        {recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProjects.map((project, index) => (
              <Link
                key={project.id}
                to={getLocalizedPath(`/project/${project.id}`)}
                className={`project-card group ${index >= 3 ? 'hidden md:block' : ''}`}
              >
                <div 
                  className="w-full bg-muted"
                  style={{ aspectRatio: '16 / 10' }}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    width={640}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg">{t('recentProjects.empty')}</p>
        )}
      </div>
    </section>
  );
};

export default RecentProjectsSection;
