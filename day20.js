let input = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

let inputArr = input.split(`\n\n`);
let tilesMap = generateTiles(inputArr);
console.log(tilesMap);

function generateTiles(inputArr) {
  let result = new Map();
  inputArr.forEach((tileStr) => {
    let tileArr = tileStr.split(`\n`);
    let title = tileArr.shift();
    let titleArr = title.split(' ');
    let tileNum = parseInt(titleArr[1]);

    let tileGrid = [];
    for (let i = 0; i < tileArr.length; i++) {
      tileGrid[i] = tileArr[i].split('');
    }

    result.set(tileNum, tileGrid);
  });
  return result;
}

function rotate(matrix) {
  const n = matrix.length;
  const x = Math.floor(n / 2);
  const y = n - 1;
  for (let i = 0; i < x; i++) {
     for (let j = i; j < y - i; j++) {
        k = matrix[i][j];
        matrix[i][j] = matrix[y - j][i];
        matrix[y - j][i] = matrix[y - i][y - j];
        matrix[y - i][y - j] = matrix[j][y - i]
        matrix[j][y - i] = k
     }
  }
}

function shareBorder(arr1, arr2) {
  // arbitrarily just check the tops of both?
  for (let i = 0; i < arr1.length; i++) {
    // right side of r1
    // left side of r2
    if (arr1[arr1.length - 1][i] != arr2[0][i]) {
      return false;
    }
  }
  return true;
}

function print2dArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let str = '';
    for (let j = 0; j < arr[0].length; j++) {
      str += arr[i][j] + ", "
    }
    console.log(str);
  }
}

function flip(arr) {
  for (let i = 0; i < arr.length / 2; i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 -i] = temp;
  }
}

function getBorders(startKey, tilesMap) {
  let arr = tilesMap.get(startKey);
  let result = new Set();
  for (key of tilesMap.keys()) {
    if (key == startKey) {
      continue;
    }
    let val = tilesMap.get(key);
    loop1:
      for (let j = 0; j < 4; j++) {
    loop2:
        for (let k = 0; k < 4; k++) {
          let doesShare = shareBorder(arr, val);
          if (doesShare) {
            result.add(key);
            // break loop1;
          }
          // try flipping too
          flip(arr);
          doesShare = shareBorder(arr, val);
          if (doesShare) {
            result.add(key);
          }
          // return to normal
          flip(arr);
          rotate(arr);
        }
        rotate(val);
      }
  }
  return result;
}

function findCorners(bordersMap) {
  let cornerIds = [];
  bordersMap.forEach((val, key) => {
    if (val.size == 2) {
      cornerIds.push(key);
    }
  });
  return cornerIds;
}

function findAllBorders(tilesMap) {
  let bordersMap = new Map();
  for (let key of tilesMap.keys()) {
    // find all shared borders
    let borders = getBorders(key, tilesMap);
    bordersMap.set(key, borders);
  };
  return bordersMap;
}

function part1() {
  let bordersMap = findAllBorders(tilesMap);
  console.log(bordersMap)
  // find corners, they'll only match with two
  // other arrays.
  let corners = findCorners(bordersMap);
  console.log(corners);
  return corners.reduce((accum, el) => {
    return accum * el;
  }, 1);
}

function part2() {
}

part1();


