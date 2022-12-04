import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

let part1 = 0;
let part2 = 0;
for (const line of lines) {
  let [first, sec] = line.split(",");
  let [x1, x2] = first.split("-").map(Number);
  let [y1, y2] = sec.split("-").map(Number);
  if ((x1 >= y1 && x2 <= y2) || (y1 >= x1 && y2 <= x2)) {
    part1++;
  }
  if (x1 < y1 && x2 < y1) {
    continue;
  }
  if (y1 < x1 && y2 < x1) {
    continue;
  }
  part2++;
}
console.log("part 1:", part1);
console.log("part 2:", part2);
