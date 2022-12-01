import fs from "fs/promises";
const getInput = async (currentPath) => {
  const lines = await fs.readFile(new URL("./input.txt", currentPath), "utf8");
  return lines.trim();
};

export default getInput;
