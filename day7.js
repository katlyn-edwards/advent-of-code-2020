let input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const rules = input.split('\n');

function getBagRuleMap() {
  const ruleMap = new Map();
  rules.forEach(rule => {
    let [bagColor, containingOptions] = rule.split('contain');
    bagColor = bagColor.trim();
    ruleMap.set(bagColor, []);
    containingOptions = containingOptions.trim();
    optionsArray = containingOptions.split(',');
    optionsArray.forEach(option => {
      option = option.trim();
      let innerBagArr = option.match(/(\d+ )([a-z ]+)(?:\.?)/);
      if (!innerBagArr || !innerBagArr.length) {
        // no other bags
        // empty array is already set.
      } else {
        bagArr = ruleMap.get(bagColor);
        // Drop the full line match, only get match group I care about.
        // Lots of drama with the letter 's'
        let bagCount = innerBagArr[1];
        let newBag = innerBagArr[2];
        if (newBag[newBag.length - 1] != 's') {
          newBag = newBag + 's';
        }
        bagArr.push({color: newBag, count: parseInt(bagCount)});
      }
    });
  });
  return ruleMap;
}

function part1() {
  const ruleMap = getBagRuleMap();
  const originalColorsOfBags = Array.from(ruleMap.keys());
  // Figure out the number of options
  let solution = originalColorsOfBags.reduce((accumulator, color) => {
    const result = getAllOptions(color, ruleMap, originalColorsOfBags);
    if (result == '1') {
      return accumulator + 1;
    }
    return accumulator
  }, 0);
  console.log(`total options: ${solution}`);
  return solution;
}

function getAllOptions(startingColor, ruleMap, originalColorsOfBags) {
  if (startingColor == 'shiny gold bags') {
    return 0;
  }
  let possibilities = ruleMap.get(startingColor);
  if (!possibilities || !possibilities.length) {
    return 0;
  } else {
    // explore the rest
    for (let i = 0; i < possibilities.length; i++ ) {
      let possibleOption = possibilities[i];
      possibleColor = possibleOption.color;
      if (possibleColor == 'shiny gold bags') {
         // It's totally possible!
         return 1;
      } else {
        let recursedAnswer =  getAllOptions(possibleColor, ruleMap, originalColorsOfBags);
        if (recursedAnswer == 1) {
          return 1;
        } else {
          continue;
        }
      }
    }
  }
}

function part2() {
  const ruleMap = getBagRuleMap();
  const result = getAllOptions2('shiny gold bags', ruleMap, 1);
  console.log(`total options: ${result}`);
}

function getAllOptions2(startingColor, ruleMap, multiplier) {
   let possibilities = ruleMap.get(startingColor);
   if (!possibilities || !possibilities.length) {
     return 0;
   }
   let total = 0;
   for (let i = 0; i < possibilities.length; i++ ) {
    let possible = possibilities[i];
    let recursedAnswer =  getAllOptions2(possible.color, ruleMap, possible.count * multiplier);
    total += (possible.count * multiplier) + recursedAnswer;
   }
   return total;
}
