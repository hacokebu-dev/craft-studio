import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://hacokebu.com';

interface BlogEntry {
  id: string;
  title: string;
  date: string;
  description?: string;
  content: string;
}

function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const lines = content.split('\n');
  const data: Record<string, string> = {};
  let bodyContent = content;

  if (lines[0]?.trim() === '---') {
    let endIndex = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i]?.trim() === '---') {
        endIndex = i;
        break;
      }
      const line = lines[i];
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        data[key] = value;
      }
    }
    if (endIndex > 0) {
      bodyContent = lines.slice(endIndex + 1).join('\n').trim();
    }
  }

  return { data, content: bodyContent };
}

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file => file.endsWith('.md'));
}

function getBlogEntries(lang: 'en' | 'ko'): BlogEntry[] {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog', lang);
  const files = getMarkdownFiles(dir);
  const entries: BlogEntry[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(rawContent);

    if (data.id) {
      entries.push({
        id: data.id,
        title: data.title || '',
        date: data.date || '',
        description: data.description,
        content: content,
      });
    }
  }

  // Sort by date (newest first)
  return entries.sort((a, b) => {
    const dateA = new Date(a.date.replace(/년|월|일/g, match => {
      if (match === '년') return '/';
      if (match === '월') return '/';
      return '';
    }));
    const dateB = new Date(b.date.replace(/년|월|일/g, match => {
      if (match === '년') return '/';
      if (match === '월') return '/';
      return '';
    }));
    return dateB.getTime() - dateA.getTime();
  });
}

function extractDescription(content: string, maxLength: number = 200): string {
  // Remove markdown syntax and extract plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove code
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

function formatDateRFC822(dateStr: string): string {
  // Parse Korean date format (2025년 1월 22일) or standard format
  const koreanMatch = dateStr.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  
  let date: Date;
  if (koreanMatch) {
    date = new Date(
      parseInt(koreanMatch[1]),
      parseInt(koreanMatch[2]) - 1,
      parseInt(koreanMatch[3])
    );
  } else {
    date = new Date(dateStr);
  }

  if (isNaN(date.getTime())) {
    date = new Date();
  }

  // Format to RFC 822 (required for RSS)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = days[date.getDay()];
  const dayNum = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}, ${dayNum} ${month} ${year} 00:00:00 +0900`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRssFeed(lang: 'en' | 'ko'): string {
  const entries = getBlogEntries(lang);
  const now = formatDateRFC822(new Date().toISOString());

  const isKorean = lang === 'ko';
  const langPath = isKorean ? '/ko' : '';
  const channelTitle = isKorean ? '하코케부 블로그' : 'HACO & KEBU Blog';
  const channelDescription = isKorean 
    ? '작지만 쓸모있는 디지털 도구와 장난감을 만듭니다' 
    : 'Create small digital tools and toys';

  const items = entries.map(entry => {
    const description = entry.description || extractDescription(entry.content);
    const link = `${SITE_URL}${langPath}/blog/${entry.id}`;

    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${formatDateRFC822(entry.date)}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${SITE_URL}${langPath}/blog</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>${lang}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}${langPath}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

function generateRssFeeds() {
  // Generate English RSS
  const enRss = generateRssFeed('en');
  
  // Generate Korean RSS
  const koRss = generateRssFeed('ko');

  return { enRss, koRss };
}

// Main execution
const { enRss, koRss } = generateRssFeeds();

// Ensure dist directory exists
const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Ensure dist/ko directory exists
const koDir = path.join(distDir, 'ko');
if (!fs.existsSync(koDir)) {
  fs.mkdirSync(koDir, { recursive: true });
}

// Write RSS files
fs.writeFileSync(path.join(distDir, 'rss.xml'), enRss, 'utf-8');
fs.writeFileSync(path.join(koDir, 'rss.xml'), koRss, 'utf-8');

console.log('✓ RSS feeds generated: dist/rss.xml, dist/ko/rss.xml');
