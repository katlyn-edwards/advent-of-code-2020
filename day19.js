let input = `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`;

let inputArr = input.split(`\n\n`);
let rules = inputArr[0];
let inputStr = inputArr[1];
let inputToVerify = inputStr.split(`\n`);
let rulesArr = rules.split(`\n`);

let maxStringMatchLength = 0;
inputToVerify.forEach(str => {
  if (str.length > maxStringMatchLength) {
    maxStringMatchLength = str.length;
  }
});

let rulesMap = getRulesMap(rulesArr);
console.log(rulesMap);

function part1() {
  // Try 2, let's build up a regex lmao
  let regexString = buildRegexString(rulesMap, 0)
  console.log(regexString);
  let complexRegexString = '^' + regexString + '$';
  let re = new RegExp(complexRegexString);
  return inputToVerify.reduce((accum, inputStr) => {
    let didMatch = inputStr.match(re);
    if (didMatch && didMatch[0] == inputStr) {
      return accum + 1;
    }
    return accum;
  }, 0);
}

function buildRegexString(rulesMap, ruleNum) {
  let subRuleObj = rulesMap.get(ruleNum);
  if (subRuleObj.type == 'char') {
    // Done recursing!!
    return subRuleObj.char;
  }

  if (subRuleObj.type == 'run') {
    let newString = '('
    for (let i = 0; i < subRuleObj.arr.length; i++) {
      let ruleToFollow = subRuleObj.arr[i];
      newString += buildRegexString(rulesMap, ruleToFollow);
    }
    return newString + ')';
  }

  if (subRuleObj.type == 'or') {
    let newString = '(';
    // left
    newString += buildRegexString(rulesMap, subRuleObj.left1);
    if (subRuleObj.left2) {
      newString += buildRegexString(rulesMap, subRuleObj.left2);
    }
    newString += '|'
    // right
    newString += buildRegexString(rulesMap, subRuleObj.right1);
    if (subRuleObj.right2) {
      newString += buildRegexString(rulesMap, subRuleObj.right2);
    }
    newString += ')'
    return newString;
  }
}

function buildRegexString2(rulesMap, ruleNum) {
  let subRuleObj = rulesMap.get(ruleNum);
  if (subRuleObj.type == 'char') {
    // Done recursing!!
    return subRuleObj.char;
  }

  if (subRuleObj.type == 'run') {
    let newString = '('
    for (let i = 0; i < subRuleObj.arr.length; i++) {
      let ruleToFollow = subRuleObj.arr[i];
      newString += buildRegexString2(rulesMap, ruleToFollow);
    }
    return newString + ')';
  }

  if (subRuleObj.type == 'or') {
    let newString = '(';
    if (ruleNum == 8) {
      newString += buildRegexString2(rulesMap, subRuleObj.left1);
      newString += '+)';
      return newString;
    } else if ( ruleNum == 11) {
      // fuck I hate this
      // maybe build up all options recursing down maxStringMatchLength times?
      let innerLeft = ''
      let innerRight = '';
      innerLeft = buildRegexString2(rulesMap, subRuleObj.left1);
      innerRight = buildRegexString2(rulesMap, subRuleObj.left2);

      let middle = ''
      maxStringMatchLength = 10;
      // Literally anything bigger breaks JS's regex parsing soooo.
      for (let i = 1; i < maxStringMatchLength; i++) {
        middle += '(';
        for (let j = 0; j < i; j++) {
          middle += innerLeft;
        }
        for (let j = 0; j < i; j++) {
          middle += innerRight;
        }
        middle += ')|'
      }
      // remove trailing |
      middle = middle.substring(0, middle.length -1);
      return '(' + middle + ')';
    } else {
      // left
      newString += buildRegexString2(rulesMap, subRuleObj.left1);
      if (subRuleObj.left2) {
        newString += buildRegexString2(rulesMap, subRuleObj.left2);
      }
      newString += '|'
      // right
      newString += buildRegexString2(rulesMap, subRuleObj.right1);
      if (subRuleObj.right2) {
        newString += buildRegexString2(rulesMap, subRuleObj.right2);
      }
      newString += ')'
      return newString;
    }
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

function part2() {
  rulesMap.set(8, {type: 'or', left1: 42, right1: 42, right2: 8});
  rulesMap.set(11, {type: 'or', left1: 42, left2: 31, right1: 42, right2: 11, right3: 31});
  // Try 2, let's build up a shitty ass regex lmao
  let regexString = buildRegexString2(rulesMap, 0)
  let complexRegexString = '^' + regexString + '$';
  let re = new RegExp(complexRegexString);
  return inputToVerify.reduce((accum, inputStr) => {
    let didMatch = inputStr.match(re);
    if (didMatch && didMatch[0] == inputStr) {
      return accum + 1;
    }
    return accum;
  }, 0);
}
