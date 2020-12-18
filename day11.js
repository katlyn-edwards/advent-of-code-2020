let input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

let inputArr = input.split('\n');
function part1() {
  performSeatSwaps(false);
  return finalOccupied(inputArr);
}

function performSeatSwaps(isPart2) {
  let minToBecomeEmpty = isPart2 ? 5 : 4;
  let didMakeChanges = true;
  while (didMakeChanges) {
    let cleanArr = inputArr.slice();
    didMakeChanges = false;
    for (let row = 0; row < inputArr.length; row++) {
      for (let column = 0; column < inputArr[0].length; column++) {
        let char = cleanArr[row][column];
        if (char == '.') {
          // do nothing
          continue;
        } else if (char == 'L') {
          // check all 8 adjacent
          let occupied = getOccupiedCount(cleanArr, row, column, isPart2);
          if (occupied == 0) {
            str = inputArr[row];
            strArr = str.split('')
            strArr[column] = '#'
            inputArr[row] = strArr.join('');
            didMakeChanges = true;
          }
        } else if (char == '#') {
          // check four or more adjacent
          let occupied = getOccupiedCount(cleanArr, row, column, isPart2);
          if (occupied >= minToBecomeEmpty) {
            str = inputArr[row];
            strArr = str.split('')
            strArr[column] = 'L'
            inputArr[row] = strArr.join('');
            didMakeChanges = true;
          }
        }
      }
    }
  }
}

function finalOccupied(inputArr) {
  let count = 0;
  for (let row = 0; row < inputArr.length; row++) {
    for (let column = 0; column < inputArr[0].length; column++) {
      let char = inputArr[row][column];
      if (char == '#') {
        count++;
      }
    }
  }
  return count;
}

function part2() {
  performSeatSwaps(true);
  return finalOccupied(inputArr);
}

function getOccupiedCount(arr, row, col, shouldExtend) {
  let count = 0;

  let rowToCheck = row - 1;
  let colToCheck = col - 1;
  while (shouldExtend && rowToCheck >= 0 && colToCheck >= 0 && arr[rowToCheck][colToCheck] == '.') {
    rowToCheck -= 1;
    colToCheck -= 1;
  }
  if (rowToCheck >= 0 && colToCheck >= 0 && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  rowToCheck = row - 1;
  colToCheck = col;
  while (shouldExtend && rowToCheck >= 0 && arr[rowToCheck][colToCheck] == '.') {
    rowToCheck -= 1;
  }
  if (rowToCheck >= 0 && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  rowToCheck = row - 1;
  colToCheck = col + 1;
  while (shouldExtend && rowToCheck >= 0 && colToCheck < arr[0].length && arr[rowToCheck][colToCheck] == '.') {
    rowToCheck -= 1;
    colToCheck += 1;
  }
  if (rowToCheck >= 0 && colToCheck < arr[0].length && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  rowToCheck = row;
  colToCheck = col - 1;
  while (shouldExtend && colToCheck >= 0 && arr[rowToCheck][colToCheck] == '.') {
    colToCheck -= 1;
  }
  if (colToCheck >= 0 && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  rowToCheck = row;
  colToCheck = col + 1;
  while (shouldExtend && colToCheck < arr[0].length && arr[rowToCheck][colToCheck] == '.') {
    colToCheck += 1;
  }
  if (colToCheck < arr[0].length && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  rowToCheck = row + 1;
  colToCheck = col - 1;
  while (shouldExtend && rowToCheck < arr.length && colToCheck >= 0 && arr[rowToCheck][colToCheck] == '.') {
    rowToCheck += 1;
    colToCheck -= 1;
  }
  if (rowToCheck < arr.length && colToCheck >= 0 && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  rowToCheck = row + 1;
  colToCheck = col;
  while (shouldExtend && rowToCheck < arr.length && arr[rowToCheck][colToCheck] == '.') {
    rowToCheck += 1;
  }
  if (rowToCheck < arr.length && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  rowToCheck = row + 1;
  colToCheck = col + 1;
  while (shouldExtend && rowToCheck < arr.length && colToCheck < arr[0].length && arr[rowToCheck][colToCheck] == '.') {
    rowToCheck += 1;
    colToCheck += 1;
  }
  if (rowToCheck < arr.length && colToCheck < arr[0].length && arr[rowToCheck][colToCheck] == '#') {
    count++;
  }

  return count;
}


