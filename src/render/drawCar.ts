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

  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 6;

  ctx.drawImage(
    img,
    (-img.width * SCALE) / 2,
    (-img.height * SCALE) / 2,
    img.width * SCALE,
    img.height * SCALE,
  );
  ctx.restore();
}
