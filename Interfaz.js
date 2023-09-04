export const updateTime = (milisecs) => {
  document.querySelector("#time").textContent = `
  Time: ${Math.floor(milisecs / 1000)} s
  `;
};

export const updatePoints = (points, replace = false) => {
  const node = document.querySelector("#points");
  // dataset.points no existe la primera vez
  const currentPoints = isNaN(Number(node.dataset.points))
    ? 0
    : Number(node.dataset.points);
  node.dataset.points = (replace ? 0 : currentPoints) + points;
  node.textContent = `Points: ${(replace ? 0 : currentPoints) + points}`;
};

export const updateButton = (text) => {
  const btn = document.querySelector("#start-btn");
  btn.textContent = text;
};
