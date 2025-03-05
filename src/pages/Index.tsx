
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorEffect from "@/components/common/CursorEffect";
import FloatingElements from "@/components/common/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CursorEffect />
      <FloatingElements />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
