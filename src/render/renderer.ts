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

  drawTrack(ctx, world.racingLine);

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

  drawCar(ctx, carImage, playerPos, playerAngle);
  drawCar(ctx, carImage, aiPos, aiAngle);
}
