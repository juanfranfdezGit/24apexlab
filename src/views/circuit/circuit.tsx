import { useEffect, useRef } from 'react'
import { startLoop } from '../../canvas/loop'

export default function Circuit() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const stop = startLoop(canvasRef.current);

    return () => {
      stop();
    };
  }, []);

  return (
    <div style={{ background: "#296113", height: "100vh" }}>
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        style={{ display: "block", margin: "0 auto" }}
      />
    </div>
  );
}
