import fs from "fs";
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let day = tomorrow.getDate();
let args = process.argv.filter((arg) => !arg.startsWith("-"));
if (args.length >= 3) {
  day = parseInt(process.argv[2]);
}
if (isNaN(day) || day < 1 || day > 25) {
  console.log(`Invalid day: ${day}`);
  process.exit(1);
}
const dir = `${day}`.padStart(2, "0");
if (!fs.existsSync(`./${dir}`)) {
  fs.mkdirSync(`./${dir}`);
}
fs.copyFileSync(`./utils/template.js`, `./${dir}/code.js`);
