let input = `0,3,6`;
let inputArr = input.split(`,`);
inputArr = inputArr.map(el => parseInt(el));

function part1() {
  return getLastNumber(2020);
}

function part2() {
  return getLastNumber(30000000);
}

function getLastNumber(final) {
  let locationMap = new Map();
  for (let i = 0; i < inputArr.length - 1; i++) {
    locationMap.set(inputArr[i], i + 1);
  }

  let last = inputArr[inputArr.length - 1];
  for (let i = inputArr.length; i < final; i++) {
    if (locationMap.has(last)) {
      let index = locationMap.get(last);
      let diff = i - index;
      locationMap.set(last, i);
      last = diff;
    } else {
      // First time seeing that number.
      locationMap.set(last, i)
      last = 0;
    }
  }

  console.log(`last: ${last}`);
  return last;
}
