import getInput from "../utils/getInput.js";
import { letterToIdx } from "../utils/index.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const MAX_J = lines[0].length;
const MAX_I = lines.length;
const map = [];
const gsteps = [];
let end;

const inBounds = (i, j) => i >= 0 && i < MAX_I && j >= 0 && j < MAX_J;
const di = [-1, 0, 0, 1];
const dj = [0, 1, -1, 0];

const pt1 = [];
const pt2 = [];

for (let i = 0; i < lines.length; i++) {
  map.push([]);
  gsteps.push([]);
  for (let j = 0; j < lines[i].length; j++) {
    gsteps[i].push(1000000000);
    let letter = lines[i][j];
    if (letter === "S") {
      pt1.push({ i, j, steps: 0 });
      letter = "a";
    } else if (letter === "E") {
      end = { i, j };
      letter = "z";
    }
    if (letter === "a") {
      pt2.push({ i, j, steps: 0 });
    }
    map[i].push(letterToIdx(letter).val);
  }
}

const bfs = (q) => {
  while (q.length !== 0) {
    const { i, j, steps } = q.shift();
    if (i === end.i && j === end.j) {
      return steps;
    }
    for (let d = 0; d < 4; d++) {
      let ni = i + di[d];
      let nj = j + dj[d];
      if (
        inBounds(ni, nj) &&
        map[ni][nj] <= map[i][j] + 1 &&
        gsteps[ni][nj] > steps + 1
      ) {
        gsteps[ni][nj] = steps + 1;
        q.push({ i: ni, j: nj, steps: steps + 1 });
      }
    }
  }
};

console.log("part 1:", bfs(pt1));
console.log("part 2:", bfs(pt2));
