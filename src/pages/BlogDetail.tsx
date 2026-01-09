import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Layout from '@/components/Layout';
import { blogPosts } from '@/data/blog';
import { useLanguage } from '@/hooks/useLanguage';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  
  const post = blogPosts.find((p) => p.id === id);
  
  if (!post) {
    return (
      <Layout>
        <div className="container-main py-24 text-center">
          <h1 className="text-2xl text-ivory">Post not found</h1>
        </div>
      </Layout>
    );
  }
  
  const title = currentLang === 'ko' ? post.titleKo : post.title;
  const date = currentLang === 'ko' ? post.dateKo : post.date;
  const category = currentLang === 'ko' ? post.categoryKo : post.category;
  const content = currentLang === 'ko' ? post.contentKo : post.content;
  
  return (
    <Layout>
      <article className="py-12 md:py-16">
        <div className="container-main">
          {/* Centered Content Container */}
          <div className="max-w-[800px] mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-ivory transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-accent text-sm">{date}</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-accent text-sm">{category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory leading-tight">
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
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
