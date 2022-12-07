import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const CAN_USE = 40000000;
let curr = [];
const tree = {};

const getTreeRef = (idx) => {
  if (idx === -1) {
    return tree;
  }
  return getTreeRef(idx - 1)[curr[idx]];
};

for (const line of lines) {
  if (line.startsWith("$")) {
    const parts = line.split(" ");
    if (parts[1] == "cd") {
      if (parts[2] === "/") {
        curr = [];
      } else if (parts[2] === "..") {
        curr.pop();
      } else {
        let x = getTreeRef(curr.length - 1);
        x[parts[2]] = {};
        curr.push(parts[2]);
      }
    }
  } else {
    const [sz, name] = line.split(" ");
    let x = getTreeRef(curr.length - 1);
    if (sz === "dir") {
      if (!x[name]) {
        x[name] = {};
      }
    } else {
      x[name] = Number(sz);
    }
  }
}
const sizes = [];
let part1 = 0;
const calcSizes = (t) => {
  t._size = 0;
  for (const val of Object.values(t)) {
    if (typeof val == "number") {
      t._size += val;
    } else {
      calcSizes(val);
      t._size += val._size;
    }
  }
  if (t._size <= 100000) {
    part1 += t._size;
  }
  sizes.push(t._size);
};
calcSizes(tree);
const freeUp = tree._size - CAN_USE;
let part2 = tree._size;
for (const size of sizes) {
  if (size >= freeUp && size < part2) {
    part2 = size;
  }
}
console.log("part 1:", part1);
console.log("part 2:", part2);
