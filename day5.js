let input = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`
input = input.split(`\n`);

const totalRows = 128;
const totalSeats = 8;

function part1() {
  let maxSeatId = 0;
  input.forEach((str) => {
    const [row, seat] = getRowAndSeat(str);
    const seatId = getSeatId(row, seat);
    if (seatId > maxSeatId) {
      maxSeatId = seatId;
    }
  });
  return maxSeatId;
}

function part2() {
  const seatIdsMap = new Map();
  input.forEach((str) => {
    const [row, seat] = getRowAndSeat(str);
    const seatId = getSeatId(row, seat);
    seatIdsMap.set(seatId, {row, seat});
  });

  const biggestPossibleSeatId = getSeatId(totalRows, totalSeats);
  window.x = seatIdsMap;
  for (let i = 1; i < biggestPossibleSeatId - 1; i++) {
     if (!seatIdsMap.has(i) && seatIdsMap.has(i+1) && seatIdsMap.has(i-1)) {
       console.log(`found your seatid: ${i} and ${seatIdsMap.get(i)}`);
       return i;
     }
  }
}

function getRowAndSeat(str) {
  const rowStr = str.substring(0, str.length - 3);
  const seatStr = str.substring(str.length - 3, str.length);

  const row = getRowOrSeatValue(rowStr, 0, totalRows, 'F', 'B');
  const seat = getRowOrSeatValue(seatStr, 0, totalSeats, 'L', 'R');

  return [row, seat];
}

function getSeatId(row, seat) {
  return seatId = row * 8 + seat;
}

function getRowOrSeatValue(rowStr, min, max, minChar, maxChar) {
  if (rowStr.length == 0) {
    // base case
    return min;
  } else {
    // recursive case
    const newChoice = rowStr.charAt(0);
    const newRowStr = rowStr.substring(1, rowStr.length);
    let newMin, newMax;
    const half = Math.floor((max - min) / 2);
    if (newChoice == minChar) {
      newMin = min;
      newMax = min + half;
    } else if (newChoice == maxChar) {
      newMin = max - half;
      newMax = max
    } else {
      // literally what?
      console.log("wtf something is wrong, you should look: " + newRowStr);
    }
    return getRowOrSeatValue(newRowStr, newMin, newMax, minChar, maxChar);
  }
}
