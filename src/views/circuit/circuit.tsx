import { useEffect, useRef, useState } from "react";
import { useUI } from "context/UIContext";

export default function Game() {
  const { selectedCircuit } = useUI();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (!selectedCircuit?.svgPath) return;

    fetch(selectedCircuit.svgPath)
      .then((res) => res.text())
      .then(setSvgContent);
  }, [selectedCircuit]);

  return (
    <>
      <section className="circuitSection flex">
        <div className="back">
          <img src="/assets/circuits/circuitTerrain.jpg" alt="terrain" />
        </div>
        <div
          className="circuitSvg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          className="carCanvas"
        />
      </section>
    </>
  );
}
