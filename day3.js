let input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
input = input.split(`\n`);

function part1() {
  return countTreesInPathWithSlope(3, 1);
}

function part2() {
  const slopes = [
     {x: 1, y: 1},
     {x: 3, y: 1},
     {x: 5, y: 1},
     {x: 7, y: 1},
     {x: 1, y: 2}
  ];
  const multipliedTrees = slopes.reduce((accumulator, slope) => {
    return accumulator * countTreesInPathWithSlope(slope.x, slope.y);
  }, 1);
  return multipliedTrees;
}

function countTreesInPathWithSlope(x, y) {
  let horizontal = 0;
  let totalTrees = 0;
  const maxWidth = input[0].length;
  for (let i = 0; i < input.length; i += y) {
    if (input[i].charAt(horizontal) == '#') {
      totalTrees++;
    }
    horizontal = (horizontal + x) % maxWidth;
  }
  return totalTrees;
}
