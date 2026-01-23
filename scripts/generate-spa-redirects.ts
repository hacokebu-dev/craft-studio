import * as fs from 'fs';
import * as path from 'path';

/**
 * Generate SPA redirect pages for GitHub Pages
 * This creates index.html files in subdirectories so that direct URL access
 * returns 200 OK instead of 404, allowing proper SPA routing and SEO indexing.
 */

const DIST_DIR = 'dist';

// Routes that need their own index.html for direct access
const SPA_ROUTES = [
  '/blog',
  '/project',
  '/ko',
  '/ko/blog',
  '/ko/project',
];

function generateSpaRedirects(): void {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found. Run build first.');
    process.exit(1);
  }

  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const route of SPA_ROUTES) {
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

  console.log(`\n✅ SPA redirects generated for ${SPA_ROUTES.length} routes`);
}

generateSpaRedirects();
