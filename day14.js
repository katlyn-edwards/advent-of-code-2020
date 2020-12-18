let input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;
let inputArr = input.split(`\n`);

function dec2bin(dec){
  return (dec >>> 0).toString(2);
}

function pad(arr, length) {
  for (let p = 0; p < length; p++) {
    arr.unshift(0);
  }
}

function part1() {
  let resultMap = [];
  let mask = '';

  for (let i = 0; i < inputArr.length; i++) {
    let line = inputArr[i];
    if (line.indexOf('mask') != -1) {
      let maskStr = line;
      mask = maskStr.split(' = ')[1];
      continue;
    }

    let re = /\[(\d+)/;
    let matchArr = line.match(re);
    if (!matchArr) {
      return;
    }
    let memAddress = parseInt(matchArr[1]);
    splitArr = line.split('= ');
    let decimal = parseInt(splitArr[1]);
    let binary = dec2bin(decimal);
    let binaryArr = ('' + binary).split('');
    let maskCharArr = mask.split('');
    let padlength = maskCharArr.length - binaryArr.length;
    pad(binaryArr, padlength);

    for (let i = 0; i < maskCharArr.length; i++) {
      if (maskCharArr[i] != 'X') {
        binaryArr[i] = parseInt(maskCharArr[i]);
      }
    }
    resultMap[memAddress] = binaryArr.join('');
  }

  let intermediate = Object.values(resultMap);
  intermediate = intermediate.map(el => parseInt(el, 2));
  let result = intermediate.reduce((accu, newV) => {
    if (newV) {
      return accu + newV;
    } else {
      return accu;
    }
  }, 0);
  console.log(result)
  return result;
}

function part2() {
  let resultMap = {};
  let mask = '';

  for (let i = 0; i < inputArr.length; i++) {
    let line = inputArr[i];
    if (line.indexOf('mask') != -1) {
      let maskStr = line;
      mask = maskStr.split(' = ')[1];
      continue;
    }

    let re = /\[(\d+)/;
    let matchArr = line.match(re);
    if (!matchArr) {
      return;
    }
    let memAddress = parseInt(matchArr[1]);

    splitArr = line.split('= ');
    let decimalToSave = parseInt(splitArr[1]);


    let binary = dec2bin(memAddress);
    let binaryArr = ('' + binary).split('');

    let maskCharArr = mask.split('');
    let padlength = maskCharArr.length - binaryArr.length;
    pad(binaryArr, padlength)

    for (let i = 0; i < maskCharArr.length; i++) {
      if (maskCharArr[i] == '0') {
        continue;
      } else if (maskCharArr[i] == '1') {
        binaryArr[i] = 1;
      } else if (maskCharArr[i] == 'X') {
        binaryArr[i] = 'X';
      } else {
        console.log(`panic!`)
        return;
      }
    }

    let numXs = binaryArr.reduce((acc, newV) => {
      if (newV == 'X') {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    let newMemoryAddresses = [];
    let numCopies = Math.pow(2, numXs);
    for (let i = 0; i < numCopies; i++) {
      let newChoice = '' + dec2bin(i);
      newChoice = newChoice.split('');
      let padlength = binaryArr.length - newChoice.length;
      pad(newChoice, padlength)
      let newChoiceArr = new Array(binaryArr.length);
      let choiceIndex = newChoice.length  - 1;
      for (let j = binaryArr.length; j >= 0; j--) {
        if (binaryArr[j] == 'X') {
          newChoiceArr[j] = newChoice[choiceIndex];
          choiceIndex--;
        } else {
          newChoiceArr[j] = 0
        }
      }
      let modifiedBinaryArr = binaryArr.slice();
      for (let j = 0; j < binaryArr.length; j++) {
        if (modifiedBinaryArr[j] == 'X') {
          modifiedBinaryArr[j] = newChoiceArr[j];
        }
      }
      newMemoryAddresses.push(modifiedBinaryArr.join(''));
    }

    decMemoryAddresses = newMemoryAddresses.map(el => parseInt(el, 2));
    for (let i = 0; i < decMemoryAddresses.length; i++) {
      resultMap[decMemoryAddresses[i]] = decimalToSave;
    }
  }
  let keys = Object.keys(resultMap);
  let total = 0;
  for (let i = 0; i < keys.length; i++) {
    total += resultMap[keys[i]]
  }
  console.log(total)
}

