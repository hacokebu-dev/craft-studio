import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://hacokebu.com';

interface PageEntry {
  enPath: string;
  koPath: string;
  lastmod?: string;
  priority: string;
}

function parseFrontmatter(content: string): Record<string, string> {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};
  
  const frontmatter: Record<string, string> = {};
  const lines = frontmatterMatch[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  
  return frontmatter;
}

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file => file.endsWith('.md'));
}

function getContentEntries(type: 'blog' | 'projects'): { id: string; date: string }[] {
  const enDir = path.join(process.cwd(), 'src', 'content', type, 'en');
  const files = getMarkdownFiles(enDir);
  
  return files.map(file => {
    const content = fs.readFileSync(path.join(enDir, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);
    return {
      id: frontmatter.id || file.replace('.md', ''),
      date: frontmatter.date || new Date().toISOString().split('T')[0]
    };
  });
}

// W3C Datetime 형식으로 변환 (한국 시간대 +09:00)
function formatDateW3C(dateStr: string): string {
  try {
    // 날짜 문자열에서 년월일 추출
    const cleanDate = dateStr.replace(/년|월/g, '-').replace(/일/g, '').trim();
    const date = new Date(cleanDate);
    
    if (isNaN(date.getTime())) {
      return new Date().toISOString().replace('Z', '+09:00').replace(/\.\d{3}/, '');
    }
    
    // YYYY-MM-DDTHH:MM:SS+09:00 형식
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}T00:00:00+09:00`;
  } catch {
    return new Date().toISOString().replace('Z', '+09:00').replace(/\.\d{3}/, '');
  }
}

function generateUrlEntry(enPath: string, koPath: string, lastmod: string, priority: string): string {
  const enUrl = `${SITE_URL}${enPath}${enPath.endsWith('/') ? '' : '/'}`;
  const koUrl = `${SITE_URL}${koPath}${koPath.endsWith('/') ? '' : '/'}`;
  
  return `  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="ko" href="${koUrl}"/>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>
  <url>
    <loc>${koUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="ko" href="${koUrl}"/>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap(): string {
  const today = formatDateW3C(new Date().toISOString().split('T')[0]);
  
  // 고정 페이지
  const staticPages: PageEntry[] = [
    { enPath: '/', koPath: '/ko', lastmod: today, priority: '1.0' },
    { enPath: '/project', koPath: '/ko/project', lastmod: today, priority: '0.8' },
    { enPath: '/blog', koPath: '/ko/blog', lastmod: today, priority: '0.8' },
  ];

  // 정적 페이지 URL 엔트리 생성
  const staticEntries = staticPages.map(page => 
    generateUrlEntry(page.enPath, page.koPath, page.lastmod!, page.priority)
  );

  // 동적 페이지 - 블로그
  const blogEntries = getContentEntries('blog');
  const blogUrlEntries = blogEntries.map(entry => 
    generateUrlEntry(
      `/blog/${entry.id}`,
      `/ko/blog/${entry.id}`,
      formatDateW3C(entry.date),
      '0.6'
    )
  );

  // 동적 페이지 - 프로젝트
  const projectEntries = getContentEntries('projects');
  const projectUrlEntries = projectEntries.map(entry => 
    generateUrlEntry(
      `/project/${entry.id}`,
      `/ko/project/${entry.id}`,
      formatDateW3C(entry.date),
      '0.7'
    )
  );

  const allEntries = [...staticEntries, ...projectUrlEntries, ...blogUrlEntries].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allEntries}
</urlset>
`;
}

// 실행
const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), 'dist', 'sitemap.xml');

// dist 폴더가 없으면 생성
if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
  fs.mkdirSync(path.join(process.cwd(), 'dist'), { recursive: true });
}

fs.writeFileSync(outputPath, sitemap);
console.log('✅ Sitemap generated:', outputPath);
