import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  date: string;
  thumbnail: string;
  content: string;
}

// Import all markdown files using Vite's glob import
const blogFilesEn = import.meta.glob('/src/content/blog/en/*.md', { query: '?raw', import: 'default', eager: true });
const blogFilesKo = import.meta.glob('/src/content/blog/ko/*.md', { query: '?raw', import: 'default', eager: true });
const projectFilesEn = import.meta.glob('/src/content/projects/en/*.md', { query: '?raw', import: 'default', eager: true });
const projectFilesKo = import.meta.glob('/src/content/projects/ko/*.md', { query: '?raw', import: 'default', eager: true });

function parseBlogPost(rawContent: string): BlogPost {
  const { data, content } = matter(rawContent);
  return {
    id: data.id || '',
    title: data.title || '',
    date: data.date || '',
    category: data.category || '',
    content: content.trim(),
  };
}

function parseProject(rawContent: string): Project {
  const { data, content } = matter(rawContent);
  return {
    id: data.id || '',
    number: data.number || '',
    title: data.title || '',
    date: data.date || '',
    thumbnail: data.thumbnail || '',
    content: content.trim(),
  };
}

export function getBlogPosts(lang: 'en' | 'ko'): BlogPost[] {
  const files = lang === 'ko' ? blogFilesKo : blogFilesEn;
  const posts: BlogPost[] = [];
  
  for (const path in files) {
    const rawContent = files[path] as string;
    const post = parseBlogPost(rawContent);
    if (post.id) {
      posts.push(post);
    }
  }
  
  // Sort by date (newest first) - assuming date format like "Jan 9, 2025" or "2025년 1월 9일"
  return posts.sort((a, b) => {
    // Try to parse dates, fall back to string comparison
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

export function getBlogPost(id: string, lang: 'en' | 'ko'): BlogPost | null {
  const posts = getBlogPosts(lang);
  return posts.find(post => post.id === id) || null;
}

export function getProjects(lang: 'en' | 'ko'): Project[] {
  const files = lang === 'ko' ? projectFilesKo : projectFilesEn;
  const projects: Project[] = [];
  
  for (const path in files) {
    const rawContent = files[path] as string;
    const project = parseProject(rawContent);
    if (project.id) {
      projects.push(project);
    }
  }
  
  // Sort by number (descending - higher number first)
  return projects.sort((a, b) => parseInt(b.number) - parseInt(a.number));
}

export function getProject(id: string, lang: 'en' | 'ko'): Project | null {
  const projects = getProjects(lang);
  return projects.find(project => project.id === id) || null;
}

// Categories for blog filtering
export const categories = [
  { id: 'all', name: 'All', nameKo: '전체' },
  { id: 'category1', name: 'Category1', nameKo: '카테고리1' },
  { id: 'category2', name: 'Category2', nameKo: '카테고리2' },
  { id: 'category3', name: 'Category3', nameKo: '카테고리3' },
];
