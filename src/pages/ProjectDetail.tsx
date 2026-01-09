import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Layout from '@/components/Layout';
import { projects } from '@/data/projects';
import { useLanguage } from '@/hooks/useLanguage';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  
  const project = projects.find((p) => p.id === id);
  
  if (!project) {
    return (
      <Layout>
        <div className="container-main py-24 text-center">
          <h1 className="text-2xl text-ivory">Project not found</h1>
        </div>
      </Layout>
    );
  }
  
  const title = currentLang === 'ko' ? project.titleKo : project.title;
  const date = currentLang === 'ko' ? project.dateKo : project.date;
  const content = currentLang === 'ko' ? project.contentKo : project.content;
  
  return (
    <Layout>
      <article className="py-12 md:py-16">
        <div className="container-main">
          {/* Header */}
          <header className="mb-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-ivory transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{date}</span>
            </button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent leading-tight">
              {title}
            </h1>
          </header>
          
          {/* Content */}
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                img: ({ src, alt }) => (
                  <div 
                    className="w-full bg-muted my-8"
                    style={{ aspectRatio: '16 / 10' }}
                  >
                    <img
                      src={src}
                      alt={alt || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
