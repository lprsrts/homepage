import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface BackgroundProps {
  isDarkMode: boolean;
}

interface Gradient {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
}

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: var(--background);
  transition: background-color 0.3s ease;
`;

const GradientCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
`;

const ModernBackground: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Performance optimizations - limit gradients based on screen size
    const screenArea = window.innerWidth * window.innerHeight;
    // Use 2 gradients for smaller screens, 3 for larger ones
    const gradientCount = screenArea < 500000 ? 2 : 3;
    
    // Animation variables
    let animationFrameId: number;
    const gradients: Gradient[] = [];
    
    // Create initial gradients with colors from our palette
    for (let i = 0; i < gradientCount; i++) {
      gradients.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 100 + Math.random() * 300,
        // Slow down the movement for a more subtle effect
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: isDarkMode ? 
          `rgba(18, 78, 102, ${0.1 + Math.random() * 0.1})` : // accent color with opacity
          `rgba(18, 78, 102, ${0.06 + Math.random() * 0.08})` // accent color with lower opacity
      });
    }
    
    // Track time for frame limiting
    let lastFrameTime = 0;
    const fpsLimit = 30; // Limit frames per second
    
    // Animation function with frame rate limiting
    const animate = (timestamp: number) => {
      // Limit frame rate
      if (timestamp - lastFrameTime < 1000 / fpsLimit) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradients
      gradients.forEach(gradient => {
        // Update position
        gradient.x += gradient.vx;
        gradient.y += gradient.vy;
        
        // Bounce off edges
        if (gradient.x < 0 || gradient.x > canvas.width) gradient.vx *= -1;
        if (gradient.y < 0 || gradient.y > canvas.height) gradient.vy *= -1;
        
        // Draw gradient
        const radGrad = ctx.createRadialGradient(
          gradient.x, gradient.y, 0,
          gradient.x, gradient.y, gradient.size
        );
        
        radGrad.addColorStop(0, gradient.color);
        radGrad.addColorStop(1, 'transparent');
        
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);
  
  return (
    <BackgroundContainer>
      <GradientCanvas ref={canvasRef} />
    </BackgroundContainer>
  );
};

export default ModernBackground;