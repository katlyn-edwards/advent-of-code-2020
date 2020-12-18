let input = `F10
N3
F7
R90
F11`;
let inputArr = input.split('\n');

let startX = 0;
let startY = 0;

let currDirection = 'E'
let directions = ['N', 'E', 'S', 'W'];


function part1() {
  inputArr.forEach(direction => {
    if (direction.charAt(0) == 'F') {
      let amount = parseInt(direction.slice(1));
      if (currDirection == 'N') {
        startY += amount;
      } else if (currDirection == 'S') {
        startY -= amount;
      } else if (currDirection == 'E') {
        startX += amount;
      } else if (currDirection == 'W') {
        startX -= amount;
      } else {
        console.log(`WAT: ${currDirection}`);
      }
    } else if (direction.charAt(0) == 'R') {
      let degrees = parseInt(direction.slice(1));
      let currIndex = directions.indexOf(currDirection.charAt(0));
      if (degrees == 90) {
        currIndex += 1;
      } else if (degrees == 180) {
        currIndex += 2;
      } else if (degrees == 270) {
        currIndex += 3;
      } else {
        console.log(`unexpected degrees; ${degrees}`)
      }
      currIndex = currIndex % directions.length;
      currDirection = directions[currIndex];
    } else if (direction.charAt(0) == 'L') {
      let degrees = parseInt(direction.slice(1));
      let currIndex = directions.indexOf(currDirection);
      if (degrees == 90) {
        currIndex -= 1;
      } else if (degrees == 180) {
        currIndex -= 2;
      } else if (degrees == 270) {
        currIndex -= 3;
      } else {
        console.log(`unexpected degrees; ${degrees}`)
      }
      currIndex = (currIndex + directions.length) % directions.length;
      currDirection = directions[currIndex];
    } else if (direction.charAt(0) == 'N') {
      // console.log(`startY1: ${startY}`)
      startY += parseInt(direction.slice(1));
      // console.log(`moving north`)
      // console.log(`startY2: ${startY}`)
    } else if (direction.charAt(0) == 'S') {
      startY -= parseInt(direction.slice(1));
    } else if (direction.charAt(0) == 'E') {
      startX += parseInt(direction.slice(1));
    } else if (direction.charAt(0) == 'W') {
      startX -= parseInt(direction.slice(1));
    }
  });
  console.log(`end position: ${startX}, ${startY}`)
  let result = Math.abs(startX) + Math.abs(startY);
  console.log(result)
  return result;
}

function part2() {
  let waypointX = 10;
  let waypointY = 1;

  inputArr.forEach(direction => {
    if (direction.charAt(0) == 'F') {
      let amount = parseInt(direction.slice(1));
      startX += amount * waypointX
      startY += amount * waypointY
    } else if (direction.charAt(0) == 'R') {
      let degrees = parseInt(direction.slice(1));
      if (degrees == 90) {
        let oldY = waypointY;
        waypointY = -1 * waypointX;
        waypointX = oldY;
      } else if (degrees == 180) {
        waypointY = -1 * waypointY;
        waypointX = -1 * waypointX;
      } else if (degrees == 270) {
        let oldY = waypointY;
        waypointY = waypointX;
        waypointX =  -1 * oldY;
      }
    } else if (direction.charAt(0) == 'L') {
      let degrees = parseInt(direction.slice(1));
      if (degrees == 90) {
        let oldY= waypointY;
        waypointY = waypointX;
        waypointX =  -1 * oldY;
      } else if (degrees == 180) {
        waypointY = -1 * waypointY;
        waypointX = -1 * waypointX;
      } else if (degrees == 270) {
        let oldY = waypointY;
        waypointY = -1 * waypointX;
        waypointX = oldY;
      }
    } else if (direction.charAt(0) == 'N') {
      waypointY += parseInt(direction.slice(1));
    } else if (direction.charAt(0) == 'S') {
      waypointY -= parseInt(direction.slice(1));
    } else if (direction.charAt(0) == 'E') {
      waypointX += parseInt(direction.slice(1));
    } else if (direction.charAt(0) == 'W') {
      waypointX -= parseInt(direction.slice(1));
    }
  });
  console.log(`end position: ${startX}, ${startY}`)
  let result = Math.abs(startX) + Math.abs(startY);
  console.log(result)
  return result;
}
