import Hero from "@/components/Hero";
import ArtigosList from "@/components/ArtigosList";
import PoesiasList from "@/components/PoesiasList";
import Footer from "@/components/Footer";

const Index = () => {
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