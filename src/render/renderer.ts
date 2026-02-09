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

  const aiPos = lerpPath(world.racingLine, world.ai.t);
  const aiAngle = getHeading(world.racingLine, world.ai.t);

  drawCar(ctx, carImage, playerPos, playerAngle);
  drawCar(ctx, carImage, aiPos, aiAngle);
}
