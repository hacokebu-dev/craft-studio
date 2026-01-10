import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Layout from '@/components/Layout';
import { getProject } from '@/lib/content';
import { useLanguage } from '@/hooks/useLanguage';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  
  const project = getProject(id || '', currentLang as 'en' | 'ko');
  
  if (!project) {
    return (
      <Layout>
        <div className="container-main py-24 text-center">
          <h1 className="text-2xl text-ivory">Project not found</h1>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <article className="py-12 md:py-16">
        <div className="container-main">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-ivory hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-[1.5rem] h-[1.5rem]" />
              </button>
              <span className="text-ivory text-[1.5rem]">{project.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory !leading-[1.3]">
              {project.title}
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
              {project.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
