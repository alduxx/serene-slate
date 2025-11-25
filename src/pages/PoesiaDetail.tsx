import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPoesiaBySlug, type MarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import diagonalTexture from "@/assets/diagonal-texture.jpg";

const PoesiaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [poesia, setPoesia] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBackToPoesias = () => {
    navigate('/#poesias');
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = poesia?.frontmatter.title || 'Poesia';
    const text = poesia?.frontmatter.excerpt || '';

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
      getPoesiaBySlug(slug).then((data) => {
        setPoesia(data);
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

  if (!poesia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Poesia não encontrada</h1>
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(207,234,236,0.4), rgba(168,227,230,0.3)), url(${diagonalTexture})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
      }}
    >
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
              <Link to="/" className="font-display text-2xl md:text-3xl font-bold hover:text-primary transition-colors">
                Aldo Monteiro
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Poetry Content */}
      <article className="py-24 animate-fade-in">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-card/95 backdrop-blur border-2 border-border rounded-lg p-12 shadow-xl">
            {/* Title */}
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 text-center">
              {poesia.frontmatter.title}
            </h1>
            
            {poesia.frontmatter.excerpt && (
              <p className="text-center text-muted-foreground italic mb-12 text-lg">
                {poesia.frontmatter.excerpt}
              </p>
            )}

            {/* Decorative line */}
            <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

            {/* Poetry Content */}
            <div className="poetry text-center">
              <ReactMarkdown
                components={{
                  h1: () => null, // Hide h1 since we show title separately
                  p: ({ children }) => (
                    <p className="mb-6 leading-loose text-lg md:text-xl">{children}</p>
                  ),
                }}
              >
                {poesia.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Back to poetry */}
          <div className="mt-16 text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 bg-card/80 backdrop-blur"
              onClick={handleBackToPoesias}
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todas as poesias
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PoesiaDetail;