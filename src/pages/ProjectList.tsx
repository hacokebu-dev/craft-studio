import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { getProjects } from '@/lib/content';
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

const PROJECTS_PER_PAGE = 6;

const ProjectList = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const allProjects = getProjects(currentLang as 'en' | 'ko');
  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  
  const paginatedProjects = allProjects.slice(
    (validPage - 1) * PROJECTS_PER_PAGE,
    validPage * PROJECTS_PER_PAGE
  );
  
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
      <Helmet>
        <title>{currentLang === 'ko' ? '프로젝트 | HACO&KEBU' : 'Projects | HACO&KEBU'}</title>
        <meta name="description" content={currentLang === 'ko' ? '하코케부의 프로젝트 목록' : 'Projects by HACO & KEBU'} />
        <link rel="canonical" href={`https://hacokebu.com/${currentLang === 'ko' ? 'ko/' : ''}project/`} />
      </Helmet>
      <div className="py-12 md:py-16">
        <div className="container-main">
          {paginatedProjects.length > 0 ? (
            <div className="space-y-16">
              {paginatedProjects.map((project) => (
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
          ) : (
            <p className="text-muted-foreground text-lg">{t('projectList.empty')}</p>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
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

export default ProjectList;
