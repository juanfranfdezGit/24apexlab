export function svgPathToPoints(
  path: SVGPathElement,
  samples = 500,
): { x: number; y: number }[] {
  const length = path.getTotalLength();
  const points = [];

  for (let i = 0; i <= samples; i++) {
    const p = path.getPointAtLength((i / samples) * length);
    points.push({ x: p.x, y: p.y });
  }

  return points;
}
