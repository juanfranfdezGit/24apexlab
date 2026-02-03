export type Point = { x: number; y: number };

export const racingLine: Point[] = [];

export function lerpPath(path: Point[], t: number): Point {
  const total = path.length - 1;
  let i = Math.floor(t * total);
  if (i >= total) i = total - 1;

  const localT = t * total - i;

  const p1 = path[i];
  const p2 = path[i + 1];

  return {
    x: p1.x + (p2.x - p1.x) * localT,
    y: p1.y + (p2.y - p1.y) * localT,
  };
}

export function getHeading(path: Point[], t: number): number {
  const p1 = lerpPath(path, t);
  const p2 = lerpPath(path, Math.min(t + 0.01, 1));

  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}
