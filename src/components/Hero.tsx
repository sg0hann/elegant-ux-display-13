
import { Button } from "@/components/ui/button";
import MotionDiv from "./common/MotionDiv";
import { ArrowDown, Download } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center">
            <MotionDiv animation="fade-in" delay={200}>
              <p className="subtitle">UX/UI Designer & Frontend Developer</p>
            </MotionDiv>
            
            <MotionDiv animation="fade-in" delay={400}>
              <h1 className="heading-xl mb-6">
                Hi, I'm <span className="text-primary">Khwahish</span> Kushwah
              </h1>
            </MotionDiv>
            
            <MotionDiv animation="fade-in" delay={600}>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                I craft exceptional digital experiences through thoughtful design and clean code, with insights from psychological research and generative AI.
              </p>
            </MotionDiv>
            
            <MotionDiv animation="fade-in" delay={800} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <a href="#projects">
                  View My Work
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="#" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </MotionDiv>
          </div>
          
          <MotionDiv 
            animation="scale-in" 
            delay={400} 
            className="relative hidden lg:block"
          >
            <div className="w-full aspect-square rounded-full bg-gradient-to-br from-secondary via-background to-secondary/50 flex items-center justify-center overflow-hidden border border-border p-6">
              <div className="w-full h-full rounded-full overflow-hidden bg-secondary/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-48 h-48 rounded-full mx-auto mb-6 bg-secondary flex items-center justify-center text-5xl font-light">
                    KK
                  </div>
                  <p className="font-medium text-lg">Generative AI & Psychological Research Specialist</p>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-200 rounded-full"></div>
          </MotionDiv>
        </div>
        
        <MotionDiv 
          animation="fade-in" 
          delay={1200} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
        >
          <p className="text-sm font-medium mb-2">Scroll Down</p>
          <div className="animate-bounce">
            <ArrowDown className="h-5 w-5" />
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Hero;
