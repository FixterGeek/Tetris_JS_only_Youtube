export const BLOCK_SIZE = 30;
export const COLS = 10;
export const ROWS = 20;
export const COLORS = [
  '#323232',
  'red',
  'orange',
  'blue',
  'yellow',
  'green',
  'cyan',
  'pink',
  'white',
];
const SHAPES = [
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 2, 0],
    [0, 2, 2],
    [0, 0, 0],
  ],
  [
    [3, 0, 0],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 6],
    [6, 6, 6],
    [0, 0, 0],
  ],
];
export const LEVELS = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
};
export const getRandomShape = () =>
  SHAPES[Math.floor(Math.random() * SHAPES.length)];

export const movements = {
  ArrowDown: (p) => ({ ...p, y: p.y + 1 }),
  ArrowLeft: (p) => ({ ...p, x: p.x - 1 }),
  ArrowRight: (p) => ({ ...p, x: p.x + 1 }),
  ArrowUp: (p) => {
    const piece = JSON.parse(JSON.stringify(p));
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [piece.shape[x][y], piece.shape[y][x]] = [
          piece.shape[y][x],
          piece.shape[x][y],
        ];
      }
    }
    piece.shape.forEach((row) => row.reverse());
    //piece.shape.reverse(); // counterClockwise
    return piece;
  },
};
