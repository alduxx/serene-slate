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

interface Manifest {
  artigos: string[];
  poesias: string[];
  sobre: string;
}

let manifestCache: Manifest | null = null;

async function getManifest(): Promise<Manifest> {
  if (manifestCache) return manifestCache;
  
  const response = await fetch('/conteudo/manifest.json');
  if (!response.ok) {
    throw new Error('Não foi possível carregar o manifest');
  }
  
  manifestCache = await response.json();
  return manifestCache;
}

async function fetchMarkdown(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Não foi possível carregar ${path}`);
  }
  return response.text();
}

async function parseMarkdown(slug: string, rawContent: string): Promise<MarkdownContent> {
  const { data, content } = matter(rawContent);
  
  return {
    frontmatter: data as MarkdownFrontmatter,
    content,
    slug,
  };
}

export async function getArtigos(): Promise<MarkdownContent[]> {
  const manifest = await getManifest();
  
  const artigos = await Promise.all(
    manifest.artigos.map(async (slug) => {
      const rawContent = await fetchMarkdown(`/conteudo/artigos/${slug}.md`);
      return parseMarkdown(slug, rawContent);
    })
  );
  
  // Sort by date, most recent first
  return artigos.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getPoesias(): Promise<MarkdownContent[]> {
  const manifest = await getManifest();
  
  const poesias = await Promise.all(
    manifest.poesias.map(async (slug) => {
      const rawContent = await fetchMarkdown(`/conteudo/poesias/${slug}.md`);
      return parseMarkdown(slug, rawContent);
    })
  );
  
  return poesias.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getArtigoBySlug(slug: string): Promise<MarkdownContent | null> {
  try {
    const rawContent = await fetchMarkdown(`/conteudo/artigos/${slug}.md`);
    return parseMarkdown(slug, rawContent);
  } catch {
    return null;
  }
}

export async function getPoesiaBySlug(slug: string): Promise<MarkdownContent | null> {
  try {
    const rawContent = await fetchMarkdown(`/conteudo/poesias/${slug}.md`);
    return parseMarkdown(slug, rawContent);
  } catch {
    return null;
  }
}

export async function getSobre(): Promise<MarkdownContent | null> {
  try {
    const rawContent = await fetchMarkdown('/conteudo/sobre.md');
    return parseMarkdown('sobre', rawContent);
  } catch {
    return null;
  }
}