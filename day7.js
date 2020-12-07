let input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

function getGoldBagOptions() {
  let rules = input.split('\n');
  const ruleMap = new Map();
  const originalColorsOfBags = [];
  rules.forEach(rule => {
    // split the line to make it useable?
    let [bagColor, containingOptions] = rule.split('contain');
    bagColor = bagColor.trim();
    ruleMap.set(bagColor, []);
    originalColorsOfBags.push(bagColor)
    containingOptions = containingOptions.trim();
    optionsArray = containingOptions.split(',');
    optionsArray.forEach(option => {
      // CLean up data
      option = option.trim();
      // console.log(`option: ${option}`);
      // split the line to make it useable?
      // drop the number, who gives a shit
      // console.log(`option: ${option}`);
      let innerBagArr = option.match(/(?:\d+ )([a-z ]+)(?:\.?)/);
      if (!innerBagArr || !innerBagArr.length) {
        // "No other bags" already have an empty  arr stored, so gg
        console.log('something bad happened: ' + option);
      } else {
        // console.log(`innerBagArr: ${innerBagArr}`);
        bagArr = ruleMap.get(bagColor);
        // Drop the full line match, only get match group I care about.
        // LOL fuck the letter s
        let newBag = innerBagArr[1];
        if (newBag[newBag.length - 1] != 's') {
          newBag = newBag + 's';
        }
        bagArr.push(newBag)
      }
    });
  });
  console.log(ruleMap);

  let solution = 0;
  // OK FINALLY lets figure out the number of options
  originalColorsOfBags.forEach((startingColor) => {
    // console.log(`FOLLOWING RECURSIVE PATH FOR ${startingColor}`);
    const result = getAllOptions(startingColor, ruleMap, originalColorsOfBags);
    // console.log(`FINISHED recursing: result}`);
    if (result == '1') {
      solution++;
    }
  });
  console.log(`total options: ${solution}`);
}

function getAllOptions(startingColor, ruleMap, originalColorsOfBags) {
  if (startingColor == 'shiny gold bags') {
    return 0;
  }
   let possibilities = ruleMap.get(startingColor);
   // console.log(`startingColor: ${startingColor} possibilities: ${possibilities}`)
   if (!possibilities || !possibilities.length) {
     // console.log(`returning 0: ${possibilities}`);
     return 0;
   } else {
     // explore the rest
     for (let i = 0; i < possibilities.length; i++ ) {
      let possible = possibilities[i];
      if (possible == 'shiny gold bags') {
         // console.log(`found it`)
         // possible, bail;
         return 1;
       } else {
          let recursedAnswer =  getAllOptions(possible, ruleMap, originalColorsOfBags);
         // console.log(`recursed answer: ${recursedAnswer}`);
         if (recursedAnswer == 1) {
           return 1;
         } else {
           continue;
         }
       }
     }
   }
}

function countTotalBags() {
  let rules = input.split('\n');
  const ruleMap = new Map();
  const originalColorsOfBags = [];
  rules.forEach(rule => {
    // split the line to make it useable?
    let [bagColor, containingOptions] = rule.split('contain');
    bagColor = bagColor.trim();
    ruleMap.set(bagColor, []);
    originalColorsOfBags.push(bagColor)
    containingOptions = containingOptions.trim();
    optionsArray = containingOptions.split(',');
    optionsArray.forEach(option => {
      // CLean up data
      option = option.trim();
      // console.log(`option: ${option}`);
      // split the line to make it useable?
      // drop the number, who gives a shit
      // console.log(`option: ${option}`);
      let innerBagArr = option.match(/(\d+ )([a-z ]+)(?:\.?)/);
      if (!innerBagArr || !innerBagArr.length) {
        // "No other bags" already have an empty  arr stored, so gg
        console.log('something bad happened: ' + option);
      } else {
        // console.log(`innerBagArr: ${innerBagArr}`);
        bagArr = ruleMap.get(bagColor);
        // Drop the full line match, only get match group I care about.
        // LOL fuck the letter s
        let bagCount = innerBagArr[1];
        let newBag = innerBagArr[2];
        if (newBag[newBag.length - 1] != 's') {
          newBag = newBag + 's';
        }
        bagArr.push({color: newBag, count: parseInt(bagCount)});
      }
    });
  });
  console.log(ruleMap);

  const result = getAllOptions2('shiny gold bags', ruleMap, 1);
  console.log(`total options: ${result}`);
}

function getAllOptions2(startingColor, ruleMap, currentRunningTotal) {
  console.log(`startingColor: ${startingColor}`)
   let possibilities = ruleMap.get(startingColor);
   // console.log(`startingColor: ${startingColor} possibilities: ${possibilities}`)
   if (!possibilities || !possibilities.length) {
     console.log('finished recursing: ' + currentRunningTotal);
     return currentRunningTotal;
   } else {
     // explore the rest
     console.log('iterating through possibilities');
     let total = 0;
     for (let i = 0; i < possibilities.length; i++ ) {
      let possible = possibilities[i];
      console.log(`possible color: ${possible.color}`);
      console.log(`possible count: ${possible.count}`);
      let recursedAnswer =  getAllOptions2(possible.color, ruleMap, total);
      console.log(`recursedAnswer: ${recursedAnswer}`);
      console.log(`new additions: ` + (possible.count * recursedAnswer))
      total += possible.count * recursedAnswer;
     }
   }
}
