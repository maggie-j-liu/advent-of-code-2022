import getInput from "../utils/getInput.js";
import { letterToIdx, neighbors } from "../utils/index.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const ROWS = lines.length;
const COLS = lines[0].length;
const map = [];
const gsteps = [];
let end;

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
    for (const [ni, nj] of neighbors(i, j, ROWS, COLS)) {
      if (map[ni][nj] <= map[i][j] + 1 && gsteps[ni][nj] > steps + 1) {
        gsteps[ni][nj] = steps + 1;
        q.push({ i: ni, j: nj, steps: steps + 1 });
      }
    }
  }
};

console.log("part 1:", bfs(pt1));
console.log("part 2:", bfs(pt2));
