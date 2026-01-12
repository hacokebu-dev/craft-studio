import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { getBlogPost } from '@/lib/content';
import { useLanguage } from '@/hooks/useLanguage';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  
  const post = getBlogPost(id || '', currentLang as 'en' | 'ko');
  
  if (!post) {
    return (
      <Layout>
        <div className="container-main py-24 text-center">
          <h1 className="text-2xl text-ivory">Post not found</h1>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Helmet>
        <title>{post.title} | HACO & KEBU Blog</title>
        <meta name="description" content={post.description || post.content.substring(0, 155).replace(/[#*_\n]/g, '')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.content.substring(0, 155).replace(/[#*_\n]/g, '')} />
        <meta property="og:type" content="article" />
        {post.ogImage && <meta property="og:image" content={post.ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || post.content.substring(0, 155).replace(/[#*_\n]/g, '')} />
        {post.ogImage && <meta name="twitter:image" content={post.ogImage} />}
        <link rel="canonical" href={`https://hacokebu.com/${currentLang === 'ko' ? 'ko/' : ''}blog/${id}`} />
      </Helmet>
      <article className="py-12 md:py-16">
        <div className="container-main">
          {/* Centered Content Container */}
          <div className="max-w-[800px] mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-ivory hover:text-accent transition-colors"
                >
                  <ArrowLeft className="w-[1.5rem] h-[1.5rem]" />
                </button>
                <span className="text-ivory text-[1.5rem]">{post.date}</span>
                <span className="text-ivory">|</span>
                <span className="text-ivory text-[1.5rem]">{post.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory !leading-[1.3]">
                {post.title}
              </h1>
            </header>
            
            {/* Content */}
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
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
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
