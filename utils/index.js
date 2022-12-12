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

export const neighbors = (i, j, rows, cols) => {
  const di = [-1, 0, 1, 0];
  const dj = [0, 1, 0, -1];
  const inBounds = (_i, _j) => _i >= 0 && _i < rows && _j >= 0 && _j < cols;
  const nlist = [];
  for (let d = 0; d < 4; d++) {
    const ni = i + di[d];
    const nj = j + dj[d];
    if (inBounds(ni, nj)) {
      nlist.push([ni, nj]);
    }
  }
  return nlist;
};
