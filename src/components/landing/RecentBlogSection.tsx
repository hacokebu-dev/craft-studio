import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/content';
import { useLanguage } from '@/hooks/useLanguage';

const RecentBlogSection = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  
  const recentPosts = getBlogPosts(currentLang as 'en' | 'ko').slice(0, 5);
  
  return (
    <section className="pb-24 md:pb-32 bg-background">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[2rem] md:text-[3rem] font-bold text-ivory">
            {t('recentBlog.title')}
          </h2>
          <Link
            to={getLocalizedPath('/blog')}
            className="flex items-center gap-2 text-ivory hover:text-accent transition-colors text-[1rem] md:text-[1.5rem]"
          >
            {t('recentBlog.more')}
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
          </Link>
        </div>
        
        {/* List */}
        {recentPosts.length > 0 ? (
          <div>
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                to={getLocalizedPath(`/blog/${post.id}`)}
                className="blog-item blog-item-bordered group"
              >
                <h3 className="blog-item-title">
                  {post.title}
                </h3>
                <span className="blog-item-date">
                  {post.date}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg">{t('recentBlog.empty')}</p>
        )}
      </div>
    </section>
  );
};

export default RecentBlogSection;
