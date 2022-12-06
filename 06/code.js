import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);

const chars = input.split("");

const solve = (len) => {
  for (let i = 0; i < chars.length - len; i++) {
    const detected = new Set();
    for (let j = 0; j < len; j++) {
      detected.add(input[i + j]);
    }
    if (detected.size === len) {
      return i + len;
    }
  }
};

console.log("part 1:", solve(4));
console.log("part 2:", solve(14));
