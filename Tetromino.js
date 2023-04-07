import { BLOCK_SIZE, COLORS, getRandomShape } from './constants.js';

export class Tetromino {
  constructor(x) {
    this.y = 0;
    this.x = x;
    this.shape = getRandomShape();
  }

  draw(ctx) {
    this.shape.forEach((row, y) => {
      row.forEach((num, x) => {
        if (num < 1) return;
        ctx.fillStyle = COLORS[num];
        ctx.fillRect(
          (this.x + x) * BLOCK_SIZE,
          (this.y + y) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        ctx.strokeRect(
          (this.x + x) * BLOCK_SIZE,
          (this.y + y) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      });
    });
  }
}
