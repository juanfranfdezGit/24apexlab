import { drawCar } from "./drawCar";
import { drawTrack } from "./drawTrack";
import { lerpPath, getHeading } from "../sim/path";
import type { WorldState } from "../engine/types";

export function renderWorld(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  world: WorldState,
  carImage: HTMLImageElement,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTrack(ctx, world.racingLine, world.finishIndex);

  const playerPos = lerpPath(world.racingLine, world.player.t);
  const playerAngle = getHeading(world.racingLine, world.player.t);

  const aiBase = lerpPath(world.racingLine, world.ai.t);
  const aiAngle = getHeading(world.racingLine, world.ai.t);

  const perpX = Math.cos(aiAngle + Math.PI / 2);
  const perpY = Math.sin(aiAngle + Math.PI / 2);

  const aiPos = {
    x: aiBase.x + perpX * world.ai.offset,
    y: aiBase.y + perpY * world.ai.offset,
  };

  // --- Dibuja la trazada actual de la IA ---
  if (!world.ai.currentTrace) world.ai.currentTrace = [];
  world.ai.currentTrace.push(aiPos);

  ctx.strokeStyle = "rgba(0,255,0,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  world.ai.currentTrace.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  // --- Dibuja la trazada óptima (best_bias) ---
  if (world.ai.bestBiasTrace) {
    ctx.strokeStyle = "rgb(99, 10, 91)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    world.ai.bestBiasTrace.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  drawCar(ctx, carImage, playerPos, playerAngle);
  drawCar(ctx, carImage, aiPos, aiAngle);
}
