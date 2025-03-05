
import { Button } from "@/components/ui/button";
import MotionDiv from "./common/MotionDiv";
import { Code, Layout, Lightbulb, Sparkles } from "lucide-react";

const skills = [
  {
    category: "Design",
    items: ["UI/UX Design", "Wireframing", "Prototyping", "User Research", "Design Systems"]
  },
  {
    category: "Development",
    items: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS", "Responsive Design"]
  },
  {
    category: "Research",
    items: ["Psychological Research", "Generative AI", "Data Analysis", "User Testing", "A/B Testing"]
  }
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <MotionDiv animation="fade-in">
          <p className="subtitle text-center">About Me</p>
          <h2 className="heading-lg text-center mb-16">My Background & Skills</h2>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <MotionDiv animation="fade-in" className="order-2 lg:order-1">
            <h3 className="heading-md mb-6">Bridging Design, Code & Psychology</h3>
            <p className="text-muted-foreground mb-6">
              As a UX/UI Designer and Frontend Developer with a unique background in psychological 
              research and generative AI, I bring a holistic perspective to digital product 
              development. My approach combines aesthetic sensibility with technical expertise and 
              a deep understanding of human behavior.
            </p>
            <p className="text-muted-foreground mb-8">
              I'm passionate about creating digital experiences that are not only visually stunning 
              and technically sound but also psychologically resonant. By applying insights from 
              psychological research and leveraging the capabilities of generative AI, I craft 
              solutions that truly connect with users.
            </p>
            <Button asChild>
              <a href="#contact">Let's Work Together</a>
            </Button>
          </MotionDiv>

          <MotionDiv animation="fade-in" className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover-scale">
                <Layout className="h-10 w-10 mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2">UI/UX Design</h4>
                <p className="text-sm text-muted-foreground">
                  Creating intuitive and beautiful interfaces with a focus on user experience.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover-scale">
                <Code className="h-10 w-10 mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2">Frontend Development</h4>
                <p className="text-sm text-muted-foreground">
                  Building responsive and performant web applications with modern technologies.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover-scale">
                <Lightbulb className="h-10 w-10 mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2">Psychological Research</h4>
                <p className="text-sm text-muted-foreground">
                  Applying psychological principles to enhance user engagement and satisfaction.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover-scale">
                <Sparkles className="h-10 w-10 mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2">Generative AI</h4>
                <p className="text-sm text-muted-foreground">
                  Leveraging AI to create innovative solutions and enhance creative processes.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>

        <MotionDiv animation="fade-in" className="mt-20">
          <h3 className="heading-md text-center mb-12">My Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-border bg-card shadow-sm"
              >
                <h4 className="text-lg font-semibold mb-4">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default About;
