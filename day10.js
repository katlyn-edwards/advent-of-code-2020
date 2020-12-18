let input = `16
10
15
5
1
11
7
19
6
12
4`;


let inputArr = input.split('\n');
inputArr = inputArr.map((el) => parseInt(el));

function part1() {
  let startVoltage = 0;
  let differenceDistributionArr = new Array(4);
  differenceDistributionArr.fill(0, 0, 4);

  let max = Math.max(...inputArr);

  while (startVoltage < max) {
    for (let i = 0; i < 3; i++) {
      let found = inputArr.indexOf(startVoltage + i + 1);
      let difference = inputArr[found] - startVoltage;
      if (found != -1) {
        console.log(`found next leap: from ${startVoltage} to ${startVoltage + i + 1}`)
        differenceDistributionArr[difference] = differenceDistributionArr[difference] + 1;
        console.log(`distribution arr:`)
        console.log(differenceDistributionArr.slice())
        startVoltage = inputArr[found];
        break;
      }
    }
  }

  let finalDiff = (max + 3) - startVoltage;
  differenceDistributionArr[finalDiff] = differenceDistributionArr[finalDiff] + 1;
  console.log(differenceDistributionArr)
  return differenceDistributionArr[1] * differenceDistributionArr[3];
}

function part2() {
  inputArr.sort((a, b) => a - b);
  inputArr.unshift(0);
  let startVoltage = 0;
  let max = Math.max(...inputArr);
  // Recursion doesn't work here - Have to use Dynamic Programming.
  let result = [1];
  getSuccessfulArrangement(startVoltage, max, inputArr, result);
  return result[result.length - 1];
}

function getSuccessfulArrangement(voltage, max, inputArr, result) {
  for (let i = 1; i < inputArr.length; i++) {
    result[i] = 0;
    for (let j = 1; j <= 3; j++) {
      // check the three previous to get my new total
      // Is it valid?
      if ((i - j) >= 0 && inputArr[i] <= inputArr[i - j] + 3) {
        // voltage jump is legal
        result[i] += result[i - j];
      }
    }
  }
}
