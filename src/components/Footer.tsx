import { useEffect, useState } from "react";
import { getArtigos, getPoesias } from "@/lib/markdown";

const Footer = () => {
  const [stats, setStats] = useState({
    artigos: 0,
    poesias: 0,
    totalWords: 6900, // Approximate
    avgReadTime: 0.8, // minutes per 100 words
  });

  useEffect(() => {
    Promise.all([getArtigos(), getPoesias()]).then(([artigos, poesias]) => {
      setStats(prev => ({
        ...prev,
        artigos: artigos.length,
        poesias: poesias.length,
      }));
    });
  }, []);

  return (
    <footer className="bg-accent/20 py-16 border-t-2 border-accent">
      <div className="container mx-auto px-6">
        {/* Signature Style Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="inline-block border-2 border-foreground px-4 py-1 mb-8">
            <span className="font-display text-sm tracking-wider uppercase">Sobre</span>
          </div>
          
          <div className="text-center mb-12">
            <h3 className="font-display text-4xl mb-4">Obrigado pela visita</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Se você gostou do que leu, sinta-se à vontade para compartilhar. 
              Estou sempre explorando novas ideias e perspectivas.
            </p>
          </div>

          {/* Signature */}
          <div className="text-center mb-12">
            <p className="font-display text-5xl mb-2">Aldo</p>
            <div className="w-32 h-1 bg-primary mx-auto"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
          <div className="text-center border-2 border-foreground p-6">
            <div className="text-4xl font-display font-bold mb-2">
              {(stats.totalWords / 1000).toFixed(1)}K
            </div>
            <div className="text-sm uppercase tracking-wider">Total Words</div>
          </div>
          <div className="text-center border-2 border-foreground p-6">
            <div className="text-4xl font-display font-bold mb-2">
              {stats.avgReadTime.toFixed(1)}
            </div>
            <div className="text-sm uppercase tracking-wider">Avg Read Time (min)</div>
          </div>
          <div className="text-center border-2 border-foreground p-6">
            <div className="text-4xl font-display font-bold mb-2">
              {stats.artigos}
            </div>
            <div className="text-sm uppercase tracking-wider">Artigos</div>
          </div>
          <div className="text-center border-2 border-foreground p-6">
            <div className="text-4xl font-display font-bold mb-2">
              {stats.poesias}
            </div>
            <div className="text-sm uppercase tracking-wider">Poesias</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Aldo Monteiro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;