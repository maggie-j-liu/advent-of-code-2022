import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const moveToIdx = {
  A: 0,
  B: 1,
  C: 2,
  X: 0,
  Y: 1,
  Z: 2,
};

const scores = {
  X: 1,
  Y: 2,
  Z: 3,
};

let part1 = 0,
  part2 = 0;

for (const line of lines) {
  const [opp, you] = line.split(" ");
  part1 += scores[you];
  if (moveToIdx[opp] === moveToIdx[you]) {
    part1 += 3;
  } else if ((moveToIdx[opp] + 1) % 3 === moveToIdx[you]) {
    part1 += 6;
  }

  if (you === "X") {
    part2 += ((moveToIdx[opp] + 2) % 3) + 1;
  } else if (you === "Y") {
    part2 += moveToIdx[opp] + 1;
    part2 += 3;
  } else {
    part2 += ((moveToIdx[opp] + 1) % 3) + 1;
    part2 += 6;
  }
}
console.log("part 1:", part1);
console.log("part 2:", part2);
