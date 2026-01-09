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
    <section className="py-24 md:py-32 bg-background">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-accent">
            {t('recentBlog.title')}
          </h2>
          <Link
            to={getLocalizedPath('/blog')}
            className="flex items-center gap-2 text-ivory hover:text-accent transition-colors text-sm"
          >
            {t('recentBlog.more')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* List */}
        <div className="divide-y divide-border">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={getLocalizedPath(`/blog/${post.id}`)}
              className="blog-item group"
            >
              <h3 className="text-ivory font-medium group-hover:text-accent transition-colors flex-1 min-w-0">
                {post.title}
              </h3>
              <span className="text-muted-foreground text-sm whitespace-nowrap shrink-0">
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogSection;
