let input = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;
let inputArr = input.split(`\n\n`);

function getRules(rules) {
  let rulesStrings = [];
  let rulesArr = rules.split(`\n`);
  let finalRulesArr = [];
  rulesArr.map((line) => {
    let rulePieces = line.split(':');
    range = rulePieces[1];
    range = range.trim();
    chunks = range.split(' ')
    rulesStrings.push(rulePieces[0]);
    let first = chunks[0];
    let second = chunks[2];
    let firstArr = first.split('-');
    firstArr = firstArr.map(el => parseInt(el));
    let secondArr = second.split('-');
    secondArr = secondArr.map(el => parseInt(el));

    finalRulesArr.push({r1: firstArr, r2: secondArr});
  });

  return {names: rulesStrings, parsedArr: finalRulesArr};
}

function part1() {
  let rules = inputArr[0];
  let myTicket = inputArr[1];
  let nearbyTickets = inputArr[2];

  let nearbyTicketArr = nearbyTickets.split(`\n`);
  nearbyTicketArr.shift(); // remove "nearby tickets" header

  let {names, parsedArr} = getRules(rules);

  let sum = 0;
  nearbyTicketArr.forEach(ticket => {
    let vals = ticket.split(',');
    vals = vals.map(el => parseInt(el));
    let invalid = getValidation(vals, parsedArr);
    sum += invalid;
  });

  console.log(sum)
}

function part2() {
  let rules = inputArr[0];
  let myTicket = inputArr[1];
  let nearbyTickets = inputArr[2];

  let nearbyTicketArr = nearbyTickets.split(`\n`);
  nearbyTicketArr.shift(); // remove "nearby tickets" header

  let {names, parsedArr} = getRules(rules);

  filteredTickets = nearbyTicketArr.filter(ticket => {
    let vals = ticket.split(',');
    vals = vals.map(el => parseInt(el));
    let invalid = getValidation(vals, parsedArr);
    return invalid == 0;
  });
  filteredTickets = filteredTickets.map(ticket => {
    vals = ticket.split(',');
    vals = vals.map(el => parseInt(el));
    return vals;
  });

  // Determine rule positions
  let ruleToValidPos = getRulePositions(filteredTickets, parsedArr);
  finalRuleToPosition = reduce(ruleToValidPos, 0, {});

  myTicketNumber = myTicket.split('\n')[1]
  myTicketArr = myTicketNumber.split(',');
  myTicketArr = myTicketArr.map(el => parseInt(el));
  names = names.map((el, idx) => {
    return {'idx': idx, 'str': el };
  });
  names = names.filter(tup => tup.str.indexOf("departure") != -1);

  let answer = 1;
  names.forEach(tup => {
    ruleNo = tup.idx;
    pos = finalRuleToPosition[ruleNo];
    val = myTicketArr[pos]
    answer *= val;
  });
  console.log("answer")
  console.log(answer)
}

function reduce(rulesToValidPos) {
  let result = {};
  for (let j = 0; j < rulesToValidPos.length; j++) {
    let position;
    let startIndex;
    for (let i = 0; i < rulesToValidPos.length; i++) {
      if (rulesToValidPos[i].length == 1) {
        console.log("found start");
        console.log(rulesToValidPos[i])
        position = rulesToValidPos[i][0];
        startIndex = i;
      }
    }
    if (startIndex == undefined) {
      continue
      // idk what happened but my data is bad I guess
    }
    result[startIndex] = position;
    // remove from all
    rulesToValidPos.forEach(rule => {
      index = rule.indexOf(position)
      if (index != -1) {
        rule.splice(index, 1);
      }
    })
  }
  console.log("result");
  console.log(result);
  return result;
}

function getRulePositions(ticketsArr, rules) {
  let totalTickets = ticketsArr.map(ticket => {
    let ticketInfo = {};
    for (let j = 0; j < ticket.length; j++) {
      let val = ticket[j];
      let validRules = [];
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (isValidForRule(rule, val)) {
          validRules.push(i);
        }
      }
      ticketInfo["position" + j] = validRules
    }
    return ticketInfo;
  });

  let resultRulesPositons = [];
  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    totalNumPositions = rules.length; // One to one mapping
    resultRulesPositons[i] = [];
    for (let j = 0; j < totalNumPositions; j++) {
      // it has to be valid in *all tickets*
      let position = j;
      let valid = true;
      for (let k = 0; k < ticketsArr.length; k++) {
        ticket = ticketsArr[k];
        val = ticket[position];
        isValid = isValidForRule(rule, val);
        if (!isValid) {
          valid = false;
          break;
        }
      }
      if (valid) {
        resultRulesPositons[i].push(position);
      }
    }
    if (resultRulesPositons[i].length == 0) {
      console.log("WTF")
      return;
    }
  }
  console.log("result rules positions")
  console.log(resultRulesPositons);
  return resultRulesPositons;
}

function isValidForRule(rule, val) {
  return (val >= rule.r1[0] && val <= rule.r1[1]) ||
          (val >= rule.r2[0] && val <= rule.r2[1]);
}

function getValidation(vals, rules) {
  for (let i = 0; i < vals.length; i++) {
    // Assume that we won't re-use rules I guess?
    // and any invalid number is enough to disqualify.
    let val = vals[i];
    let valid = false;
    for (let j = 0; j < rules.length; j++) {
      let rule = rules[j];
      if (isValidForRule(rule, val)) {
        valid = true;
        break;
      }
    }
    if (!valid) {
      return val;
    }
  }
  return 0;
}
