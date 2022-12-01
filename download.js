import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let day = tomorrow.getDate();
let year = tomorrow.getFullYear();
let setup = process.argv.includes("--setup") || process.argv.includes("-s");
let args = process.argv.filter((arg) => !arg.startsWith("-"));
if (args.length >= 3) {
  day = parseInt(process.argv[2]);
}
if (args.length >= 4) {
  year = parseInt(process.argv[3]);
}
if (isNaN(day) || day < 1 || day > 25) {
  console.log(`Invalid day: ${day}`);
  process.exit(1);
}
if (isNaN(year)) {
  console.log(`Invalid year: ${year}`);
  process.exit(1);
}
const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
  headers: {
    cookie: `session=${process.env.SESSION_COOKIE}`,
  },
}).then((res) => res.text());
const dir = `${day}`.padStart(2, "0");
if (!fs.existsSync(`./${dir}`)) {
  fs.mkdirSync(`./${dir}`);
}
fs.writeFileSync(`./${dir}/input.txt`, res);
if (setup) {
  fs.copyFileSync(`./utils/template.js`, `./${dir}/code.js`);
}
console.log(res);
