import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const sensors = [];
const beacons = [];
const dists = [];
const pt1Blocked = new Set();
const MAX = 4000000;
const blocked = [];
for (let i = 0; i <= 4000000; i++) {
  blocked.push([]);
}

const n = lines.length;
const PT1_ROW = 2000000;
let beaconsInPt1Row = [];

for (let line of lines) {
  line = line.split(" ");
  let sx = Number(line[2].slice(2, line[2].length - 1));
  let sy = Number(line[3].slice(2, line[3].length - 1));
  sensors.push([sx, sy]);
  let bx = Number(line[8].slice(2, line[8].length - 1));
  let by = Number(line[9].slice(2));
  beacons.push([bx, by]);
  if (by === PT1_ROW) beaconsInPt1Row.push(bx);
  dists.push(Math.abs(sx - bx) + Math.abs(sy - by));
}

for (let Y = 0; Y <= MAX; Y++) {
  for (let i = 0; i < n; i++) {
    let [x, y] = sensors[i];
    if (y - dists[i] > Y || y + dists[i] < Y) {
      continue;
    }
    let xdist = dists[i] - Math.abs(Y - y);
    let left = Math.max(0, x - xdist);
    let right = Math.min(MAX, x + xdist);
    blocked[Y].push([left, right]);
    if (Y === PT1_ROW) {
      for (let j = x - xdist; j <= x + xdist; j++) {
        pt1Blocked.add(j);
      }
    }
  }
}

for (const x of beaconsInPt1Row) {
  pt1Blocked.delete(x);
}

console.log("part 1:", pt1Blocked.size);

let found = false;
for (let Y = 0; Y <= MAX; Y++) {
  blocked[Y].sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });
  let right = blocked[Y][0][1];
  for (let i = 1; i < blocked[Y].length; i++) {
    if (blocked[Y][i][0] > right + 1) {
      console.log("part 2:", (right + 1) * MAX + Y);
      found = true;
      break;
    }
    right = Math.max(right, blocked[Y][i][1]);
  }
  if (found) break;
}
