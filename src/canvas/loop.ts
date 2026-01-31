import { drawRacingLine } from "./drawLine";
import { drawCar } from "./drawCar";
import { racingLine, lerpPath, getHeading } from "../sim/path";

export function startLoop(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let t = 0;
  let rafId: number;

  const carImg = new Image();
  carImg.src = "/assets/f1.png";

  function update() {
    t += 0.001;
    if (t > 1) t = 0;
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRacingLine(ctx, racingLine);

    const pos = lerpPath(racingLine, t);
    const angle = getHeading(racingLine, t);

    if (carImg.complete) {
      drawCar(ctx, carImg, pos, angle);
    }

    update();
    rafId = requestAnimationFrame(frame);
  }

  frame();

  return () => cancelAnimationFrame(rafId);
}
