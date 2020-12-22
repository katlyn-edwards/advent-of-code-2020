let input = `Player 1:
43
19

Player 2:
2
29
14`;
let inputArr = input.split('\n\n');

let player1 = inputArr[0].split(`\n`);
let player2 = inputArr[1].split(`\n`);

// drop titles
player1.shift();
player2.shift();

// Convert to ints
player1 = player1.map((el) => parseInt(el));
player2 = player2.map((el) => parseInt(el));

function part1() {
  playGame(player1, player2);

  console.log("game finished")
  console.log(player1);
  console.log(player2);

  let chosenArr = player1.length ? player1 : player2;
  let total = 0;
  for (let i = 0; i < chosenArr.length; i++) {
    total += chosenArr[i] * (chosenArr.length - i);
  }
  console.log(`total: ${total}`);
  return total;
}

function playGame(player1, player2) {
  let round = 0;
  while (player1.length != 0 && player2.length != 0) {
    round++;
    let p1Card = player1.shift();
    let p2Card = player2.shift();
    if (p1Card > p2Card) {
      // Move to p1 stack
      player1.push(p1Card);
      player1.push(p2Card);
    } else {
      // p2Card > p1Card
      player2.push(p2Card);
      player2.push(p1Card);
    }
  }
}

function part2() {
  let seen = new Set();
  let winner = playRecursiveCombat(player1, player2, seen, 1, 1);
  console.log(`winner: ${winner}`);
  console.log(`== Post-game results ==`)
  console.log(`Player 1's deck: ${player1.join(', ')}`)
  console.log(`Player 2's deck: ${player2.join(', ')}`)

  let chosenArr = winner == 'player1' ? player1 : player2;
  let total = 0;
  for (let i = 0; i < chosenArr.length; i++) {
    total += chosenArr[i] * (chosenArr.length - i);
  }
  console.log(`total: ${total}`);
  return total;

}

function playRecursiveCombat(player1, player2, seen, round, game) {
  if (!player1.length) {
    // console.log(`The winner of game ${game} is player 2!`)
    return 'player2';
  }
  if (!player2.length) {
    // console.log(`The winner of game ${game} is player 1!`)
    return 'player1';
  }

  // console.log(`-- Round ${round} (Game ${game}) --`)
  // check to see if we've been here before
  let seenStack = `${player1.join(',')};${player2.join(',')}`;
  if (seen.has(seenStack)) {
    // console.log(`seen round before; im at round ${round} of ${game}`);
    // console.log(`Player 1's deck: ${player1.join(', ')}`);
    // console.log(`Player 2's deck: ${player2.join(', ')}`);
    // console.log(seen)
    return 'player1';
  }

  seen.add(seenStack);

  // console.log(`Player 1's deck: ${player1.join(', ')}`);
  // console.log(`Player 2's deck: ${player2.join(', ')}`);

  let p1Card = player1.shift();
  let p2Card = player2.shift();
  while (player1.length && player2.length && p1Card > player1.length || p2Card > player2.length) {
    // One player doesn't have enough cards, return the higher valued card.

    // console.log(`Player 1 plays: ${p1Card}`);
    // console.log(`Player 2 plays: ${p2Card}`);
    if (p1Card > p2Card) {
      // console.log(`Player1 wins round ${round} of game ${game}\n`);
      player1.push(p1Card);
      player1.push(p2Card);
    } else {
      // console.log(`Player2 wins round ${round} of game ${game}\n`);
      player2.push(p2Card);
      player2.push(p1Card);
    }

    if (!player1.length) {
      return 'player2';
    }
    if (!player2.length) {
      return 'player1';
    }

    round++;
    // console.log(`-- Round ${round} (Game ${game}) --`)
    // console.log(`Player 1's deck: ${player1.join(', ')}`);
    // console.log(`Player 2's deck: ${player2.join(', ')}`);
    p1Card = player1.shift();
    p2Card = player2.shift();

    let seenStack = `${player1.join(',')};${player2.join(',')}`;
    if (seen.has(seenStack)) {
      // console.log(`seen round before; im at round ${round} of ${game}`);
      // console.log(`Player 1's deck: ${player1.join(', ')}`);
      // console.log(`Player 2's deck: ${player2.join(', ')}`);
      // console.log(seen)
      return 'player1';
    }

    seen.add(seenStack);
  }

  // recursive case
  let newPlayer1 = player1.slice(0, p1Card);
  let newPlayer2 = player2.slice(0, p2Card);
  // console.log(`Playing a sub-game to determine the winner...\n`)
  // console.log(`=== Game ${game + 1} ===\n`)
  let winner = playRecursiveCombat(newPlayer1, newPlayer2, new Set(), 1, game + 1);
  // console.log(`..anyway, back to game ${game}.`);
  if (winner == 'player1') {
    player1.push(p1Card);
    player1.push(p2Card);
    // console.log(`Player 1 wins round ${round} of game ${game}`);
  } else {
    player2.push(p2Card);
    player2.push(p1Card);
    // console.log(`Player 2 wins round ${round} of game ${game}`);
  }
  return playRecursiveCombat(player1, player2, seen, round + 1, game);
}

part2();
