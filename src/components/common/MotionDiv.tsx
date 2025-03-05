
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MotionDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade-in" | "slide-up" | "slide-down" | "scale-in" | "float" | "pulse";
  delay?: number; // in milliseconds
  threshold?: number; // visibility threshold (0-1)
  duration?: number; // animation duration in ms
}

const MotionDiv = ({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  duration = 300,
  className,
  ...props
}: MotionDivProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";
    
    switch (animation) {
      case "fade-in":
        return "animate-fade-in";
      case "slide-up":
        return "animate-slide-up";
      case "slide-down":
        return "animate-slide-down";
      case "scale-in":
        return "animate-scale-in";
      case "float":
        return "floating";
      case "pulse":
        return "pulse";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(getAnimationClass(), className)}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
        animationDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default MotionDiv;
