export const updateTime = (milisecs) => {
  document.querySelector("#time").textContent = `Time elapsed: ${Math.floor(
    milisecs / 1000
  )} s`;
};

export const updatePoints = (points) => {
  const node = document.querySelector("#points");
  // dataset.points no existe la primera vez
  const currentPoints = isNaN(Number(node.dataset.points))
    ? 0
    : Number(node.dataset.points);
  node.dataset.points = currentPoints + points;
  node.textContent = `Points: ${currentPoints + points}`;
};
