import React from 'react';
import { useEffect, useRef } from 'react';

const AnimatedBlobBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const blobs = [];  
    const colors = [
      'rgba(255, 103, 100, 0.7)',
      'rgba(100, 255, 218, 0.7)',
      'rgba(100, 198, 255, 0.7)',
      'rgba(31, 255, 131, 0.7)',
      'rgba(255, 150, 210, 0.7)',
    ];

    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach(blob => {
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = blob.color;
        ctx.fill();
        ctx.closePath();

        blob.x += blob.dx;
        blob.y += blob.dy;

        if (blob.x + blob.radius > canvas.width || blob.x - blob.radius < 0) {
          blob.dx *= -1;
        }
        if (blob.y + blob.radius > canvas.height || blob.y - blob.radius < 0) {
          blob.dy *= -1;
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default AnimatedBlobBackground;