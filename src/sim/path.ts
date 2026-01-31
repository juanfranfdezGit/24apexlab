export type Point = { x: number; y: number };

export const racingLine: Point[] = [
  { x: 200, y: 100 },
  { x: 250, y: 100 },
  { x: 300, y: 100 },
  { x: 350, y: 100 },
  { x: 400, y: 100 },
  { x: 450, y: 100 },
  { x: 500, y: 100 },
  { x: 550, y: 100 },
  { x: 600, y: 100 },
  { x: 650, y: 100 },
  { x: 700, y: 100 },
  { x: 750, y: 100 },
  { x: 800, y: 100 },
  { x: 850, y: 100 },
  { x: 900, y: 100 },
  { x: 950, y: 100 },
  { x: 1000, y: 110 },
  { x: 1050, y: 120 },
  { x: 1100, y: 130 },
  { x: 1150, y: 140 },

];

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
