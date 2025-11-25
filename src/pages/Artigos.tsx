import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArtigos, type MarkdownContent } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
const Artigos = () => {
  const [artigos, setArtigos] = useState<MarkdownContent[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getArtigos().then(data => {
      setArtigos(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">Carregando artigos...</div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <Link to="/" className="font-display text-xl">
            Aldo Monteiro
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-16 animate-fade-in">
            <div className="inline-block border-2 border-foreground px-4 py-1 mb-6">
              <span className="font-display text-sm tracking-wider uppercase">Todos os Artigos</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Todos os Artigos</h1>
            <p className="text-xl text-muted-foreground">
              {artigos.length} {artigos.length === 1 ? 'artigo publicado' : 'artigos publicados'}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {artigos.map((artigo, index) => <Card key={artigo.slug} className="hover:shadow-lg transition-all duration-300 border-2 animate-fade-in overflow-hidden group" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <CalendarDays className="w-4 h-4" />
                    <time>{new Date(artigo.frontmatter.date).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                  </div>
                  <Link to={`/artigos/${artigo.slug}`}>
                    <CardTitle className="font-display text-3xl mb-3 group-hover:text-primary transition-colors cursor-pointer">
                      {artigo.frontmatter.title}
                    </CardTitle>
                  </Link>
                  {artigo.frontmatter.excerpt && <Link to={`/artigos/${artigo.slug}`}>
                      <CardDescription className="text-base leading-relaxed cursor-pointer hover:text-foreground transition-colors">
                        {artigo.frontmatter.excerpt}
                      </CardDescription>
                    </Link>}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {artigo.frontmatter.tags?.map(tag => <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>)}
                    </div>
                    <Link to={`/artigos/${artigo.slug}`}>
                      <Button variant="ghost" className="text-primary hover:text-primary/80">
                        Ler mais →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Artigos;