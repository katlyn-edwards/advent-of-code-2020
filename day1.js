let input = `1721
979
366
299
675
1456`;
input = input.split(`\n`).map(el => parseInt(el));

function part1() {
  input.forEach((el, index) => {
    input.forEach((el2, index2) => {
      if (index == index2) {
        // do nothing; can't re-use numbers.
      } else if (el + el2 == 2020) {
        console.log(el * el2);
        return el * el2;
      }
    });
  });
}

function part2() {
  input.forEach((el, index) => {
    input.forEach((el2, index2) => {
      if (index2 == index) {
        // do nothing; can't re-use numbers.
      } else {
        input.forEach((el3, index3) => {
          if (index3 == index2 || index3 == index) {
            // do nothing; can't re-use numbers.
          } else if (el + el2 + el3 == 2020) {
            console.log(el * el2 * el3);
            return el * el2 * el3;
          }
        });
      }
    });
  });
}
