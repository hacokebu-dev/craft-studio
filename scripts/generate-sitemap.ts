import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://hacokebu.com';

interface PageEntry {
  loc: string;
  lastmod?: string;
  changefreq: string;
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

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  
  // 고정 페이지
  const staticPages: PageEntry[] = [
    { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: '/project', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: '/blog', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: '/ko', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: '/ko/project', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: '/ko/blog', lastmod: today, changefreq: 'weekly', priority: '0.8' },
  ];

  // 동적 페이지 - 블로그
  const blogEntries = getContentEntries('blog');
  const blogPages: PageEntry[] = blogEntries.flatMap(entry => [
    { loc: `/blog/${entry.id}`, lastmod: formatDate(entry.date), changefreq: 'monthly', priority: '0.6' },
    { loc: `/ko/blog/${entry.id}`, lastmod: formatDate(entry.date), changefreq: 'monthly', priority: '0.6' },
  ]);

  // 동적 페이지 - 프로젝트
  const projectEntries = getContentEntries('projects');
  const projectPages: PageEntry[] = projectEntries.flatMap(entry => [
    { loc: `/project/${entry.id}`, lastmod: formatDate(entry.date), changefreq: 'monthly', priority: '0.7' },
    { loc: `/ko/project/${entry.id}`, lastmod: formatDate(entry.date), changefreq: 'monthly', priority: '0.7' },
  ]);

  const allPages = [...staticPages, ...projectPages, ...blogPages];

  const urlEntries = allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
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
