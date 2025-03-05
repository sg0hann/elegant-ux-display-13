
import { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CursorEffect = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", updateCursorPosition);
    
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);
  
  return (
    <div 
      className="fixed pointer-events-none w-[450px] h-[450px] rounded-full bg-white/3 blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: "left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" // More elegant, slightly bouncy transition
      }}
    />
  );
};

export default CursorEffect;
