import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { getBlogPosts, categories } from '@/lib/content';
import { useLanguage } from '@/hooks/useLanguage';

const BlogList = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const allPosts = getBlogPosts(currentLang as 'en' | 'ko');
  
  const filteredPosts = selectedCategory === 'all'
    ? allPosts
    : allPosts.filter((post) => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
  
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="container-main">
          {/* Category Filter */}
          <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-filter ${
                  selectedCategory === category.id ? 'category-filter-active' : 'text-ivory'
                }`}
              >
                {currentLang === 'ko' ? category.nameKo : category.name}
              </button>
            ))}
          </div>
          
          {/* Blog List */}
          <div>
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={getLocalizedPath(`/blog/${post.id}`)}
                className="blog-item blog-item-bordered group"
              >
                <h2 className="blog-item-title">
                  {post.title}
                </h2>
                <span className="blog-item-date">
                  {post.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogList;
