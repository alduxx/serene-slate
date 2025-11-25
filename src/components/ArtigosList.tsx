import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArtigos, type MarkdownContent } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

const ArtigosList = () => {
  const [artigos, setArtigos] = useState<MarkdownContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtigos().then((data) => {
      setArtigos(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section id="artigos" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">Carregando artigos...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="artigos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fade-in">
          <div className="inline-block border-2 border-foreground px-4 py-1 mb-6">
            <span className="font-display text-sm tracking-wider uppercase">Artigos Recentes</span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {artigos.map((artigo, index) => (
            <Card 
              key={artigo.slug}
              className="hover:shadow-lg transition-all duration-300 border-2 animate-fade-in overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
                {artigo.frontmatter.excerpt && (
                  <Link to={`/artigos/${artigo.slug}`}>
                    <CardDescription className="text-base leading-relaxed cursor-pointer hover:text-foreground transition-colors">
                      {artigo.frontmatter.excerpt}
                    </CardDescription>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {artigo.frontmatter.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/artigos/${artigo.slug}`}>
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      Ler mais →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtigosList;