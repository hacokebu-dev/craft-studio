import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { getProjects } from '@/lib/content';
import { useLanguage } from '@/hooks/useLanguage';

const ProjectList = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  
  const projects = getProjects(currentLang as 'en' | 'ko');
  
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
                    alt={project.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden md:block text-[6rem] font-extrabold text-ivory">
                    {project.number}
                  </span>
                  <div>
                    <h2 className="text-[2rem] text-ivory font-medium group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground text-[1.2rem] mt-2">
                      {project.date}
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
