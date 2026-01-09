import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { useLanguage } from '@/hooks/useLanguage';

const RecentProjectsSection = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  
  const recentProjects = projects.slice(0, 6);
  
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-accent">
            {t('recentProjects.title')}
          </h2>
          <Link
            to={getLocalizedPath('/project')}
            className="flex items-center gap-2 text-ivory hover:text-accent transition-colors text-sm"
          >
            {t('recentProjects.more')}
            <ArrowRight className="w-4 h-4" />
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
                className="w-full bg-muted mb-4"
                style={{ aspectRatio: '16 / 10' }}
              >
                <img
                  src={project.thumbnail}
                  alt={currentLang === 'ko' ? project.titleKo : project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl md:text-4xl font-bold text-accent">
                  {project.number}
                </span>
                <div>
                  <h3 className="text-ivory font-medium group-hover:text-accent transition-colors">
                    {currentLang === 'ko' ? project.titleKo : project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {currentLang === 'ko' ? project.dateKo : project.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjectsSection;
