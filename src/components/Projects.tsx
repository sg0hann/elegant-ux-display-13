
import { Button } from "@/components/ui/button";
import MotionDiv from "./common/MotionDiv";
import ProjectCard from "./common/ProjectCard";

// Placeholder projects (to be updated later)
const projects = [
  {
    title: "E-Commerce UX Redesign",
    description: "A comprehensive redesign of an e-commerce platform focusing on improving user experience and conversion rates.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    tags: ["UX/UI Design", "User Research", "Prototype"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "Healthcare Dashboard",
    description: "An interactive dashboard for healthcare professionals to monitor patient data and track outcomes.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "UI Design", "Data Visualization"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "AI-Powered Content Generator",
    description: "A tool that leverages generative AI to create personalized content based on user preferences.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    tags: ["Generative AI", "UX Design", "Frontend Development"],
    demoLink: "#",
    githubLink: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <MotionDiv animation="fade-in">
          <p className="subtitle text-center">My Work</p>
          <h2 className="heading-lg text-center mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            A selection of my recent work showcasing my skills in UX/UI design, frontend development, 
            and the application of psychological principles and generative AI.
          </p>
        </MotionDiv>

        <MotionDiv animation="fade-in" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
            />
          ))}
        </MotionDiv>

        <MotionDiv animation="fade-in" className="text-center">
          <Button asChild size="lg">
            <a href="#contact">Discuss Your Project</a>
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Projects;
