let preambleLength = 5;
let windowSize = 5;

let input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

let inputArr = input.split('\n');
inputArr = inputArr.map(el => parseInt(el));

function part1() {
  for (let i = preambleLength; i < inputArr.length; i++) {
    let goalTotal = inputArr[i];
    let found = false;
    for (let j = (i - windowSize); j < windowSize + (i - windowSize); j++) {
      for (let k = (i - windowSize + 1); k < windowSize + (i - windowSize + 1); k++) {
        if ((inputArr[j] + inputArr[k]) == goalTotal) {
          found = true;
        }
      }
    }
    if (!found) {
      console.log(`Invalid index in array! index: ${i} value: ${inputArr[i]}`);
      return inputArr[i];
    }
  }
}

function part2() {
  let invalidVal = part1();
  for (let i = 0; i < inputArr.length; i++) {
    let runningSum = inputArr[i];
    let contiguousIndexEnd = 1;
    while (runningSum < invalidVal && (i + contiguousIndexEnd) < inputArr.length) {
      runningSum += inputArr[i + contiguousIndexEnd];
      contiguousIndexEnd++;
    }
    if (runningSum == invalidVal && inputArr[i] != invalidVal) {
      let contiguousArr = inputArr.slice(i, i + contiguousIndexEnd);
      contiguousArr.sort();
      return contiguousArr[0] + contiguousArr[contiguousArr.length -1];
    }
  }
}
