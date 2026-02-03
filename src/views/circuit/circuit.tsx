import { useEffect, useRef, useState } from "react";
import { useUI } from "context/UIContext";
import { svgPathToPoints } from "sim/svgToPoints";
import { startLoop } from "../../canvas/loop";

export default function Game() {
  const { selectedCircuit, selectedCar } = useUI();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (!selectedCircuit?.svgPath) return;

    fetch(selectedCircuit.svgPath)
      .then((res) => res.text())
      .then(setSvgContent);
  }, [selectedCircuit]);

  useEffect(() => {
    if (!svgContent || !canvasRef.current) return;

    const path = document.querySelector<SVGPathElement>("#path3164");
    if (!path) {
      console.error("No se encuentra #path3164 en el SVG");
      return;
    }

    const racingLine = svgPathToPoints(path, 500);

    console.log("Racing line points:", racingLine.length);

    startLoop(canvasRef.current, racingLine, selectedCar);
  }, [svgContent, selectedCar]);

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
          width={1400}
          height={1200}
          className="carCanvas"
        />
      </section>
    </>
  );
}
