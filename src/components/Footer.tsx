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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="text-center border-2 border-foreground p-6">
            <div className="text-4xl font-display font-bold mb-2">
              {(stats.totalWords / 1000).toFixed(1)}K
            </div>
            <div className="text-sm uppercase tracking-wider">Palavras Totais</div>
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

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href="https://instagram.com/b_aldo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span className="text-sm">@b_aldo</span>
          </a>
          <a 
            href="mailto:eu@aldomonteiro.com.br"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="text-sm">eu@aldomonteiro.com.br</span>
          </a>
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