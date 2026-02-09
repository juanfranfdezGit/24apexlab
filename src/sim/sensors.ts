import type { WorldState } from "../engine/types";
import { lerpPath, getHeading } from "./path";

// Define what the AI sensors will return based on the world state
export interface AISensorState {
  lateralOffset: number;
  leftDist: number;
  rightDist: number;
  frontDist: number;
  speed: number;
}

export function computeAISensors(world: WorldState): AISensorState {
  const { ai, racingLine, trackWidth } = world;

  const aiPos = lerpPath(racingLine, ai.t);
  const heading = getHeading(racingLine, ai.t);

  const perpX = Math.cos(heading + Math.PI / 2);
  const perpY = Math.sin(heading + Math.PI / 2);

  const leftDist = trackWidth / 2 - ai.offset;
  const rightDist = trackWidth / 2 + ai.offset;

  const lookahead = 0.05;
  const nextPoint =
    racingLine[
      Math.floor((ai.t + lookahead) * (racingLine.length - 1)) %
        racingLine.length
    ];

  const dx = nextPoint.x - (aiPos.x + ai.offset * perpX);
  const dy = nextPoint.y - (aiPos.y + ai.offset * perpY);
  const frontDist = Math.sqrt(dx * dx + dy * dy);

  return {
    lateralOffset: ai.offset,
    leftDist,
    rightDist,
    frontDist,
    speed: ai.speed,
  };
}
