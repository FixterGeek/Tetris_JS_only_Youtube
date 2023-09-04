// imports
//import { COLORS } from './constants.js';
import { Board } from "./Board.js";
import {
  updateButton,
  updatePoints,
  // updateButton,
  // updatePoints,
  updateTime,
} from "./interfaz.js";
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

export const gameOver = () => {
  // cancelAnimationFrame(animationFrame) // Podrías asgurarte...
  const ctx = mainCanvas.getContext("2d");
  ctx.font = "48px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", 20, 100);
  //   actualizamos el botón
  updateButton("Reiniciar");
};

const animate = () => {
  // Esto solo sucede en la primer llamada
  time.initial = time.initial > 0 ? time.initial : performance.now();

  time.elapsed = performance.now() - time.start;
  if (time.elapsed > time.level) {
    time.start = performance.now(); // restart elapsed
    board.move();
  }
  // Verificamos si el juego acabó
  if (board.gameOver) {
    return gameOver();
  }
  // update info
  updateTime(performance.now() - time.initial);
  // draw
  board.draw();
  board.piece.draw(board.ctx);
  animationFrame = requestAnimationFrame(animate);
};

const pauseGame = () => {
  cancelAnimationFrame(animationFrame);
  animationFrame = undefined;
  // drawing
  const ctx = mainCanvas.getContext("2d");
  ctx.font = "48px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText("Paused", 60, 100);
  updateButton("Resume"); // interfaz
};

// main button
const onClick = () => {
  if (animationFrame) {
    pauseGame();
  } else {
    updateButton("Pause");
    animate();
  }
  if (board.gameOver) {
    updateButton("pause");
    board.init();
    // No olvides reiniciar el tiempo y los puntos
    time.elapsed = 0;
    time.level = LEVELS[0];
    time.start = performance.now();
    time.initial = 0;
    updatePoints(0, true); // reemplaza
    animate();
  }
};

// listeners
document.querySelector("#start-btn").onclick = onClick;

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
