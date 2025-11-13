import heroMountain from "@/assets/hero-mountain.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.95)), url(${heroMountain})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Profile Photo */}
          <div className="mb-8 flex justify-center">
            <img 
              src={profilePhoto} 
              alt="Profile" 
              className="w-48 h-48 rounded-full object-cover object-top border-4 border-accent shadow-lg"
            />
          </div>
          
          {/* Name */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground">
            Aldo Monteiro
          </h1>
          
          {/* Bio */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
            Escritor, pensador e explorador de ideias. 
            Compartilhando reflexões sobre trabalho, propósito e a arte de viver bem.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => scrollToSection('artigos')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
            >
              Ler Artigos
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('poesias')}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium px-8"
            >
              Ver Poesias
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;