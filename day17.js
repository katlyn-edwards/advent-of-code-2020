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

function part1() {
  // Create coordinates.
  let activeCoords = new Set();
  inputArr.forEach((line, Yidx) => {
    lineArr = line.split('');
    lineArr.forEach((char, Xidx) => {
      if (char == '#') {
        activeCoords.add(`${Xidx},${Yidx},0`);
      }
    });
  });

  // console.log("activeCoords")
  // console.log(activeCoords)
  for (let cycle = 0; cycle < bootCycle; cycle++) {
    // Don't modify input because all changes
    // happen simultaneously.
    let newActiveCoords = new Set();
    let discoveredInactives = new Set();
    // Modify!
    // console.log("ACTIVE")
    activeCoords.forEach(coord => {
      // console.log("looking at this coord")
      // console.log(coord)
      result = getActiveNeighbors(coord, activeCoords);
      activeNeighbors = result.activeNeighbors;
      inactiveNeighbors = result.inactiveNeighbors;
      inactiveNeighbors.forEach(e => {
        discoveredInactives.add(e);
      });
      // console.log("active neighbors")
      // console.log(activeNeighbors.length)
      if (activeNeighbors.length == 2 || activeNeighbors.length == 3) {
        // stay active
        // console.log("stay active")
        newActiveCoords.add(coord);
      } else {
        // console.log("become inactive")
        // newInactiveCoords.add(coord);
      }
    });

    // console.log("INACTIVE")
    discoveredInactives.forEach(coord => {
      // console.log("looking at this coord")
      // console.log(coord)
      result = getActiveNeighbors(coord, activeCoords);
      activeNeighbors = result.activeNeighbors;

      // console.log("active neighbors")
      // console.log(activeNeighbors.length)
      if (activeNeighbors.length == 3) {
        // console.log('become active')
        // become active
        newActiveCoords.add(coord);
      } else {
        // console.log('stay inactive')
        // newInactiveCoords.add(coord);
      }
    });

    activeCoords = newActiveCoords;

    // console.log('after cycle')
    // console.log(newActiveCoords)
  }

  console.log('answer');
  console.log(activeCoords.size);
}

function getActiveNeighbors(coordStr, activeSet) {
  let coord = getCoordObj(coordStr)
  // console.log("collecting neighbors")
  // console.log(coord);
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
         // console.log("new neighbor: " + newCoordStr)
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
  // Create coordinates.
  let activeCoords = new Set();
  inputArr.forEach((line, Yidx) => {
    lineArr = line.split('');
    lineArr.forEach((char, Xidx) => {
      if (char == '#') {
        activeCoords.add(`${Xidx},${Yidx},0,0`);
      }
    });
  });

  // console.log("activeCoords")
  // console.log(activeCoords)
  for (let cycle = 0; cycle < bootCycle; cycle++) {
    // Don't modify input because all changes
    // happen simultaneously.
    let newActiveCoords = new Set();
    let discoveredInactives = new Set();
    // Modify!
    // console.log("ACTIVE")
    activeCoords.forEach(coord => {
      // console.log("looking at this coord")
      // console.log(coord)
      result = getActiveNeighbors2(coord, activeCoords);
      activeNeighbors = result.activeNeighbors;
      inactiveNeighbors = result.inactiveNeighbors;
      inactiveNeighbors.forEach(e => {
        discoveredInactives.add(e);
      });
      // console.log("active neighbors")
      // console.log(activeNeighbors.length)
      if (activeNeighbors.length == 2 || activeNeighbors.length == 3) {
        // stay active
        // console.log("stay active")
        newActiveCoords.add(coord);
      } else {
        // console.log("become inactive")
        // newInactiveCoords.add(coord);
      }
    });

    // console.log("INACTIVE")
    discoveredInactives.forEach(coord => {
      // console.log("looking at this coord")
      // console.log(coord)
      result = getActiveNeighbors2(coord, activeCoords);
      activeNeighbors = result.activeNeighbors;

      // console.log("active neighbors")
      // console.log(activeNeighbors.length)
      if (activeNeighbors.length == 3) {
        // console.log('become active')
        // become active
        newActiveCoords.add(coord);
      } else {
        // console.log('stay inactive')
        // newInactiveCoords.add(coord);
      }
    });

    activeCoords = newActiveCoords;

    // console.log('after cycle')
    // console.log(newActiveCoords)
  }

  console.log('answer');
  console.log(activeCoords.size);
}

function getCoordObj2(coord) {
  let coordArr = coord.split(',');
  return {x: parseInt(coordArr[0]), y: parseInt(coordArr[1]), z: parseInt(coordArr[2]), w: parseInt(coordArr[3])};
}

function getActiveNeighbors2(coordStr, activeSet) {
  let coord = getCoordObj2(coordStr)
  // console.log("collecting neighbors")
  // console.log(coord);
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
           // console.log("new neighbor: " + newCoordStr)
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

part2();
