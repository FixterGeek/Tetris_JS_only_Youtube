// imports
//import { COLORS } from './constants.js';
import { Board } from './Board.js';
import { LEVELS, movements } from './constants.js';

let animationFrame;
let frames = 0;
const time = {
  elapsed: 0,
  level: LEVELS[0],
  start: performance.now(),
};
// selectores
const mainCanvas = document.querySelector('#main');
const nextCanvas = document.querySelector('#next');

// instancias
const board = new Board(
  mainCanvas.getContext('2d'),
  nextCanvas.getContext('2d')
);

const animate = (now = 0) => {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    if (board.move()) {
    } else {
      // gameover
    }
  }
  // draw
  board.draw();
  board.piece.draw(board.ctx);
  animationFrame = requestAnimationFrame(animate);
};

// listeners
document.querySelector('#start-btn').onclick = animate;

addEventListener('keydown', (event) => {
  const getNewPiece = movements[event.key];
  if (!getNewPiece) return;
  const p = getNewPiece(board.piece);
  if (board.isValid(p)) {
    board.piece.x = p.x;
    board.piece.y = p.y;
    board.piece.shape = p.shape;
  }
});
