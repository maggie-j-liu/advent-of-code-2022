import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const CYCLES = [20, 60, 100, 140, 180, 220];
let cycleNum = 1;
let x = 1;
let strengths = 0;

const ROWS = 40;
const COLS = 6;
let screen = [];
for (let i = 0; i < COLS; i++) {
  screen.push([]);
  for (let j = 0; j < ROWS; j++) {
    screen[i].push(".");
  }
}

const cycle = () => {
  // part 1
  if (CYCLES.includes(cycleNum)) {
    strengths += cycleNum * x;
  }
  cycleNum++;

  // part 2
  let spriteAt = [x - 1, x, x + 1];
  if (spriteAt.includes(crtPix)) {
    screen[crtRow][crtPix] = "#";
  }
  crtPix++;
  if (crtPix === ROWS) {
    crtPix = 0;
    crtRow++;
  }
};

let crtPix = 0;
let crtRow = 0;
for (const line of lines) {
  if (line.includes(" ")) {
    const num = Number(line.split(" ")[1]);
    for (let i = 0; i < 2; i++) {
      cycle();
    }
    x += num;
  } else {
    cycle();
  }
}

console.log("part 1:", strengths);
console.log("part 2:");
console.log(screen.map((row) => row.join("")).join("\n"));
