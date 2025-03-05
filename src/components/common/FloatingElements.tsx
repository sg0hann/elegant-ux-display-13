
import { useEffect, useState, useRef } from "react";

interface Element {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  shape: "circle" | "triangle" | "square" | "star";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  scale: number; // Add scale property for jelly effect
}

const FloatingElements = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Generate initial elements
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const shapes = ["circle", "triangle", "square", "star"];
    const colors = ["#E5DEFF", "#D3E4FD", "#FFDEE2", "#F1F0FB", "#6E59A5", "#9b87f5"];
    
    // Create 15-20 random elements (reduced count for elegance)
    const elementCount = Math.floor(Math.random() * 6) + 15;
    const newElements: Element[] = [];
    
    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 25 + 8, // Slightly smaller elements
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.2 + 0.05, // Much slower speed for calmness
        shape: shapes[Math.floor(Math.random() * shapes.length)] as "circle" | "triangle" | "square" | "star",
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.2, // Slower rotation
        opacity: Math.random() * 0.3 + 0.2, // Lower opacity for elegance
        scale: 1 // Default scale
      });
    }
    
    setElements(newElements);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate elements with gentler motion
  useEffect(() => {
    if (!containerRef.current || elements.length === 0) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const MOUSE_INFLUENCE_RADIUS = 180; // Slightly reduced influence area for more subtle effect
    const JELLY_EFFECT_RADIUS = 200; // Radius for jelly effect
    
    const animate = () => {
      setElements(prevElements => {
        return prevElements.map(el => {
          // Calculate distance to mouse
          const dx = mousePosition.x - el.x;
          const dy = mousePosition.y - el.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Move element away from mouse if within influence radius
          let newX = el.x;
          let newY = el.y;
          let newScale = el.scale;
          
          if (distance < MOUSE_INFLUENCE_RADIUS) {
            // Move away from cursor with gentler strength
            const repelStrength = (1 - distance / MOUSE_INFLUENCE_RADIUS) * 0.8;
            newX = el.x - (dx / distance) * repelStrength;
            newY = el.y - (dy / distance) * repelStrength;
            
            // Apply jelly-like scaling effect - more when closer to cursor
            newScale = 1 + (1 - Math.min(distance, JELLY_EFFECT_RADIUS) / JELLY_EFFECT_RADIUS) * 0.35;
          } else {
            // Gentle floating movement using sine waves with very low amplitude
            newX = el.x + Math.sin(Date.now() * 0.0005 + el.id) * el.speed;
            newY = el.y + Math.cos(Date.now() * 0.0005 + el.id * 0.7) * el.speed;
            
            // Gradually return to normal scale
            newScale = el.scale > 1 ? el.scale - 0.02 : 1;
          }
          
          // Gentle boundary check with smooth return
          if (newX < 0) newX = newX + el.speed * 2;
          if (newX > width) newX = newX - el.speed * 2;
          if (newY < 0) newY = newY + el.speed * 2;
          if (newY > height) newY = newY - el.speed * 2;
          
          return {
            ...el,
            x: newX,
            y: newY,
            rotation: (el.rotation + el.rotationSpeed) % 360,
            scale: newScale
          };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [elements.length, mousePosition]);

  // Render shapes based on their type
  const renderShape = (element: Element) => {
    const { shape, size, color, rotation, opacity, scale } = element;
    
    switch (shape) {
      case "circle":
        return (
          <div 
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              opacity: opacity,
              transform: `scale(${scale})`,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" // Jelly-like elastic transition
            }}
          />
        );
      case "square":
        return (
          <div 
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: `rotate(${rotation}deg) scale(${scale})`,
              opacity: opacity,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          />
        );
      case "triangle":
        return (
          <div 
            className="absolute w-0 h-0"
            style={{
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              transform: `rotate(${rotation}deg) scale(${scale})`,
              opacity: opacity,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          />
        );
      case "star":
        return (
          <div 
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(${rotation}deg) scale(${scale})`,
              opacity: opacity,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            <svg 
              width={size} 
              height={size} 
              viewBox="0 0 24 24" 
              fill={color}
            >
              <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"
    >
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            transform: `rotate(${element.rotation}deg)`,
            transition: "left 1.2s cubic-bezier(0.22, 1, 0.36, 1), top 1.2s cubic-bezier(0.22, 1, 0.36, 1)", // Smoother movement transitions
            opacity: element.opacity
          }}
        >
          {renderShape(element)}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
