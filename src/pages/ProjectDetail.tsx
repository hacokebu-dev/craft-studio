import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Helmet } from 'react-helmet-async';
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

  const metaDescription = project.description || project.content.substring(0, 155).replace(/[#*_\n]/g, '');
  const ogImage = project.ogImage || project.thumbnail;
  const canonicalUrl = `https://hacokebu.com/${currentLang === 'ko' ? 'ko/' : ''}project/${id}`;
  
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": metaDescription,
    "datePublished": project.date,
    "creator": {
      "@type": "Organization",
      "name": "HACO & KEBU",
      "url": "https://hacokebu.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "inLanguage": currentLang,
    ...(ogImage && { "image": ogImage })
  };
  
  return (
    <Layout>
      <Helmet>
        <title>{project.title} | HACO & KEBU Projects</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={metaDescription} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkSchema)}
        </script>
      </Helmet>
      <article className="py-12 md:py-16">
        <div className="container-main">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-ivory hover:text-accent transition-colors"
                aria-label="Go back"
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
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
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
