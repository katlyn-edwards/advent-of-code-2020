const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const operations = input.split('\n');

function getAccumulatorForCycle(operationsArr) {
  let accumulator = 0;
  let visitedArr = new Array(operationsArr.length)
  visitedArr.fill(false, 0, operationsArr.length);
  let currentIndex = 0;
  while (currentIndex < visitedArr.length && !visitedArr[currentIndex]) {
    // mark visited
    visitedArr[currentIndex] = true;
    const [operation, amount] = operationsArr[currentIndex].split(' ');
    switch (operation) {
      case 'nop':
        currentIndex += 1;
        break;
      case 'acc':
        let value = parseInt(amount);
        accumulator += value;
        currentIndex += 1;
        break;
      case 'jmp':
        currentIndex += parseInt(amount);
        break;
      default:
        console.log('wtf')
    }
  }
  if (visitedArr[currentIndex] == true) {
    // cycle would continue!
    return {accumulator, cycled: true};
  }
  return {accumulator, cycled: false};
}

function part1() {
  let result = getAccumulatorForCycle(operations);
  return result.accumulator;
}

function part2() {
  for (let i = 0; i < operations.length; i++ ) {
     if (operations[i].indexOf('acc') != -1) {
       continue;
     }
     // make a deep copy to not fuck with original data
     let modifiedOperations = operations.slice();
     if (modifiedOperations[i].indexOf('jmp') != -1) {
       modifiedOperations[i] = 'nop' + modifiedOperations[i].split('').slice(3).join('');
     } else {
       modifiedOperations[i] = 'jmp' + modifiedOperations[i].split('').slice(3).join('');
     }

    let result = getAccumulatorForCycle(modifiedOperations);
    if (result.cycled) {
      // bailing because we cycled, awful
      continue;
    } else {
      return result.accumulator;
    }
  }
}
