import { useEffect, useRef } from 'react';

interface CanvasArtProps {
  seed: number;
  className?: string;
  width?: number;
  height?: number;
  styleType?: 'Fantasy' | 'Realistic' | 'Anime' | 'Abstract';
}

export function CanvasArt({ seed, className = '', width = 400, height = 400, styleType = 'Abstract' }: CanvasArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pseudo-random generator based on seed
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Palettes
    const palettes = {
      Fantasy: ['#2a0845', '#6441A5', '#FF6B6B', '#FFD93D'],
      Realistic: ['#2C3E50', '#3498DB', '#E74C3C', '#ECF0F1'],
      Anime: ['#FF9A9E', '#FECFEF', '#A1C4FD', '#C2E9FB'],
      Abstract: ['#000000', '#FF6B6B', '#FFD93D', '#00D4AA']
    };

    const colors = palettes[styleType] || palettes.Abstract;

    // Fill background
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, width, height);

    // Draw shapes
    const shapeCount = 5 + Math.floor(random() * 10);
    
    for (let i = 0; i < shapeCount; i++) {
      ctx.beginPath();
      
      const isCircle = random() > 0.5;
      const x = random() * width;
      const y = random() * height;
      const size = 20 + random() * 100;
      
      const gradient = ctx.createLinearGradient(
        x - size, y - size, x + size, y + size
      );
      gradient.addColorStop(0, colors[1 + Math.floor(random() * (colors.length - 1))] + '80');
      gradient.addColorStop(1, colors[1 + Math.floor(random() * (colors.length - 1))] + 'CC');
      
      ctx.fillStyle = gradient;

      if (isCircle) {
        ctx.arc(x, y, size, 0, Math.PI * 2);
      } else {
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x - size, y + size);
      }
      
      ctx.fill();
    }
    
    // Add noise overlay
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (random() - 0.5) * 20;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imgData, 0, 0);

  }, [seed, width, height, styleType]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className={`rounded-xl object-cover block ${className}`}
    />
  );
}
