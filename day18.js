let input = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`
let inputArr = input.split(`\n`);

function part1() {
  let totals = []
  inputArr.forEach(line => {
    totals.push(getTotal(line, false));
  });

  return totals.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
}

function getTotal(line, isPart2) {
  let lineArr = line.split(' ');
  let stack = [];
  for (let i = 0; i < lineArr.length; i++) {
    if (lineArr[i].indexOf('(') != -1) {
      let numLeftParens = lineArr[i].split('').reduce((sum, char) => {
        if (char == '(') {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0);
      for (let i = 0; i < numLeftParens; i++) {
        stack.push({num: 0, op: '('});
      }
      let num = parseInt(lineArr[i].split('').slice(numLeftParens));
      let op = lineArr[i + 1];
      stack.push({num, op});
    } else if (lineArr[i].indexOf(')') != -1) {
      let numRightParens = lineArr[i].split('').reduce((sum, char) => {
        if (char == ')') {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0);
      // OK so could be left paren or more numbers
      let rightHandSide = parseInt(lineArr[i]);
      for (let paren = 0; paren < numRightParens; paren++) {
        let numsToProcess = [];
        let popped = stack.pop();
        while (popped.op != '(') {
          numsToProcess.unshift(popped);
          popped = stack.pop();
        }

        numsToProcess.push({num: rightHandSide, op: undefined});
        if (isPart2) {
          // Do all addition first
          while (numsToProcess.some(el => el.op == '+')) {
            let index = numsToProcess.findIndex(el => el.op == '+');
            let newResNum = doMath(numsToProcess[index].num, numsToProcess[index].op, numsToProcess[index+1].num)
            numsToProcess[index] = {num: newResNum, op: numsToProcess[index + 1].op};
            numsToProcess.splice(index + 1, 1);
          }
        }
        // OK now it's just multiplication
        let intermediateObj = numsToProcess[0];
        for (let z = 1; z < numsToProcess.length; z++) {
          let resultNum = doMath(intermediateObj.num, intermediateObj.op, numsToProcess[z].num);
          intermediateObj = {num: resultNum, op: numsToProcess[z].op};
        }
        rightHandSide = intermediateObj.num
      }
      stack.push({num: rightHandSide, op: lineArr[i + 1]})
    } else if (lineArr[i] == '+' || lineArr[i] == '*') {
      // we don't process these
      continue;
    } else {
      // it's a number
      let currNum = parseInt(lineArr[i ]);
      newOp = lineArr[i + 1];
      stack.push({num: currNum, op: newOp});
    }
  }

  if (isPart2) {
    // Do all addition first
    while (stack.some(el => el.op == '+')) {
      let index = stack.findIndex(el => el.op == '+');
      let newResNum = doMath(stack[index].num, stack[index].op, stack[index+1].num)
      stack[index] = {num: newResNum, op: stack[index + 1].op};
      stack.splice(index + 1, 1);
    }
    // OK now it's just multiplication, treat like normal.
  }
  let tada = stack[0];
  for (let i = 1; i < stack.length; i++) {
    let resultNum = doMath(tada.num, tada.op, stack[i].num);
    tada = {num: resultNum, op: stack[i].op};
  }
  return tada.num;
}

function part2() {
  let totals = []
  inputArr.forEach(line => {
    totals.push(getTotal(line, true));
  });

  return totals.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
}

function doMath(num, op, result) {
  if (op == '+') {
    return result + parseInt(num);
  } else if (op == '*') {
    return result * parseInt(num);
  } else {
    return "WTF " + op;
  }
}
