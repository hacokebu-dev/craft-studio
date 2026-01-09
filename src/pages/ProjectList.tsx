import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { projects } from '@/data/projects';
import { useLanguage } from '@/hooks/useLanguage';

const ProjectList = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="container-main">
          <div className="space-y-16">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={getLocalizedPath(`/project/${project.id}`)}
                className="block project-card group"
              >
                <div 
                  className="w-full bg-muted mb-6"
                  style={{ aspectRatio: '16 / 10' }}
                >
                  <img
                    src={project.thumbnail}
                    alt={currentLang === 'ko' ? project.titleKo : project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-start gap-6">
                  <span className="text-4xl md:text-5xl font-bold text-accent">
                    {project.number}
                  </span>
                  <div>
                    <h2 className="text-xl md:text-2xl text-ivory font-medium group-hover:text-accent transition-colors">
                      {currentLang === 'ko' ? project.titleKo : project.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2">
                      {currentLang === 'ko' ? project.dateKo : project.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectList;
