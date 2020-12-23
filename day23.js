let input = `716892543`;
let inputArr = input.split('');
inputArr = inputArr.map(el => parseInt(el));

let MOVES = 10000000;
let MIL =   1000000;

// Find biggest cup number
let maxNum = 0;
inputArr.forEach(el => {
  if (el > maxNum) {
    maxNum = el;
  }
});
console.log(`maxNum: ${maxNum}`)

function part1() {
  console.log(inputArr);
  playGame(inputArr, maxNum);

  let start = inputArr.indexOf(1);
  let result = '';
  for (let i = 1; i < inputArr.length; i++) {
    let actualIndex = (start + i) % inputArr.length;
    result += inputArr[actualIndex];
  }
  console.log(`I did it: ${result}`);
}

function playGame(inputArr, maxNum) {
  let currentCupIndex = 0;
  for (let move = 0; move < MOVES; move++) {
    // console.log(`-- move ${move + 1} --`)
    let printStr = 'cups : ';
    inputArr.forEach((el, index) => {
      if (index == currentCupIndex) {
        printStr += '(' + el + ') ';
      } else {
        printStr += el + ' ';
      }
    });
    // console.log(printStr);

    let currentCup = inputArr[currentCupIndex];
    let pickedUp = inputArr.splice(currentCupIndex + 1, 3);
    while (pickedUp.length != 3) {
      pickedUp.push(inputArr.shift());
    }
    // console.log(`picked up: ${pickedUp.join(', ')}`)
    let destination = currentCup - 1;
    if (destination == 0) {
      destination = maxNum;
    }
    while (pickedUp.indexOf(destination) != -1) {
      destination = destination - 1;
      if (destination == 0) {
        destination = maxNum;
      }
    }
    // console.log(`destination: ${destination}`);
    inputArr.splice(inputArr.indexOf(destination) + 1, 0, ...pickedUp);
    currentCupIndex = (inputArr.indexOf(currentCup) + 1) % inputArr.length;
    // console.log('\n');
  }
  console.log(`-- final --`);
  let finalStr = 'cups: ';
  for (let i = 0; i < inputArr.length; i++) {
    if (i == currentCupIndex) {
      finalStr += '('
    }
    finalStr += inputArr[i];
    if (i == currentCupIndex) {
      finalStr += ')';
    }
    finalStr += ' ';
  }
  console.log(`${finalStr}`)
}

function playGame2(inputMap, maxNum, startVal) {
  let curNum = startVal
  for (let move = 0; move < MOVES; move++) {
    // console.log(`current choice: ${curNum}`)
    let currentCupNode = inputMap[curNum];
    // console.log(`-- move ${move + 1} --`)

    let pickedUpValues = [];
    let cur = currentCupNode.next;
    for (let i = 0; i < 3; i++) {
      pickedUpValues.push(cur);
      cur = inputMap[cur].next;
    }
    // console.log(`picked up: ${pickedUpValues.join(', ')}`)

    let start = inputMap[pickedUpValues[0]];
    let end = inputMap[pickedUpValues[2]];
    inputMap[start.prev].next = end.next;
    inputMap[end.next].prev = start.prev;
    let nextCurrentCup = end.next;
    let destinationNum = curNum - 1;
    if (destinationNum == 0) {
      destinationNum = maxNum;
  }
    while (pickedUpValues.indexOf(destinationNum) != -1) {
      destinationNum = destinationNum - 1;
      if (destinationNum == 0) {
        destinationNum = maxNum;
      }
    }
    // console.log(`destination: ${destinationNum}`);

    let originalNextNum = inputMap[destinationNum].next;
    inputMap[destinationNum].next = pickedUpValues[0];
    inputMap[pickedUpValues[0]].prev = destinationNum;
    inputMap[pickedUpValues[2]].next = originalNextNum;
    inputMap[originalNextNum].prev = pickedUpValues[2];

    // console.log(`updated map`)
    // console.log(inputMap);

    curNum = nextCurrentCup;
  }
}

function part2() {
  let newCupsToAdd = MIL - inputArr.length;
  let start = inputArr[0];
  for (let i = 0; i < newCupsToAdd; i++) {
    inputArr.push(i + 1 + maxNum);
  }
  console.log(`sanity check`);
  console.log(inputArr[inputArr.length - 1]);
  // val to linked list node
  let inputMap = {};
  inputMap[inputArr[0]] = {
    prev: inputArr[inputArr.length - 1],
    next: inputArr[1],
  };
  // console.log(inputMap)
  let prev = inputArr[0];
  let next = inputArr[2];
  for (let i = 1; i < inputArr.length; i++) {
    inputMap[inputArr[i]] = {prev, next};
    prev = inputArr[i];
    next = inputArr[(i + 2) % inputArr.length];
  }
  // console.log(inputMap);

  playGame2(inputMap, MIL, start);

  let first = inputMap[1].next;
  let second = inputMap[first].next;

  console.log(first);
  console.log(second);
  console.log(`final: ${first * second} `)
}

part2();
