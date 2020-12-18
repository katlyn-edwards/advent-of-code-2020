let input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const inputArr = input.split('\n\n');

function partOne() {
  let finalTotal = 0;
  inputArr.forEach((group) => {
    let questions = new Set();
    let groupArr = group.split('\n');
    groupArr.forEach((person) => {
      let individualQuestionsArr = person.split('');
      individualQuestionsArr.forEach((char) => {
        questions.add(char);
      });
    });
    finalTotal += questions.size;
  });
  console.log(finalTotal);
  return finalTotal;
}

function partTwo() {
  let finalTotal = 0;
  inputArr.forEach((group) => {
    let questions = new Map();
    let groupArr = group.split('\n');
    groupArr.forEach((person) => {
      let individualQuestionsArr = person.split('');
      individualQuestionsArr.forEach((char) => {
        if (!questions.has(char)) {
          questions.set(char, 1);
        } else {
          let old = questions.get(char);
          questions.set(char, old + 1);
        }
      });
    });
    let totalAllAgreed = 0;
    questions.forEach((value, key, map) => {
      if (value == groupArr.length) {
        // everyone said yes
        totalAllAgreed++;
      }
    });
    finalTotal += totalAllAgreed;
  });
  console.log(finalTotal);
}
