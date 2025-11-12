import matter from 'gray-matter';

export interface MarkdownFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

export interface MarkdownContent {
  frontmatter: MarkdownFrontmatter;
  content: string;
  slug: string;
}

// Load markdown files at build time using Vite's glob import
const artigosModules = import.meta.glob('/public/conteudo/artigos/*.md', { 
  query: '?raw', 
  import: 'default' 
});

const poesiasModules = import.meta.glob('/public/conteudo/poesias/*.md', { 
  query: '?raw', 
  import: 'default' 
});

const sobreModule = import.meta.glob('/public/conteudo/sobre.md', { 
  query: '?raw', 
  import: 'default' 
});

async function parseMarkdown(filePath: string, rawContent: string): Promise<MarkdownContent> {
  const { data, content } = matter(rawContent);
  const slug = filePath.split('/').pop()?.replace('.md', '') || '';
  
  return {
    frontmatter: data as MarkdownFrontmatter,
    content,
    slug,
  };
}

export async function getArtigos(): Promise<MarkdownContent[]> {
  const artigos = await Promise.all(
    Object.entries(artigosModules).map(async ([path, resolver]) => {
      const content = await resolver() as string;
      return parseMarkdown(path, content);
    })
  );
  
  // Sort by date, most recent first
  return artigos.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getPoesias(): Promise<MarkdownContent[]> {
  const poesias = await Promise.all(
    Object.entries(poesiasModules).map(async ([path, resolver]) => {
      const content = await resolver() as string;
      return parseMarkdown(path, content);
    })
  );
  
  return poesias.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getArtigoBySlug(slug: string): Promise<MarkdownContent | null> {
  const artigos = await getArtigos();
  return artigos.find(a => a.slug === slug) || null;
}

export async function getPoesiaBySlug(slug: string): Promise<MarkdownContent | null> {
  const poesias = await getPoesias();
  return poesias.find(p => p.slug === slug) || null;
}

export async function getSobre(): Promise<MarkdownContent | null> {
  const entries = Object.entries(sobreModule);
  if (entries.length === 0) return null;
  
  const [path, resolver] = entries[0];
  const content = await resolver() as string;
  return parseMarkdown(path, content);
}