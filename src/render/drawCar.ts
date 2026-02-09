export function drawCar(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  pos: { x: number; y: number },
  angle: number,
) {
  const SCALE = .15;

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(angle);
  ctx.drawImage(
    img,
    (-img.width * SCALE) / 2,
    (-img.height * SCALE) / 2,
    img.width * SCALE,
    img.height * SCALE,
  );
  ctx.restore();
}
