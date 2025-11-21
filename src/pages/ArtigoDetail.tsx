import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getArtigoBySlug, type MarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ArtigoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [artigo, setArtigo] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBackToArticles = () => {
    navigate('/#artigos');
  };

  useEffect(() => {
    if (slug) {
      getArtigoBySlug(slug).then((data) => {
        setArtigo(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border py-6 sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16 animate-fade-in">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <time>{new Date(artigo.frontmatter.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</time>
              </div>
            </div>
            
            {artigo.frontmatter.tags && (
              <div className="flex gap-2 flex-wrap mb-6">
                {artigo.frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {artigo.content}
            </ReactMarkdown>
          </div>

          {/* Back to articles */}
          <div className="mt-16 pt-8 border-t-2 border-border">
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={handleBackToArticles}
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todos os artigos
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArtigoDetail;