import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const pairs = input.split("\n\n");
const packets = pairs.flatMap((pair) =>
  pair.split("\n").map((val) => eval(val))
);
packets.push([[2]], [[6]]);

const comp = (first, second) => {
  if (typeof first === "number" && typeof second === "number") {
    return first < second ? "YES" : first === second ? "MAYBE" : "NO";
  }
  if (typeof first === "number" || typeof second === "number") {
    if (typeof first === "number") {
      first = [first];
    } else {
      second = [second];
    }
  }
  const fl = first.length,
    sl = second.length;

  for (let j = 0; j < Math.min(fl, sl); j++) {
    const res = comp(first[j], second[j]);
    if (res !== "MAYBE") {
      return res;
    }
  }
  return sl === fl ? "MAYBE" : sl < fl ? "NO" : "YES";
};

let part1 = 0;
for (let i = 1; i <= pairs.length; i++) {
  const pair = pairs[i - 1];
  let [first, second] = pair.split("\n");
  [first, second] = eval(`[${first}, ${second}]`);
  if (comp(first, second) === "YES") {
    part1 += i;
  }
}

packets.sort((a, b) => {
  const res = comp(a, b);
  return res === "YES" ? -1 : res === "MAYBE" ? 0 : 1;
});

let part2 = 1;
for (let i = 1; i <= packets.length; i++) {
  const packet = packets[i - 1];
  if (
    packet.length === 1 &&
    packet[0].length === 1 &&
    [2, 6].includes(packet[0][0])
  ) {
    part2 *= i;
  }
}

console.log("part 1", part1);
console.log("part 2:", part2);
