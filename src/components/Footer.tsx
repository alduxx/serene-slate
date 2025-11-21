import { useEffect, useState } from "react";
import { getArtigos, getPoesias } from "@/lib/markdown";
import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [stats, setStats] = useState({
    artigos: 0,
    poesias: 0,
    totalWords: 0,
  });

  useEffect(() => {
    Promise.all([getArtigos(), getPoesias()]).then(([artigos, poesias]) => {
      // Count words from all content
      const countWords = (text: string) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
      };

      const artigosWords = artigos.reduce((total, artigo) => {
        return total + countWords(artigo.content);
      }, 0);

      const poesiasWords = poesias.reduce((total, poesia) => {
        return total + countWords(poesia.content);
      }, 0);

      setStats({
        artigos: artigos.length,
        poesias: poesias.length,
        totalWords: artigosWords + poesiasWords,
      });
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
          <Link to="/#artigos">
            <div className="text-center border-2 border-foreground p-6 hover:bg-accent/30 hover:border-primary transition-all duration-300 cursor-pointer">
              <div className="text-4xl font-display font-bold mb-2">
                {stats.artigos}
              </div>
              <div className="text-sm uppercase tracking-wider">Artigos</div>
            </div>
          </Link>
          <Link to="/#poesias">
            <div className="text-center border-2 border-foreground p-6 hover:bg-accent/30 hover:border-primary transition-all duration-300 cursor-pointer">
              <div className="text-4xl font-display font-bold mb-2">
                {stats.poesias}
              </div>
              <div className="text-sm uppercase tracking-wider">Poesias</div>
            </div>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <a 
            href="mailto:eu@aldomonteiro.com.br"
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a 
            href="https://instagram.com/b_aldo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={20} />
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