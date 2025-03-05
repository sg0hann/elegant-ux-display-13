
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MotionDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade-in" | "slide-up" | "slide-down" | "scale-in";
  delay?: number; // in milliseconds
  threshold?: number; // visibility threshold (0-1)
}

const MotionDiv = ({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
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

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation}` : "opacity-0",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards" 
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default MotionDiv;
