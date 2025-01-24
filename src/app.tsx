import React, { useState, useEffect, useRef } from 'react';

interface ClockProps {
  size?: number;
}

const App: React.FC<ClockProps> = ({ size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawClock = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = size / 2;

      // Draw clock face
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw hour markers
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 * Math.PI) / 180;
        const x = centerX + (radius - 10) * Math.sin(angle);
        const y = centerY - (radius - 10) * Math.cos(angle);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
      }

      // Draw hands
      const hour = time.getHours() % 12;
      const minute = time.getMinutes();
      const second = time.getSeconds();

      const hourAngle = ((hour * 30 + minute / 2) * Math.PI) / 180;
      const minuteAngle = ((minute * 6) * Math.PI) / 180;
      const secondAngle = ((second * 6) * Math.PI) / 180;

      drawHand(ctx, centerX, centerY, hourAngle, radius * 0.5, 4); // Hour hand
      drawHand(ctx, centerX, centerY, minuteAngle, radius * 0.7, 3); // Minute hand
      drawHand(ctx, centerX, centerY, secondAngle, radius * 0.9, 2, 'red'); // Second hand

      // Center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
    };

    const drawHand = (
      ctx: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      angle: number,
      length: number,
      width: number,
      color?: string,
    ) => {
      const x = centerX + length * Math.sin(angle);
      const y = centerY - length * Math.cos(angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = color || 'black';
      ctx.lineWidth = width;
      ctx.stroke();
    };


    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    drawClock(); // Initial draw

    return () => {
      clearInterval(intervalId);
    };

  }, [size]);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
          canvas.width = size;
          canvas.height = size;
      }
  }, [size]);



  return (
    <canvas ref={canvasRef} width={size} height={size}></canvas>
  );
};

export default App;
