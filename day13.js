let input = `939
17,x,13,19`;

let inputArr = input.split(`\n`);
departTime = parseInt(inputArr[0]);
busRoutes = inputArr[1];

busRoutes = busRoutes.split(',')

function part1() {
  busRoutes.filter(el => el != 'x')
  let nearestArr = [];
  busRoutes.forEach(route => {
    route = parseInt(route)
    let calc = route
    while (calc <= departTime) {
      calc += route;
    }
    nearestArr.push(calc);
  });

  let min = nearestArr[0];
  let minIndex = 0;
  for (let i = 0; i < nearestArr.length; i++) {
    if (nearestArr[i] < min) {
      minIndex = i;
      min = nearestArr[i]
    }
  }

  diff = min - departTime
}

function part2() {
  // The solution I was writing will take too long
  // given the output space.

  // LOL OK, so I used wolfram alpha, and got it, but
  // like that feels bad.

  // Given the input, this is the equations I
  // generated, in theory you can solve for T
  // t = 19a + 0;
  // t = 41b + 9;
  // t = 743c + 19;
  // t = 13d + 32;
  // t = 17e + 33;
  // t = 29f + 48;
  // t = 643g + 50;
  // t = 37h + 56;
  // t = 23i + 73;

  // t = 1028248271342350 + 2029817890655789 * n
  // so I did 2029817890655789 - 1028248271342350

  busRoutesNoX = busRoutes.slice();
  busRoutesNoX = busRoutes.filter(el => el != 'x')
  busRoutesNoX = busRoutesNoX.map(el => parseInt(el))
  let arrOfTimes = busRoutesNoX.slice();

  let LCM = busRoutesNoX.reduce((prevVal, curr) => {
    return prevVal * curr;
  }, 1);
  console.log(`LCM: ${LCM}`)


  let rotations = 0;
  while (rotations < 10) {
    if (allTimesAreValid(arrOfTimes, busRoutes, busRoutesNoX)) {
      break;
    }
    let min = arrOfTimes[0];
    let minIndex = 0;
    for (let i = 1; i < arrOfTimes.length; i++) {
      if (parseInt(arrOfTimes[i]) < min) {
        min = arrOfTimes[i];
        minIndex = i;
      }
    }
    arrOfTimes[minIndex] = shittyLCM + busRoutesNoX[minIndex] ;
    rotations++;
  }

  let min = arrOfTimes[0];
  for (let i = 0; i < arrOfTimes; i++) {
    if (arrOfTimes[i] < min) {
      min = arrOfTimes[i];
    }
  }

  console.log(min);
}

function allTimesAreValid(arrOfTimes, busRoutes, busRoutesNoX) {
  let t = arrOfTimes[0];
  for ( let i = 1; i < busRoutes.length; i++ ) {
    if (busRoutes[i] == 'x') {
       continue;
    }
    original = parseInt(busRoutes[i])
    arrIndex = busRoutesNoX.indexOf(original)
    if (t + i != arrOfTimes[i]) {
      return false;
    }
  }
  return true;
}


