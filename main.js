// imports
//import { COLORS } from './constants.js';
import { Board } from "./Board.js";
import { updateTime } from "./Interfaz.js";
import { LEVELS, movements } from "./constants.js";

let animationFrame;
let frames = 0;
const time = {
  elapsed: 0,
  level: LEVELS[0],
  start: performance.now(),
  initial: 0,
};
// selectores
const mainCanvas = document.querySelector("#main");
const nextCanvas = document.querySelector("#next");

// instancias
const board = new Board(
  mainCanvas.getContext("2d"),
  nextCanvas.getContext("2d")
);

const animate = () => {
  // Esto solo sucede en la primer llamada
  time.initial = time.initial > 0 ? time.initial : performance.now();

  let now = performance.now();
  time.elapsed = now - time.start;
  // console.log(time);
  if (time.elapsed > time.level) {
    time.start = performance.now(); // restart elapsed
    // time.level = LEVELS[LEVELS.indexOf(time.level) + 1]; // next level?
    if (board.move()) {
    } else {
      // game over
    }
  }
  // update info
  updateTime(performance.now() - time.initial);
  // draw
  board.draw();
  board.piece.draw(board.ctx);
  animationFrame = requestAnimationFrame(animate);
};

// listeners
document.querySelector("#start-btn").onclick = animate;

addEventListener("keydown", (event) => {
  const getNewPiece = movements[event.key];
  if (!getNewPiece) return;
  const p = getNewPiece(board.piece);
  if (board.isValid(p)) {
    board.piece.x = p.x;
    board.piece.y = p.y;
    board.piece.shape = p.shape;
  }
});
