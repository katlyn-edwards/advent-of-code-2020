let input = `2 * (6 + 5) + 5`

let inputArr = input.split(`\n`);

function part1() {

  let totals = []
  inputArr.forEach(line => {
    totals.push(getTotal(line));
  });

  totals.forEach(el => console.log(el))
  // console.log("" + totals)

  let answer = totals.reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  return answer;
}

function getTotal(line) {
  // console.log(`line: ${line}`)
  let lineArr = line.split(' ');
  let stack = [];
  for (let i = 0; i < lineArr.length; i++) {
    console.log(`stack: `);
    console.log(stack.slice())
    console.log(`i: ${i}`)
    console.log(lineArr[i]);
    if (lineArr[i].indexOf('(') != -1) {
      console.log(`first paren at: ${i}`);
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
      // console.log(num);
      let op = lineArr[i + 1];
      // console.log(`left paren`)
      // console.log(`num: ${num}, op: ${op}`)
      stack.push({num, op});
    } else if (lineArr[i].indexOf(')') != -1) {
      let numRightParens = lineArr[i].split('').reduce((sum, char) => {
        if (char == ')') {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0);
      // console.log(`numRightParens: ${numRightParens}`);
      // console.log(`right paren`)
      // console.log(lineArr[i])
      // OK so could be left paren or more numbers
      let rightHandSide = parseInt(lineArr[i]);
      console.log(`rhs: ${rightHandSide}`)

      for (let paren = 0; paren < numRightParens; paren++) {
        // console.log("the stack rn")
        // console.log(stack.slice())
        let numsToProcess = [];
        let popped = stack.pop();
        // console.log(`popped`)
        // console.log(popped)
        while (popped.op != '(') {
          numsToProcess.unshift(popped);
          popped = stack.pop();
        }
        // console.log('nums to process')
        // console.log(numsToProcess);
        let intermediateObj = numsToProcess[0];
        // console.log("intermediateObj")
        // console.log(intermediateObj)
        for (let z = 1; z < numsToProcess.length; z++) {
          second = numsToProcess[z];
          newNum = doMath(intermediateObj.num, intermediateObj.op, second.num);
          intermediateObj = {num: newNum, op: second.op}
          // console.log(`new intermediate objs`)
          // console.log(intermediateObj)
        }
        // down to the last two! e.g. (3 + C)
        let finalResultNum = doMath(intermediateObj.num, intermediateObj.op, rightHandSide)
        // console.log("finished this paren group")
        // console.log(finalResultNum)
        rightHandSide = finalResultNum
      }
      // console.log("adding result to stack")
      stack.push({num: rightHandSide, op: lineArr[i + 1]})
      // console.log(stack.slice());
    } else if (lineArr[i] == '+' || lineArr[i] == '*') {
      // console.log("skipping operands")
      continue;
      // we don't process these
    } else {
      // it's a number
      let currNum = parseInt(lineArr[i ]);
      console.log(`currNum:  ${currNum}`)

      newOp = lineArr[i + 1];
      console.log(`newOp:  ${newOp}`)
      stack.push({num: currNum, op: newOp});
    }
  }
  // console.log("end");
  let tada = stack[0];
  console.log(stack)
  for ( let i = 1; i < stack.length; i++) {
    // console.log(stack[i])
    let resultNum = doMath(tada.num, tada.op, stack[i].num);
    tada = {num: resultNum, op: stack[i].op};
  }
  return tada.num;
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
