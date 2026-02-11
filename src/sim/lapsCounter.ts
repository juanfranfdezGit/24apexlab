import { LapState } from "engine/types";

export function createLapCounter(): LapState {
  return {
    lap: 0,
    prevT: 0,
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
) {
  const finishT = finishIndex / pathLength;

  if (crossedFinish(lapState.prevT, currentT, finishT)) {
    lapState.lap += 1;
  }

  lapState.prevT = currentT;
}
