import { createPlayer, updatePlayer } from "./player";
import { createAI, updateAI, AIAction } from "./ai";
import type { WorldState, Point, InputState } from "../engine/types";

const selectedCircuit = JSON.parse(localStorage.getItem("selectedCircuit")!);

// World state containing player, AI, racing line, and track width
// Control all simulation
export function createWorld(racingLine: Point[]): WorldState {
  return {
    player: createPlayer(),
    ai: createAI(selectedCircuit.finishIndex, racingLine.length),
    finishIndex: selectedCircuit.finishIndex,
    racingLine,
    trackWidth: 120,
  };
}

export function updateWorld(
  world: WorldState,
  input: InputState,
  aiAction: AIAction,
) {
  updatePlayer(world.player, input.accelerating, input.braking);

  updateAI(
    world.ai,
    world.racingLine,
    aiAction,
    world.trackWidth,
    world.finishIndex,
  );
}
