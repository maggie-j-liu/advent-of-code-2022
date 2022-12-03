import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const A = "A".charCodeAt(0);

let part1 = 0;
for (const line of lines) {
  let done = false;
  for (let i = 0; i < line.length / 2; i++) {
    for (let j = line.length / 2; j < line.length; j++) {
      if (line[i] == line[j]) {
        const x = line[i].charCodeAt(0);
        if (x >= a && x <= z) {
          part1 += x - a + 1;
        } else {
          part1 += x - A + 27;
        }
        done = true;
        break;
      }
    }
    if (done) break;
  }
}

let part2 = 0;
for (let l = 0; l < lines.length; l += 3) {
  let done = false;
  for (let i = 0; i < lines[l].length; i++) {
    for (let j = 0; j < lines[l + 1].length; j++) {
      for (let k = 0; k < lines[l + 2].length; k++) {
        if (lines[l][i] == lines[l + 1][j] && lines[l][i] == lines[l + 2][k]) {
          const x = lines[l][i].charCodeAt(0);
          if (x >= a && x <= z) {
            part2 += x - a + 1;
          } else {
            part2 += x - A + 27;
          }
          done = true;
          break;
        }
      }
      if (done) break;
    }
    if (done) break;
  }
}

console.log("part 1:", part1);
console.log("part 2:", part2);
