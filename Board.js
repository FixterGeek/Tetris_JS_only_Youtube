import { Tetromino } from './Tetromino.js';
import {
  BLOCK_SIZE,
  COLORS,
  COLS,
  ROWS,
  getRandomShape,
  movements,
} from './constants.js';

export class Board {
  constructor(ctx, nextCtx) {
    this.ctx = ctx;
    this.nextCtx = nextCtx;
    this.init();
  }

  init() {
    // this.grid = Array(ROWS).fill(Array(COLS).fill(0));
    this.grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => 0)
    );
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.next = getRandomShape();
    this.piece = new Tetromino(3);
    this.draw();
  }

  move() {
    const p = movements['ArrowDown'](this.piece);
    if (this.isValid(p)) {
      this.piece.y = p.y;
      return true;
    }
    // freeze
    this.freeze(this.piece);
    // remove line
    this.removeLines();
    this.piece.y = 0;
    this.piece.x = 3;
    this.piece.shape = this.next;
    this.next = getRandomShape();
    this.drawNext();
    return false;
  }

  removeLines() {
    let lines = 0;
    this.grid.forEach((row, y) => {
      if (row.every((num, x) => num > 0)) {
        lines++;
        this.grid.splice(y, 1);
        this.grid.unshift(Array(COLS).fill(0));
      }
    });
  }

  freeze(piece) {
    piece.shape.forEach((row, y) => {
      row.forEach((num, x) => {
        if (num > 0) {
          this.grid[piece.y + y][this.piece.x + x] = num;
        }
      });
    });
  }

  isValid(piece) {
    return piece.shape.every((row, dy) => {
      return row.every((num, dx) => {
        const x = piece.x + dx;
        const y = piece.y + dy;
        return num === 0 || (this.isInside(x, y) && this.isAvailable(x, y));
      });
    });
  }

  isAvailable(x, y) {
    return this.grid[y] && this.grid[y][x] < 1;
  }

  isInside(x, y) {
    return x >= 0 && x < COLS && y < ROWS;
  }

  draw() {
    this.drawBoard();
    this.drawNext();
  }

  drawNext() {
    //this.nextCtx.scale(BLOCK_SIZE, BLOCK_SIZE);
    this.nextCtx.clearRect(0, 0, BLOCK_SIZE * 4, BLOCK_SIZE * 4);
    this.next.forEach((row, y) => {
      row.forEach((num, x) => {
        if (num > 0) {
          this.nextCtx.fillStyle = COLORS[num];
          this.nextCtx.fillRect(
            x * BLOCK_SIZE,
            y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      });
    });
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((num, x) => {
        this.ctx.fillStyle = COLORS[num];
        this.ctx.fillRect(
          x * BLOCK_SIZE,
          y * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        this.ctx.strokeStyle = '#222';
        this.ctx.strokeRect(
          x * BLOCK_SIZE,
          y * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      });
    });
  }
}
