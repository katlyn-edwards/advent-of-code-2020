// For some reason, expanding the string through the
// rules did work for part1, but I coudln't get it for part2.
function part1Try2() {
  return inputToVerify.reduce((accum, inputStr) => {
    let result = verifyMatchesRules(inputStr, rulesMap, 0);
    if (result.valid && !result.str.length) {
      return accum + 1;
    }
    return accum;
  }, 0);
}

function verifyMatchesRules(inputStr, rulesMap, ruleNum) {
  if (inputStr == '') {
    return {valid: true, str: ''};
  }
  let subRuleObj = rulesMap.get(ruleNum);
  let newStrIndex;
  switch (subRuleObj.type) {
    case 'or':
      // left
      let leftAResults = verifyMatchesRules(inputStr, rulesMap, subRuleObj.left1);
      if (leftAResults.valid) {
        let leftBResults = {valid: true, str: leftAResults.str};
        if (subRuleObj.left2) {
          leftBResults = verifyMatchesRules(leftAResults.str, rulesMap, subRuleObj.left2);
        }
        if (leftBResults.valid) {
          return {valid: true, str: leftBResults.str};
        }
      }

      // right
      let rightAResults = verifyMatchesRules(inputStr, rulesMap, subRuleObj.right1);
      if (rightAResults.valid) {
        let rightBResults = {valid: true, str: rightAResults.str};
        if (subRuleObj.right2) {
          rightBResults = verifyMatchesRules(rightAResults.str, rulesMap, subRuleObj.right2);
        }
        if (rightBResults.valid) {
          return {valid: true, str: rightBResults.str};
        }
      }
      return {valid: false, str: inputStr};

    case 'char':
      let isValid = inputStr.charAt(0) == subRuleObj.char;
      return {valid: isValid, str: isValid ? inputStr.substring(1) : inputStr};

    case 'run':
      let currentStr = inputStr;
      for (let i = 0; i < subRuleObj.arr.length; i++) {
        let ruleToFollow = subRuleObj.arr[i];
        let ruleResults = verifyMatchesRules(currentStr, rulesMap, ruleToFollow);
        if (!ruleResults.valid) {
          return {valid: false, str: inputStr};
        }
        currentStr = ruleResults.str;
      }
      return {valid: true, str: currentStr};

     default:
       console.log("OH NO: " + subRuleObj.type);
       return {valid: false, str: inputStr};
  }
}


function part2() {
  rulesMap.set(8, {type: 'or', left1: 42, right1: 42, right2: 8});
  rulesMap.set(11, {type: 'or', left1: 42, left2: 31, right1: 42, right2: 11, right3: 31});
  return inputToVerify.reduce((accum, inputStr) => {
    let result = verifyMatchesRulesForPart2(inputStr, rulesMap, 0);
    if (result.valid && !result.str.length) {
      return accum + 1;
    }
    return accum;
  }, 0);
}


function verifyMatchesRulesForPart2(inputStr, rulesMap, ruleNum) {
  if (inputStr == '') {
    return {valid: true, str: ''};
  }
  let subRuleObj = rulesMap.get(ruleNum);
  let newStrIndex;
  switch (subRuleObj.type) {
    case 'or':
      // Special case loops.
      if (ruleNum == 8) {
        let currLeftAResults = verifyMatchesRulesForPart2(inputStr, rulesMap, subRuleObj.left1);
        let prevLeftAResults = currLeftAResults;
        let maxDepth = inputStr.length;
        let curDepth = 0;
        while (currLeftAResults.valid && curDepth < maxDepth) {
          curDepth++;
          prevLeftAResults = currLeftAResults;
          // go until it's invalid. -- greedy
          currLeftAResults = verifyMatchesRulesForPart2(currLeftAResults.str, rulesMap, subRuleObj.left1);
        }
        // Prev is now the last valid greedy, return that.
        return {valid: prevLeftAResults.valid, str: prevLeftAResults.str};
      }

      if (ruleNum == 11) {
        let leftAResults = verifyMatchesRulesForPart2(inputStr, rulesMap, subRuleObj.left1);
        if (leftAResults.valid) {
          let leftBResults = verifyMatchesRulesForPart2(leftAResults.str, rulesMap, subRuleObj.left2);
          if (leftBResults.valid) {
            let currA = leftAResults;
            let currB = leftBResults;
            let prevA = currA;
            let prevB = currB;
            let maxDepth = inputStr.length;
            let curDepth = 0;
            // Let's go until it's invalid. -- greedy
            while (currA.valid && currB.valid && curDepth < maxDepth) {
              curDepth++;
              prevA = currA;
              prevB = currB
              currA = verifyMatchesRulesForPart2(currB.str, rulesMap, subRuleObj.left1);
              currB = verifyMatchesRulesForPart2(currA.str, rulesMap, subRuleObj.left2);
            }
            // Prev is now the last valid greedy, return that
            return {valid: prevB.valid, str: prevB.str};
          }
        }
        // one of the sides aren't valid initially
        return {valid: false, str: inputStr};
      }

      // left
      let leftAResults = verifyMatchesRulesForPart2(inputStr, rulesMap, subRuleObj.left1);
      if (leftAResults.valid) {
        let leftBResults = {valid: true, str: leftAResults.str};
        if (subRuleObj.left2) {
          leftBResults = verifyMatchesRulesForPart2(leftAResults.str, rulesMap, subRuleObj.left2);
        }
        if (leftBResults.valid) {
          return {valid: true, str: leftBResults.str};
        }
      }

      // right
      let rightAResults = verifyMatchesRulesForPart2(inputStr, rulesMap, subRuleObj.right1);
      if (rightAResults.valid) {
        let rightBResults = {valid: true, str: rightAResults.str};
        if (subRuleObj.right2) {
          rightBResults = verifyMatchesRulesForPart2(rightAResults.str, rulesMap, subRuleObj.right2);
        }
        if (rightBResults.valid) {
          let rightCResults = {valid: true, str: rightBResults.str};
          if (subRuleObj.right3) {
            rightCResults = verifyMatchesRulesForPart2(rightBResults.str, rulesMap, subRuleObj.right3);
          }
          if (rightCResults.valid) {
            return {valid: true, str: rightCResults.str};
          }
        }
      }
      return {valid: false, str: inputStr};

    case 'char':
      let isValid = inputStr.charAt(0) == subRuleObj.char;
      return {valid: isValid, str: isValid ? inputStr.substring(1) : inputStr};

    case 'run':
      let currentStr = inputStr;
      for (let i = 0; i < subRuleObj.arr.length; i++) {
        let ruleToFollow = subRuleObj.arr[i];
        let ruleResults = verifyMatchesRulesForPart2(currentStr, rulesMap, ruleToFollow);
        if (!ruleResults.valid) {
          return {valid: false, str: inputStr};
        }
        currentStr = ruleResults.str;
      }
      return {valid: true, str: currentStr};

     default:
       console.log("OH NO: " + subRuleObj.type + "; ruleNum: " + ruleNum);
       return {valid: false, str: inputStr};
  }
}
