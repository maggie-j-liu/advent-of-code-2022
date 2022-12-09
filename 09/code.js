import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const moves = {
  R: [1, 0],
  U: [0, 1],
  L: [-1, 0],
  D: [0, -1],
};

const solve = (numSegments) => {
  const visited = new Set();
  let segments = [];

  for (let i = 0; i < numSegments; i++) {
    segments.push([0, 0]);
  }

  visited.add(`${segments.at(-1)[0]},${segments.at(-1)[1]}`);

  for (const line of lines) {
    let [dir, steps] = line.split(" ");
    steps = Number(steps);
    for (let s = 0; s < steps; s++) {
      segments[0][0] += moves[dir][0];
      segments[0][1] += moves[dir][1];
      for (let s = 1; s < numSegments; s++) {
        let seg = segments[s];
        let prev = segments[s - 1];
        const xDiff = prev[0] - seg[0];
        const xMove = xDiff === 0 ? 0 : xDiff < 0 ? -1 : 1;
        const yDiff = prev[1] - seg[1];
        const yMove = yDiff === 0 ? 0 : yDiff < 0 ? -1 : 1;
        if (
          (prev[0] == seg[0] && Math.abs(prev[1] - seg[1]) === 2) ||
          (prev[1] == seg[1] && Math.abs(prev[0] - seg[0]) === 2) ||
          Math.abs(prev[0] - seg[0]) + Math.abs(prev[1] - seg[1]) > 2
        ) {
          seg[0] += xMove;
          seg[1] += yMove;
        }
      }
      visited.add(`${segments.at(-1)[0]},${segments.at(-1)[1]}`);
    }
  }
  return visited.size;
};

console.log("part 1:", solve(2));
console.log("part 2:", solve(10));
