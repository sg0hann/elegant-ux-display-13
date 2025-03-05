
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
    const colors = ["#6E59A5", "#9b87f5", "#D6BCFA", "#7E69AB", "#E5DEFF"];
    
    // Create 20-30 random elements
    const elementCount = Math.floor(Math.random() * 11) + 20;
    const newElements: Element[] = [];
    
    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 30 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
        shape: shapes[Math.floor(Math.random() * shapes.length)] as "circle" | "triangle" | "square" | "star",
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5
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

  // Animate elements
  useEffect(() => {
    if (!containerRef.current || elements.length === 0) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const MOUSE_INFLUENCE_RADIUS = 200;
    
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
          
          if (distance < MOUSE_INFLUENCE_RADIUS) {
            // Move away from cursor with strength inversely proportional to distance
            const repelStrength = (1 - distance / MOUSE_INFLUENCE_RADIUS) * 2;
            newX = el.x - (dx / distance) * repelStrength;
            newY = el.y - (dy / distance) * repelStrength;
          } else {
            // Normal floating movement
            newX = el.x + Math.sin(Date.now() * 0.001 + el.id) * el.speed;
            newY = el.y + Math.cos(Date.now() * 0.001 + el.id) * el.speed;
          }
          
          // Boundary check
          if (newX < 0) newX = width;
          if (newX > width) newX = 0;
          if (newY < 0) newY = height;
          if (newY > height) newY = 0;
          
          return {
            ...el,
            x: newX,
            y: newY,
            rotation: (el.rotation + el.rotationSpeed) % 360
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
    const { shape, size, color, rotation } = element;
    
    switch (shape) {
      case "circle":
        return (
          <div 
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              opacity: 0.6
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
              transform: `rotate(${rotation}deg)`,
              opacity: 0.6
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
              transform: `rotate(${rotation}deg)`,
              opacity: 0.6
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
              transform: `rotate(${rotation}deg)`,
              opacity: 0.6
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
            transition: "transform 0.5s ease-out",
            opacity: 0.6
          }}
        >
          {renderShape(element)}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
