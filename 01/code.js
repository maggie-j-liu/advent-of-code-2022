import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const groups = input.split("\n\n");

let best = [0, 0, 0];
for (const group of groups) {
  const lines = group.split("\n");
  let sum = 0;
  for (const line of lines) {
    sum += parseInt(line);
  }
  if (sum > best[0]) {
    best[2] = best[1];
    best[1] = best[0];
    best[0] = sum;
  } else if (sum > best[1]) {
    best[2] = best[1];
    best[1] = sum;
  } else if (sum > best[2]) {
    best[2] = sum;
  }
}
console.log("part 1:", best[0]);
console.log("part 2:", best[0] + best[1] + best[2]);
