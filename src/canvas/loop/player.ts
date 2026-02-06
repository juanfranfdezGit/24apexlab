import { lerpPath, getHeading } from "../../sim/path";

export interface Player {
  t: number;
  speed: number;
  maxSpeed: number;
  accel: number;
  brake: number;
  friction: number;
}

export function createPlayer(): Player {
  return {
    t: 0,
    speed: 0,
    maxSpeed: 0.002,
    accel: 0.0001,
    brake: 0.00005,
    friction: 0.995,
  };
}

export function updatePlayer(
  player: Player,
  accelerating: boolean,
  braking: boolean,
) {
  if (accelerating) player.speed += player.accel;
  else if (braking) player.speed -= player.brake;
  else player.speed *= player.friction;

  player.speed = Math.max(0, Math.min(player.speed, player.maxSpeed));
  player.t += player.speed;
  if (player.t > 1) player.t -= 1;
}

export function getPlayerPosition(
  player: Player,
  path: { x: number; y: number }[],
) {
  return lerpPath(path, player.t);
}

export function getPlayerAngle(
  player: Player,
  path: { x: number; y: number }[],
) {
  return getHeading(path, player.t);
}
