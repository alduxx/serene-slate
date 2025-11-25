import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPoesias, type MarkdownContent } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import diagonalTexture from "@/assets/diagonal-texture.jpg";

const PoesiasList = () => {
  const [poesias, setPoesias] = useState<MarkdownContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPoesias().then((data) => {
      // Mostrar apenas as 3 poesias mais recentes
      setPoesias(data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section id="poesias" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center">Carregando poesias...</div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="poesias" 
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(207,234,236,0.3), rgba(168,227,230,0.2)), url(${diagonalTexture})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fade-in">
          <div className="inline-block border-2 border-foreground px-4 py-1 mb-6">
            <span className="font-display text-sm tracking-wider uppercase">Poemas Selecionados</span>
          </div>
        </div>

        {/* Poetry Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {poesias.map((poesia, index) => (
            <Card 
              key={poesia.slug}
              className="hover:shadow-xl transition-all duration-300 bg-card/95 backdrop-blur border-2 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <Link to={`/poesias/${poesia.slug}`}>
                  <CardTitle className="font-display text-2xl mb-2 group-hover:text-primary transition-colors cursor-pointer">
                    {poesia.frontmatter.title}
                  </CardTitle>
                </Link>
                {poesia.frontmatter.excerpt && (
                  <Link to={`/poesias/${poesia.slug}`}>
                    <CardDescription className="text-sm italic cursor-pointer hover:text-foreground transition-colors">
                      {poesia.frontmatter.excerpt}
                    </CardDescription>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                <Link to={`/poesias/${poesia.slug}`}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-primary hover:text-primary/80 hover:bg-transparent p-0"
                  >
                    Ler poesia →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ver Todas Link */}
        <div className="flex justify-center mt-12 mb-8">
          <Link to="/poesias">
            <Button variant="outline" size="lg" className="font-display">
              Ver todas as poesias →
            </Button>
          </Link>
        </div>

        {/* Decorative Diamond */}
        <div className="flex justify-center my-16">
          <div className="w-16 h-16 bg-accent rotate-45 shadow-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default PoesiasList;