import * as fs from 'fs';
import * as path from 'path';

/**
 * Generate SPA redirect pages for GitHub Pages
 * This creates index.html files in subdirectories so that direct URL access
 * returns 200 OK instead of 404, allowing proper SPA routing and SEO indexing.
 */

const DIST_DIR = 'dist';

// Static routes that need their own index.html
const STATIC_ROUTES = [
  '/blog',
  '/project',
  '/ko',
  '/ko/blog',
  '/ko/project',
];

interface ContentEntry {
  id: string;
}

function parseFrontmatterId(content: string): string | null {
  const match = content.match(/^---\n[\s\S]*?^id:\s*(.+)$/m);
  if (!match) return null;
  return match[1].trim().replace(/^["']|["']$/g, '');
}

function getContentIds(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      return parseFrontmatterId(content);
    })
    .filter((id): id is string => id !== null);
}

function generateSpaRedirects(): void {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found. Run build first.');
    process.exit(1);
  }

  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Collect dynamic routes from markdown content
  const blogIds = getContentIds(path.join(process.cwd(), 'src', 'content', 'blog', 'en'));
  const projectIds = getContentIds(path.join(process.cwd(), 'src', 'content', 'projects', 'en'));

  const dynamicRoutes: string[] = [];
  for (const id of blogIds) {
    dynamicRoutes.push(`/blog/${id}`);
    dynamicRoutes.push(`/ko/blog/${id}`);
  }
  for (const id of projectIds) {
    dynamicRoutes.push(`/project/${id}`);
    dynamicRoutes.push(`/ko/project/${id}`);
  }

  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  for (const route of allRoutes) {
    const routeDir = path.join(DIST_DIR, route);
    const routeIndexPath = path.join(routeDir, 'index.html');

    // Create directory if it doesn't exist
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Copy index.html to this route
    fs.writeFileSync(routeIndexPath, indexHtmlContent);
    console.log(`✓ Created ${routeIndexPath}`);
  }

  console.log(`\n✅ SPA redirects generated for ${allRoutes.length} routes (${STATIC_ROUTES.length} static + ${dynamicRoutes.length} dynamic)`);
}

generateSpaRedirects();
