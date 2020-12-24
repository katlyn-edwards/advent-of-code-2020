let input = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

let inputArr = input.split(`\n`);

EAST='e';
SOUTH_EAST='se';
SOUTH_WEST='sw';
WEST='w';
NORTH_WEST='nw';
NORTH_EAST='ne';

// X, Y
EAST_COORD = [2, 0];
SOUTH_EAST_COORD = [1, -1];
SOUTH_WEST_COORD = [-1, -1];
WEST_COORD = [-2, 0];
NORTH_WEST_COORD = [-1, 1];
NORTH_EAST_COORD = [1, 1];

ALL_DIRECTIONS  = [
  EAST_COORD,
  SOUTH_EAST_COORD,
  SOUTH_WEST_COORD,
  WEST_COORD,
  NORTH_WEST_COORD,
  NORTH_EAST_COORD,
]

// N -> E -> S -> W
function part1() {
  let seenSet = new Set();
  // seenSet.add('0,0');
  inputArr.forEach(tilePatternString => {
    let tilePattern = getPattern(tilePatternString);
    // console.log(tilePattern);
    let coords = flipTile(tilePattern);
    // console.log(coords);
    if (seenSet.has(coords)) {
      // Flipping from black to white;
      seenSet.delete(coords);
    } else {
      seenSet.add(coords);
    }
  });
  console.log(`Total flipped: ${seenSet.size}`);
  return seenSet;
}

function flipTile(pattern) {
  let x = 0;
  let y = 0;
  pattern.forEach(dir => {
    switch(dir) {
      case SOUTH_EAST:
        x += SOUTH_EAST_COORD[0];
        y += SOUTH_EAST_COORD[1];
        break;
      case SOUTH_WEST:
        x += SOUTH_WEST_COORD[0];
        y += SOUTH_WEST_COORD[1];
        break;
      case NORTH_WEST:
        x += NORTH_WEST_COORD[0];
        y += NORTH_WEST_COORD[1];
        break;
      case NORTH_EAST:
        x += NORTH_EAST_COORD[0];
        y += NORTH_EAST_COORD[1];
        break;
      case EAST:
        x += EAST_COORD[0];
        y += EAST_COORD[1];
        break;
      case WEST:
        x += WEST_COORD[0];
        y += WEST_COORD[1];
        break;
      default:
        console.log(`Something is wrong: ${dir}`);
        return;
    }
  });
  return `${x},${y}`;
}

function getPattern(str) {
  // console.log(str);
  // greedy search for directions
  let result = [];
  for(let i = 0; i < str.length; i++) {
    if (i + 1 < str.length && str.charAt(i) == 's' && str.charAt(i + 1) == 'e') {
      result.push(SOUTH_EAST);
      i++;
    } else if (i + 1 < str.length && str.charAt(i) == 's' && str.charAt(i + 1) == 'w') {
      result.push(SOUTH_WEST);
      i++;
    } else if (i + 1 < str.length && str.charAt(i) == 'n' && str.charAt(i + 1) == 'w') {
      result.push(NORTH_WEST);
      i++;
    } else if (i + 1 < str.length && str.charAt(i) == 'n' && str.charAt(i + 1) == 'e') {
      result.push(NORTH_EAST);
      i++;
    } else if (str.charAt(i) == 'e') {
      result.push(EAST);
    } else if (str.charAt(i) == 'w') {
      result.push(WEST);
    } else {
      console.log(`Something is wrong: ${str.charAt(i)}`);
      return;
    }
  }
  return result;
}

function getNeighbors(tile, originalFlipped) {
  let tileArr = tile.split(',').map(el => parseInt(el));
  let blackNeighbors = new Set();
  let whiteNeighbors = new Set();
  ALL_DIRECTIONS.forEach(dir => {
    let neighbor = [dir[0] + tileArr[0], dir[1] + tileArr[1]];
    if (originalFlipped.has(neighbor.join(','))) {
      blackNeighbors.add(neighbor.join(','));
    } else {
      whiteNeighbors.add(neighbor.join(','));
    }
  });
  // console.log(`current tile: ${tile}`);
  return {black: blackNeighbors, white: whiteNeighbors};
}

function part2() {
  let blackTiles = part1();
  for (let day = 0; day < 100; day++) {
    let knownWhiteTiles = new Set();
    let knownBlackTiles = new Set();
    for(tile of blackTiles.values()) {
      let neighbors = getNeighbors(tile, blackTiles);
      // console.log(neighbors);
      knownWhiteTiles = new Set([...knownWhiteTiles, ...neighbors.white]);
      if (neighbors.black.size == 0 || neighbors.black.size > 2) {
        // knownWhiteTiles.add(tile);
      } else {
        knownBlackTiles.add(tile);
      }
    }
    for (tile of knownWhiteTiles.values()) {
      let neighbors = getNeighbors(tile, blackTiles);
      if (neighbors.black.size == 2) {
        knownBlackTiles.add(tile);
      }
    }
    // console.log(`day end flipped: ${knownBlackTiles.size}`)

    blackTiles = knownBlackTiles;
  }
  console.log(`Total flipped: ${blackTiles.size}`);
}

part2();
