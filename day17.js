let input = `...#.#.#
..#..#..
#.#.##.#
###.##..
#####.##
#.......
#..#..##
...##.##`;
let inputArr = input.split(`\n`);

let bootCycle = 6;

function getInitialActiveCoords() {
  let activeCoords = new Set();
  inputArr.forEach((line, Yidx) => {
    lineArr = line.split('');
    lineArr.forEach((char, Xidx) => {
      if (char == '#') {
        activeCoords.add(`${Xidx},${Yidx},0`);
      }
    });
  });
  return activeCoords;
}

function part1() {
  let activeCoords = getInitialActiveCoords();
  activeCoords = runGame(false, activeCoords)
  console.log('answer');
  console.log(activeCoords.size);
}

function runGame(isPart2, activeCoords) {
  let fn = isPart2 ? getActiveNeighbors2 : getActiveNeighbors;
  for (let cycle = 0; cycle < bootCycle; cycle++) {
    // Don't modify input because all changes
    // happen simultaneously.
    let newActiveCoords = new Set();
    let discoveredInactives = new Set();
    // Modify!
    activeCoords.forEach(coord => {
      result = fn(coord, activeCoords);
      activeNeighbors = result.activeNeighbors;
      inactiveNeighbors = result.inactiveNeighbors;
      inactiveNeighbors.forEach(e => {
        discoveredInactives.add(e);
      });
      if (activeNeighbors.length == 2 || activeNeighbors.length == 3) {
        // stay active
        newActiveCoords.add(coord);
      }
    });

    discoveredInactives.forEach(coord => {
      result = fn(coord, activeCoords);
      activeNeighbors = result.activeNeighbors;
      if (activeNeighbors.length == 3) {
        // become active
        newActiveCoords.add(coord);
      }
    });

    activeCoords = newActiveCoords;
  }
  return activeCoords;
}

function getActiveNeighbors(coordStr, activeSet) {
  let coord = getCoordObj(coordStr)
  let activeNeighbors = [];
  let inactiveNeighbors = [];
   for (let x = -1; x <= 1; x++) {
     for (let y = -1; y <= 1; y++) {
       for (let z = -1; z <= 1; z++) {
         if (x == 0 && y == 0 && z == 0) {
           // it me
           continue;
        }
         let newCoord = Object.assign({}, coord);
         newCoord.x += x;
         newCoord.y += y;
         newCoord.z += z;
         newCoordStr = `${newCoord.x},${newCoord.y},${newCoord.z}`;
         let isActive = activeSet.has(newCoordStr);
         if (isActive) {
           activeNeighbors.push(newCoordStr);

         } else {
           inactiveNeighbors.push(newCoordStr);
         }
       }
     }
   }
   return {activeNeighbors, inactiveNeighbors};
}

function getCoordObj(coord) {
  let coordArr = coord.split(',');
  return {x: parseInt(coordArr[0]), y: parseInt(coordArr[1]), z: parseInt(coordArr[2])};
}

function coordsEquals(coord1, coord2) {
   return coord1.x == coord2.x &&
           coord1.y == coord2.y &&
           coord1.z == coord2.z;
}

function part2() {
  let activeCoords = getInitialActiveCoords();
  activeCoords = runGame(true, activeCoords);
  console.log('answer');
  console.log(activeCoords.size);
}

function getCoordObj2(coord) {
  let coordArr = coord.split(',');
  return {x: parseInt(coordArr[0]), y: parseInt(coordArr[1]), z: parseInt(coordArr[2]), w: parseInt(coordArr[3])};
}

function getActiveNeighbors2(coordStr, activeSet) {
  let coord = getCoordObj2(coordStr)
  let activeNeighbors = [];
  let inactiveNeighbors = [];
   for (let x = -1; x <= 1; x++) {
     for (let y = -1; y <= 1; y++) {
       for (let z = -1; z <= 1; z++) {
         for (let w = -1; w <= 1; w++) {
            if (x == 0 && y == 0 && z == 0 && w == 0) {
             // it me
             continue;
            }
           let newCoord = Object.assign({}, coord);
           newCoord.x += x;
           newCoord.y += y;
           newCoord.z += z;
           newCoord.w += w;
           newCoordStr = `${newCoord.x},${newCoord.y},${newCoord.z},${newCoord.w}`;
           // Is this active?
           let isActive = activeSet.has(newCoordStr);
           if (isActive) {
             activeNeighbors.push(newCoordStr);

           } else {
             inactiveNeighbors.push(newCoordStr);
           }
       }
     }
   }
 }
 return {activeNeighbors, inactiveNeighbors};
}
