import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const map = {};

let lowest = 0;

for (const line of lines) {
  const points = line.split(" -> ").map((pair) => pair.split(",").map(Number));
  for (let i = 1; i < points.length; i++) {
    const start = points[i - 1];
    const end = points[i];
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];

    lowest = Math.max(lowest, start[1], end[1]);

    if (dx !== 0) {
      for (let k = 0; k <= Math.abs(dx); k++) {
        let j = start[0] + Math.sign(dx) * k;
        if (!map[j]) {
          map[j] = {};
        }
        map[j][start[1]] = true;
      }
    } else {
      for (let k = 0; k <= Math.abs(dy); k++) {
        let j = start[1] + Math.sign(dy) * k;
        if (!map[start[0]]) {
          map[start[0]] = {};
        }
        map[start[0]][j] = true;
      }
    }
  }
}

let units = 0;
let pt1 = false;
while (true) {
  let sand = [500, 0];
  if (map[500][0]) {
    console.log("part 2:", units);
    break;
  }
  while (true) {
    if (sand[1] === lowest + 1) {
      if (!pt1) {
        console.log("part 1:", units);
        pt1 = true;
      }
      if (!map[sand[0]]) {
        map[sand[0]] = {};
      }
      map[sand[0]][sand[1]] = true;
      break;
    }
    let down = false;
    for (const x of [0, -1, 1]) {
      if (!map[sand[0] + x]?.[sand[1] + 1]) {
        sand[0] += x;
        sand[1] += 1;
        down = true;
        break;
      }
    }
    if (!down) {
      map[sand[0]][sand[1]] = true;
      break;
    }
  }
  units++;
}
