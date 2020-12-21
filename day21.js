let input = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;
let inputArr = input.split(`\n`);

function part1() {
  let mapOfAllergenGroupToIngredients = new Map();
  let singleAllergens = new Set();
  let allIngredients = parseInput(inputArr, mapOfAllergenGroupToIngredients, singleAllergens);
  singleAllergens = Array.from(singleAllergens.values());
  singleAllergens.sort();
  // Find overlapping groups
  let finalMapping = new Map();
  let usedIngredients = new Set();

  while (finalMapping.size != singleAllergens.length) {
    // iterate through all known allergens, and try to reduce
    for (let i = 0; i < singleAllergens.length; i++) {
      let allergen = singleAllergens[i];
      let possibleIngredientSets = [];
      mapOfAllergenGroupToIngredients.forEach((val, key) => {
        let keyParts = key.split(',');
        if (keyParts.includes(allergen)) {
          console.log(`found in ${key}`)
          possibleIngredientSets.push(val);
        }
      });
      // find the intersection between all of these
      let possible = possibleIngredientSets[0];
      for (let i = 0; i < possibleIngredientSets.length; i++) {
        possible = new Set([...possible].filter(ingredient => possibleIngredientSets[i].has(ingredient)));
      }
      // Remove any used ingredients
      possible = new Set([...possible].filter(x => !usedIngredients.has(x)));
      if (possible.size == 1) {
        let ingredient = Array.from(possible.values())[0];
        finalMapping.set(ingredient, allergen);
        usedIngredients.add(ingredient);
      }
    }
  }

  console.log("finalMapping");
  printMap(finalMapping);

  // OK cool, so uh let's find the non-allergens and count them.
  let resultSize = 0;
  allIngredients.forEach((ingredient) => {
    if (!usedIngredients.has(ingredient)) {
      resultSize++;
    }
  });

  console.log(resultSize);
  return finalMapping;
}

function part2() {
  let mappingOfIngredientToAllergen = part1();

  let inverseMap = new Map();
  mappingOfIngredientToAllergen.forEach((val, key) => {
    inverseMap.set(val, key)
  });

  let sortedAllergens = Array.from(inverseMap.keys()).sort();
  let dangerousIngredientList = sortedAllergens.map((allergen) => {
    return inverseMap.get(allergen);
  }).join(',');

  console.log(dangerousIngredientList);
}

function parseInput(inputArr, mapOfAllergenGroupToIngredients, singleAllergens) {
  let allIngredients = [];
  inputArr.forEach(line => {
    let lineParts = line.split(' (contains ');
    let ingredientsString = lineParts[0];
    let allergenGroupString = lineParts[1];
    // Drop trailing ')'
    allergenGroupString = allergenGroupString.substring(0, allergenGroupString.length - 1);

    let allergenArr = [allergenGroupString];
    if (allergenGroupString.indexOf(',')) {
      allergenArr = allergenGroupString.split(', ');
    }

    allergenArr.forEach(allergen => {
      singleAllergens.add(allergen);
    });

    let ingredientsArr = ingredientsString.split(' ');
    allIngredients = allIngredients.concat(ingredientsArr);
    if (mapOfAllergenGroupToIngredients.has('' + allergenArr)) {
      // find intersection because all same allergen
      let oldSet = mapOfAllergenGroupToIngredients.get('' + allergenArr);
      let intersection = new Set(ingredientsArr.filter(ingredient => oldSet.has(ingredient)));
      mapOfAllergenGroupToIngredients.set('' + allergenArr, intersection);
    } else {
      mapOfAllergenGroupToIngredients.set('' + allergenArr, new Set(ingredientsArr));
    }
  });
  return allIngredients;
}

function printMap(m) {
  m.forEach((val, key) => {
    console.log(`key: ${key}`);
    console.log(val);
  });
  console.log('');
  console.log('');
}

part2();
