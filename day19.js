let input = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

let inputArr = input.split(`\n\n`);
let rules = inputArr[0];
let inputStr = inputArr[1];
let inputToVerify = inputStr.split(`\n`);
let rulesArr = rules.split(`\n`);

let rulesMap = getRulesMap(rulesArr);
console.log(rulesMap);

// Try 2, let's build up a regex lmao
let regexString = buildString(rulesMap, 0)
console.log(regexString);

let complexRegexString = '^' + regexString + '$';

let re = new RegExp(complexRegexString);

inputToVerify.reduce((accum, inputStr) => {
  // let matchResultObj = verifyMatchesRules(inputStr, rulesMap, 0, 0);

  // if (!matchResultObj.valid || matchResultObj.index != inputStr.length) {
  //   console.log(`${inputStr}`);
  // }
  // if (matchResultObj.valid && matchResultObj.index == inputStr.length) {
  //   return accum + 1;
  // }
  // return accum;
  let didMatch = inputStr.match(re);
  if (didMatch && didMatch[0] == inputStr) {
    return accum + 1;
  }
  return accum;
}, 0);

function buildString(rulesMap, ruleNum) {
  let subRuleObj = rulesMap.get(ruleNum);
  if (subRuleObj.type == 'char') {
    // Done recursing!!
    return subRuleObj.char;
  }

  if (subRuleObj.type == 'run') {
    let newString = '('
    for (let i = 0; i < subRuleObj.arr.length; i++) {
      let ruleToFollow = subRuleObj.arr[i];
      newString += buildString(rulesMap, ruleToFollow);
    }
    return newString + ')';
  }

  if (subRuleObj.type == 'or') {
    let newString = '(';
    // left
    newString += buildString(rulesMap, subRuleObj.left1);
    if (subRuleObj.left2) {
      newString += buildString(rulesMap, subRuleObj.left2);
    }
    newString += '|'
    // right
    newString += buildString(rulesMap, subRuleObj.right1);
    if (subRuleObj.right2) {
      newString += buildString(rulesMap, subRuleObj.right2);
    }
    newString += ')'
    return newString;
  }
}

function verifyMatchesRules(inputStr, rulesMap, ruleNum, strIndex) {
  let printPadding = ''
  for (let i = 0; i < strIndex; i++) {
    printPadding += '  ';
  }
  console.log(`${printPadding}looking at rule #${ruleNum}`);
  console.log(`${printPadding}str: ${inputStr.split('').splice(strIndex).join('')}`);
  if (strIndex > inputStr.length) {
    return true;
  }
  let subRuleObj = rulesMap.get(ruleNum);
  let newStrIndex;
  switch (subRuleObj.type) {
    case 'or':
      // left
      let leftAResults = verifyMatchesRules(inputStr, rulesMap, subRuleObj.left1, strIndex);
      if (leftAResults.valid) {
        let leftB = {valid: true, index: leftAResults.index};
        if (subRuleObj.left2) {
          leftBResults = verifyMatchesRules(inputStr, rulesMap, subRuleObj.left2, leftAResults.index);
        }
        if (leftBResults.valid) {
          return {valid: true, index: leftBResults.index};
        }
      }

      // right
      let rightAResults = verifyMatchesRules(inputStr, rulesMap, subRuleObj.right1, strIndex);
      if (rightAResults.valid) {
        let rightBResults = {valid: true, index: rightAResults.index};
        if (subRuleObj.right2) {
          rightBResults = verifyMatchesRules(inputStr, rulesMap, subRuleObj.right2, rightAResults.index);
        }
        if (rightBResults.valid) {
          return {valid: true, index: rightBResults.index};
        }
      }
      console.log(`${printPadding}invalid or`)
      return {valid: false, index: strIndex};

    case 'char':
      let isValid = inputStr.charAt(strIndex) == subRuleObj.char;
      if (!isValid) {
        console.log(`${printPadding}invalid char`)
      }
      return {valid: isValid, index: isValid ? strIndex + 1 : strIndex};

    case 'run':
      let newStrIndex = strIndex;
      for (let i = 0; i < subRuleObj.arr.length; i++) {
        let ruleToFollow = subRuleObj.arr[i];
        let ruleResults = verifyMatchesRules(inputStr, rulesMap, ruleToFollow, newStrIndex);
        if (!ruleResults.valid) {
          console.log(`${printPadding}invalid part of run: ${i}`)
          return {valid: false, index: strIndex};
        }
        newStrIndex = ruleResults.index;
      }
      return {valid: true, index: newStrIndex};

     default:
       console.log("OH NO: " + subRuleObj.type);
       return {valid: false, index: strIndex};
  }
}

function getRulesMap(rulesArr) {
  let result = new Map();
  rulesArr.forEach(ruleLine => {
    let ruleArr = ruleLine.split(':');
    let num = parseInt(ruleArr[0]);
    let subRule = ruleArr[1].trim();

    let subRuleObj = {};
    if (subRule.indexOf('|') != -1) {
      let subRuleArr = subRule.split('|');
      let left = subRuleArr[0].trim();
      let right = subRuleArr[1].trim();
      left.trim();
      right.trim();
      let leftArr = left.split(' ');
      let left1 = leftArr[0];
      let left2 = leftArr[1];

      let rightArr = right.split(' ');
      let right1 = rightArr[0];
      let right2 = rightArr[1];

      left1 = parseInt(left1);
      left2 = parseInt(left2);
      right1 = parseInt(right1);
      right2 = parseInt(right2);
      subRuleObj = {type: 'or', left1, left2, right1, right2}
    } else if (subRule.indexOf('"') != -1 ) {
      // always one character
      let quoteIndex = subRule.indexOf('"');
      let rule = subRule.split('').splice(quoteIndex + 1, 1).join('');
      subRuleObj = {type: 'char', char: rule};
    } else {
      // single string of nums
      let subRuleArr = subRule.split(' ');
      subRuleArr = subRuleArr.map(el => parseInt(el));
      subRuleObj = {type: 'run', arr: subRuleArr};
    }

    result.set(num, subRuleObj);
  });
  return result;
}
