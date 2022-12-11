import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const monkeys = input.split("\n\n");
const lines = monkeys.map((monkey) => monkey.split("\n"));

let MULT = 1;
for (let m = 0; m < monkeys.length; m++) {
  const test = Number(lines[m][3].trim().split(" ")[3]);
  MULT *= test;
}

const solve = (rounds, pt1) => {
  const counts = Array.from({ length: monkeys.length }, () => 0);
  const items = [];
  for (let m = 0; m < monkeys.length; m++) {
    let startItems = lines[m][1].split(":")[1];
    startItems = startItems.split(", ").map(Number);
    items.push(startItems);
  }
  for (let round = 0; round < rounds; round++) {
    for (let m = 0; m < monkeys.length; m++) {
      counts[m] += items[m].length;
      const op = lines[m][2].split(":")[1].replace("new", "neww");
      const test = Number(lines[m][3].trim().split(" ")[3]);
      // console.log(test);
      const trueThrow = Number(lines[m][4].trim().split(" ")[5]);
      const falseThrow = Number(lines[m][5].trim().split(" ")[5]);
      for (const item of items[m]) {
        let out = eval(`
    const old = ${item};
    const ${op};
    neww;
        `);
        if (pt1) {
          out = Math.floor(out / 3);
        }
        if (out % test === 0) {
          if (!items[trueThrow]) {
            items[trueThrow] = [];
          }
          items[trueThrow].push(pt1 ? out : out % MULT);
        } else {
          if (!items[falseThrow]) {
            items[falseThrow] = [];
          }
          items[falseThrow].push(pt1 ? out : out % MULT);
        }
      }
      items[m] = [];
    }
  }
  const allCounts = counts.sort((a, b) => b - a);
  return allCounts[0] * allCounts[1];
};

console.log("part 1:", solve(20, true));
console.log("part 2:", solve(10000, false));
