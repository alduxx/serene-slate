import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getArtigoBySlug, type MarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ArtigoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [artigo, setArtigo] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBackToArticles = () => {
    navigate('/#artigos');
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = artigo?.frontmatter.title || 'Artigo';
    const text = artigo?.frontmatter.excerpt || '';

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Erro ao compartilhar:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência.",
        });
      } catch (err) {
        console.error('Erro ao copiar link:', err);
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o link.",
          variant: "destructive",
        });
      }
    }
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
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
            <Link to="/" className="font-display text-2xl md:text-3xl font-bold hover:text-primary transition-colors">
              Aldo Monteiro
            </Link>
          </div>
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
            
            <div className="flex items-center justify-between mb-6">
              {artigo.frontmatter.tags && (
                <div className="flex gap-2 flex-wrap">
                  {artigo.frontmatter.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 ml-4">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>
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