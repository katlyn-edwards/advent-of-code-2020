let input = `9,6,0,10,18,2,1`;
let inputArr = input.split(`,`);
inputArr = inputArr.map(el => parseInt(el));

let locationMap = new Map();
for (let i = 0; i < inputArr.length - 1; i++) {
  locationMap.set(inputArr[i], i + 1);
}

console.log(mapToObj(locationMap));
let last = inputArr[inputArr.length - 1];
// console.log(`starting last: ${last}`)
for (let i = inputArr.length; i < 30000000; i++) {
  // console.log(`starting loop`)
  if (locationMap.has(last)) {
    // console.log(`current last; ${last}`)
    let index = locationMap.get(last);
    // console.log(`where I saw the last item: ${index}`);
    // console.log(`i: ${i}`);
    let diff = i - index;
    locationMap.set(last, i);
    last = diff;
    // console.log(`new last: ${last}`);
    // console.log(mapToObj(locationMap));
  } else {
    // First time seeing that number.
    locationMap.set(last, i)
    last = 0;
    // console.log(`new last: ${last}`);
    // console.log(mapToObj(locationMap));
  }

}

console.log(`last: ${last}`);

function mapToObj(map){
  const obj = {}
  for (let [k,v] of map)
    obj[k] = v
  return obj
}
