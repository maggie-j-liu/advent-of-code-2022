export const letterToIdx = (letter) => {
  const cca = letter.charCodeAt(0);
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  const A = "A".charCodeAt(0);
  if (cca >= a && cca <= z) {
    return {
      val: cca - a,
      lower: true,
    };
  }
  return {
    val: cca - A + 26,
    upper: true,
  };
};
