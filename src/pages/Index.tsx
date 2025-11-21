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
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
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