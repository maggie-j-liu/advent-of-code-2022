import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
let [rawCrates, lines] = input.split("\n\n");
lines = lines.split("\n");

const crates = {};
const rows = rawCrates.split("\n");
rows.pop();
for (const row of rows) {
  let col = 1;
  for (let char = 0; char < row.length; char += 4) {
    if (!crates[col]) {
      crates[col] = [];
    }
    let letter = row[char + 1];
    if (letter.trim().length > 0) {
      crates[col].push(letter);
    }
    col++;
  }
}

const cratesCopy = JSON.parse(JSON.stringify(crates));

for (const ins of lines) {
  const [_move, cnt, _from, start, _to, end] = ins.split(" ");
  for (let i = 0; i < cnt; i++) {
    crates[end].unshift(crates[start][0]);
    crates[start].shift();
  }
}
let part1 = "";
for (const value of Object.values(crates)) {
  part1 += value[0];
}
console.log("part 1:", part1);

for (const ins of lines) {
  const [_move, cnt, _from, start, _to, end] = ins.split(" ");
  const int = [];
  for (let i = 0; i < cnt; i++) {
    int.unshift(cratesCopy[start][0]);
    cratesCopy[start].shift();
  }
  for (let i = 0; i < cnt; i++) {
    cratesCopy[end].unshift(int[0]);
    int.shift();
  }
}
let part2 = "";
for (const value of Object.values(cratesCopy)) {
  part2 += value[0];
}
console.log("part 2:", part2);
