import { LapState } from "engine/types";

export function createLapCounter(): LapState {
  return {
    lap: 0,
    prevT: 0,
    lastLapTime: 0,
    totalTime: 0,
  };
}

function crossedFinish(prevT: number, t: number, finishT: number) {
  if (prevT <= t) {
    return prevT < finishT && t >= finishT;
  }

  return prevT < finishT || t >= finishT;
}

export function updateLapCounter(
  lapState: LapState,
  currentT: number,
  finishIndex: number,
  pathLength: number,
  deltaTime: number,
) {
  const finishT = finishIndex / pathLength;

  lapState.lastLapTime += deltaTime;

  if (crossedFinish(lapState.prevT, currentT, finishT)) {
    lapState.totalTime += lapState.lastLapTime;
    lapState.lastLapTime = 0;

    lapState.lap += 1;
  }

  lapState.prevT = currentT;
}
