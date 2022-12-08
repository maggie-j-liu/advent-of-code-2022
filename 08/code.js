import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const trees = lines.map((line) => line.split("").map(Number));

const di = [-1, 0, 0, 1];
const dj = [0, -1, 1, 0];

const inBounds = (i, j) =>
  i >= 0 && i < trees.length && j >= 0 && j < trees[0].length;
let part1 = 0;
let part2 = 0;
for (let i = 0; i < trees.length; i++) {
  for (let j = 0; j < trees[0].length; j++) {
    let score = 1;
    let oneVisible = false;
    for (let d = 0; d < 4; d++) {
      let visible = true;
      let dist = 0;
      let _i = i + di[d];
      let _j = j + dj[d];
      while (inBounds(_i, _j)) {
        dist++;
        if (trees[_i][_j] >= trees[i][j]) {
          visible = false;
          break;
        }
        _i += di[d];
        _j += dj[d];
      }
      if (visible) {
        oneVisible = true;
      }
      score *= dist;
    }
    if (oneVisible) {
      part1++;
    }
    part2 = Math.max(part2, score);
  }
}
console.log("part 1:", part1);
console.log("part 2:", part2);
