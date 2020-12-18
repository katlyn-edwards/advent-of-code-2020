// [numOccurances, requiredCharacter, password]
let input = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;
input = input.split(`\n`);
input = input.map(line => {
  let lineArr = line.split(' ');
  let charArr = lineArr[1].split('');
  lineArr[1] = charArr.slice(0, charArr.length - 1).join('');
  return lineArr;
});

function part1() {
  let result = input.reduce((runningTotal, line, index) => {
    const [numOccurances, requiredCharacter, password] = line;
    const [min, max] = numOccurances.split('-');
    const totalInstances = password.split('').reduce((accumulator, char, idx) => {
      return char == requiredCharacter ? accumulator + 1 : accumulator;
    }, 0);
    const conforms = (totalInstances >= min && totalInstances <= max);
    return conforms ? 1 + runningTotal : runningTotal;
  }, 0);
  console.log("conforming passwords: " + result);
  return result;
}

function part2() {
  let result = input.reduce((runningTotal, line, index) => {
    const [positions, requiredCharacter, password] = line;
    const [idx1, idx2] = positions.split('-');
    const conforms = (password[idx1 - 1] == requiredCharacter ||
                      password[idx2 - 1] == requiredCharacter) &&
                      password[idx1 - 1] != password[idx2 - 1];
    return conforms ? 1 + runningTotal : runningTotal;
  }, 0);
  console.log("conforming passwords: " + result);
  return result;
}
