"use client";
import React, { FC, useRef, useEffect } from 'react';

interface SimulationCanvasProps {
  positions: number[];
  roadLength: number;
}

const SimulationCanvas: FC<SimulationCanvasProps> = ({ positions, roadLength }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      const x = (pos / roadLength) * canvas.width;
      const y = canvas.height / 2;
      ctx.fillRect(x, y, 3, 3);
    }
  }, [positions, roadLength]);

  return (
    <canvas ref={canvasRef} width={800} height={200} style={{ border: '1px solid white' }} />
  );
};

export default SimulationCanvas;
