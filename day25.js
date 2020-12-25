let input = `3469259
13170438`;

let inputArr = input.split(`\n`);

let cardPublicKey = parseInt(inputArr[0]);
let doorPublicKey = parseInt(inputArr[1]);

let subjectNum = 7;
let result = 1;

let loopSize = 0;
// handshake
while (result != cardPublicKey) {
  result = subjectNum * result;
  result = result % 20201227;
  loopSize++;
}

console.log(`card loop size: ${loopSize}`);

let encryptionKey = 1;
let newSubjectNum = doorPublicKey;
console.log(`door public key: ${doorPublicKey}`);
for ( let i = 0; i < loopSize; i++) {
  encryptionKey = newSubjectNum * encryptionKey;
  encryptionKey = encryptionKey % 20201227;
}
console.log(`encryption key: ${encryptionKey}`);
