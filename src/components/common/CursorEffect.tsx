
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
      className="fixed pointer-events-none w-[400px] h-[400px] rounded-full bg-white/4 blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: "left 0.4s ease-out, top 0.4s ease-out" // Slightly faster transition to match jelly effect
      }}
    />
  );
};

export default CursorEffect;
