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

let seaMonsterArr = [
    `                  # `,
    `#    ##    ##    ###`,
    ` #  #  #  #  #  #   `
].map((row) => row.split(''));

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

function shareBorder(arr1, arr2, vertical=true) {
  if (vertical) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[arr1.length - 1][i] != arr2[0][i]) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < arr1.length; i++) {
       if (arr1[i][arr1.length - 1] != arr2[i][0]) {
         return false;
       }
    }
    return true;
  }
}

function print2dArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let str = '[';
    for (let j = 0; j < arr[0].length; j++) {
      str += arr[i][j] + ". "
    }
    str+= ']'
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

function findOrientation(key1, key2, tilesMap, vertical) {
  let arr1 = tilesMap.get(key1);
  let arr2 = tilesMap.get(key2);
  for (let j = 0; j < 4; j++) {
    let success = orientSecondArray(arr1, arr2, vertical);
    if (success) {
      return;
    }
    rotate(arr1);
  }
}

function orientSecondArray(arr1, arr2, vertical) {
  for (let k = 0; k < 4; k++) {
    let doesShare = shareBorder(arr1, arr2, vertical);
    if (doesShare) {
      return true;
    }
    // try flipping too
    flip(arr2);
    doesShare = shareBorder(arr1, arr2, vertical);
    if (doesShare) {
      return true;
    }
    // return to normal
    flip(arr2);
    rotate(arr2);
  }
  return false;
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

function printImage(image) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image.length; j++) {
      if (image[i][j]) {
        console.log(`indicies: ${i}, ${j}`);
        print2dArr(image[i][j]);
      }
    }
  }
}

function populateImageAndTileNums(image, tileNums, tilesMap, corners, bordersMap, imageWidth) {
  // just pick a corner and flow, I guess?
  let chosenStart = corners[0];
  image[0][0] = tilesMap.get(chosenStart);
  tileNums[0][0] = chosenStart;

  // get neighbors
  let neighbors = bordersMap.get(chosenStart);
  let neighborsArr = Array.from(neighbors.values());
  // find vertical neighbor
  findOrientation(chosenStart, neighborsArr[1], tilesMap, true);
  image[1][0] = tilesMap.get(neighborsArr[1]);
  tileNums[1][0] = neighborsArr[1];

  // find horzontal neighbor
  orientSecondArray(tilesMap.get(chosenStart), tilesMap.get(neighborsArr[0]), false);
  image[0][1] = tilesMap.get(neighborsArr[0]);
  tileNums[0][1] = neighborsArr[0];

  let placedTiles = new Set();
  placedTiles.add(chosenStart);
  placedTiles.add(neighborsArr[0]);
  placedTiles.add(neighborsArr[1]);

  for (let y = 0; y < imageWidth - 1; y++) {
    for (let x = 0; x < imageWidth - 1; x++) {
      if (x == 0 && y == 0) {
        continue;
      }

      let chosenStart = tileNums[y][x];
      let neighbors = bordersMap.get(chosenStart);
      let neighborsArr = Array.from(neighbors.values());
      neighborsArr = neighborsArr.filter((el) => !placedTiles.has(el));
      if (neighborsArr.length > 2) {
        console.log("WTF");
        console.log(neighborsArr);
        return;
      }

      // if length is 1, you're going over a row, that you populated via
      // the row above it.
      if (neighborsArr.length == 1) {
        orientSecondArray(tilesMap.get(chosenStart), tilesMap.get(neighborsArr[0]), true);
        image[y + 1][x] = tilesMap.get(neighborsArr[0]);
        tileNums[y + 1][x] = neighborsArr[0];
        placedTiles.add(neighborsArr[0]);
        continue;
      }

      // find vertical, because there are two constraints
      let otherConstrainingTile = tileNums[y + 1][x - 1];
      let otherConstrainingNeighbors = bordersMap.get(otherConstrainingTile);

      let sharedNeighbor = neighborsArr.find(neigh => otherConstrainingNeighbors.has(neigh));

      orientSecondArray(tilesMap.get(chosenStart), tilesMap.get(sharedNeighbor), true);
      image[y + 1][x] = tilesMap.get(sharedNeighbor);
      tileNums[y + 1][x] = sharedNeighbor;
      placedTiles.add(sharedNeighbor);

      neighborsArr = neighborsArr.filter(el => el != sharedNeighbor);

      // last remaining neighbor has to be horizontal
      orientSecondArray(tilesMap.get(chosenStart), tilesMap.get(neighborsArr[0]), false);
      image[y][x + 1] = tilesMap.get(neighborsArr[0]);
      tileNums[y][x + 1] = neighborsArr[0];
      placedTiles.add(neighborsArr[0])
    }
  }

  // finally add bottom right, it should be the last possible tile.
  lastTile = Array.from(tilesMap.keys()).filter(el => !placedTiles.has(el));
  if (lastTile.length > 1) {
    console.log("panic: ")
    console.log(lastTile);
  }
  lastTile = lastTile[0];
  let leftToLast = tileNums[tileNums.length - 1][tileNums.length - 2];
  orientSecondArray(tilesMap.get(leftToLast), tilesMap.get(lastTile), false);
  image[tileNums.length - 1][tileNums.length - 1] = tilesMap.get(lastTile);
  tileNums[tileNums.length - 1][tileNums.length - 1] = lastTile;
}

function collapseBorders(image) {
  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image.length; x++) {
      let tileToMangle = image[y][x];
      // remove top border
      tileToMangle.shift();

      // remove bottom border
      tileToMangle.pop();

      tileToMangle.forEach(row => {
        // remove left border
        row.shift();
        // remove right border
        row.pop();
      });
    }
  }
}

function mergeToNewArray(image) {
  let newTileDimension = image[0][0].length;
  let collapsedImage = [];
  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image.length; x++) {

      let tileToReDraw = image[y][x];
      for (let ty = 0; ty < newTileDimension; ty++) {
        for (let tx = 0; tx < newTileDimension; tx++) {
          if (!collapsedImage[y * newTileDimension + ty]) {
            collapsedImage[y * newTileDimension + ty] = [];
          }
          collapsedImage[y * newTileDimension + ty][x * newTileDimension + tx] = tileToReDraw[ty][tx];
        }
      }
    }
  }
  return collapsedImage;
}

function getSeaMonsters(seaMonsterArr, collapsedImage) {
  let monsters = [];
  for (let r = 0; r < 4; r++) {
    monsters = findSeaMonsters(collapsedImage, seaMonsterArr);
    if (monsters.length) {
      break;
    }

    flip(collapsedImage);
    monsters = findSeaMonsters(collapsedImage, seaMonsterArr);
    if (monsters.length) {
      break;
    }

    // flip back
    flip(collapsedImage);
    rotate(collapsedImage);
  }
  return monsters;
}

function findSeaMonsters(collapsedImage, seaMonsterArr) {
  let monsters = [];
  let yEnd = collapsedImage.length - seaMonsterArr.length;
  let xEnd = collapsedImage[0].length - seaMonsterArr[0].length;
loop1:
  for (let y = 0; y < yEnd; y++) {
loop2:
    for (let x = 0; x < xEnd; x++) {
      // OK so starting at this X,Y in the image, see if it's a monster.
      // if it is, save all indices of monster.
      let potentialMonster = new Set();
      let validSeaMonster = true;
loop3:
      for (let sY = 0; sY < seaMonsterArr.length; sY++) {
loop4:
        for (let sX = 0; sX < seaMonsterArr[0].length; sX++) {
          // Only keep track of indices the #'s from the sea monster array
          if (seaMonsterArr[sY][sX] == '#') {
            potentialMonster.add(`${x + sX},${y + sY}`);
          }
          if (seaMonsterArr[sY][sX] == '#' && (collapsedImage[y + sY][x + sX] != seaMonsterArr[sY][sX])) {
            // Not a valid sea monster.
            validSeaMonster = false;
            break loop3;
          }
        }
      }

      if (validSeaMonster) {
        monsters.push(potentialMonster);
      }
    }
  }

  return monsters;
}

function isPartOfMonster(x, y, monsterIndices) {
  return monsterIndices.has(`${x},${y}`);
}

function part2() {
  let bordersMap = findAllBorders(tilesMap);
  let corners = findCorners(bordersMap);

  let imageWidth = Math.sqrt(tilesMap.size);
  let arr = new Array();
  let image = arr.slice();
  for (let i = 0; i < imageWidth; i++) {
    image.push(arr.slice());
  }
  let tileNums = arr.slice();
  for (let i = 0; i < imageWidth; i++) {
    tileNums.push(arr.slice());
  }

  populateImageAndTileNums(image, tileNums, tilesMap, corners, bordersMap, imageWidth);
  // OK COOL, we assembled the image, holy fuck
  // Remove borders, jeezus
  collapseBorders(image);
  // OK Collapse the image to a new clean happy 2d array
  let collapsedImage = mergeToNewArray(image);

  // OK biatch, let's find that stupid ass sea monster.
  let monsters = getSeaMonsters(seaMonsterArr, collapsedImage);

  let totalMonsters = monsters.length;

  // Let's merge the monster sets, because we don't care about them individually
  let monsterIndices = new Set();
  monsters.forEach(monster => {
    for (index of monster.values()) {
      monsterIndices.add(index);
    }
  });

  // OK COOL, how many #'s are not part of the monsters
  let totalHashes = 0;
  for (let y = 0; y < collapsedImage.length; y++) {
    for (let x = 0; x < collapsedImage[0].length; x++) {
      // if this is the start of a monster, skip
      if (isPartOfMonster(x, y, monsterIndices)) {
        continue;
      } else if (collapsedImage[y][x] == '#') {
        totalHashes++;
      }
    }
  }
  return totalHashes;
}

part2();
