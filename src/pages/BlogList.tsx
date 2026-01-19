import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { getBlogPosts, categories } from '@/lib/content';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const POSTS_PER_PAGE = 12;

const BlogList = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const allPosts = getBlogPosts(currentLang as 'en' | 'ko');
  
  const filteredPosts = selectedCategory === 'all'
    ? allPosts
    : allPosts.filter((post) => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  
  const paginatedPosts = filteredPosts.slice(
    (validPage - 1) * POSTS_PER_PAGE,
    validPage * POSTS_PER_PAGE
  );
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({}); // Reset to page 1 when category changes
  };
  
  const handlePageChange = (page: number) => {
    if (page === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: page.toString() });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderPaginationItems = () => {
    const items = [];
    const showEllipsisStart = validPage > 3;
    const showEllipsisEnd = validPage < totalPages - 2;
    
    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={validPage === 1}
          className="cursor-pointer"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    if (showEllipsisStart) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, validPage - 1); i <= Math.min(totalPages - 1, validPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue;
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={validPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    if (showEllipsisEnd) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={validPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="container-main">
          {/* Category Filter */}
          <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`category-filter ${
                  selectedCategory === category.id ? 'category-filter-active' : 'text-ivory'
                }`}
              >
                {currentLang === 'ko' ? category.nameKo : category.name}
              </button>
            ))}
          </div>
          
          {/* Blog List */}
          {paginatedPosts.length > 0 ? (
            <div>
              {paginatedPosts.map((post) => (
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
          ) : (
            <p className="text-muted-foreground text-lg">{t('blogList.empty')}</p>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, validPage - 1))}
                      className={`cursor-pointer ${validPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                  
                  {renderPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, validPage + 1))}
                      className={`cursor-pointer ${validPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogList;
