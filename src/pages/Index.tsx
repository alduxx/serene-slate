import Hero from "@/components/Hero";
import ArtigosList from "@/components/ArtigosList";
import PoesiasList from "@/components/PoesiasList";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const scrollToSection = () => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -20;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      
      // Try immediately
      setTimeout(scrollToSection, 0);
      // Try again after render
      setTimeout(scrollToSection, 100);
      // Final attempt
      setTimeout(scrollToSection, 500);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Hero />
      <ArtigosList />
      <PoesiasList />
      <Footer />
    </div>
  );
};

export default Index;