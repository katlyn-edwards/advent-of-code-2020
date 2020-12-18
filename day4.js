let input =
`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const passports = input.split('\n\n');

function part1() {
  const validCount = passports.reduce((accumulator, passportLine, index) => {
     passportArray = passportLine.split(/\s/);
     const foundAllFields = requiredFields.every((fieldName) => {
        for (let i = 0; i < passportArray.length; i++) {
          const [key, val] = passportArray[i].split(':');
          if (key == fieldName) {
            return true;
          }
        }
        return false;
     });
     return foundAllFields ? accumulator + 1  : accumulator;
  }, 0);
  return validCount;
}

function part2() {
  const validCount = passports.reduce((accumulator, passportLine, index) => {
     const passportArray = passportLine.split(/\s/);
     const foundAllFields = requiredFields.every((fieldName) => {
        for (let i = 0; i < passportArray.length; i++) {
          let [key, val] = passportArray[i].split(':');
          val = val.trim();
          if (key == fieldName) {
            switch (key) {
              case 'byr':
                return val  >= 1920 && val <= 2002;
              case 'iyr':
                return val  >= 2010 && val <= 2020;
              case 'eyr':
                return val  >= 2020 && val <= 2030;
               case 'hgt':
                 const units = val.substring(val.length - 2, val.length);
                 const height = val.substring(0, val.length -2);
                 if (units == 'cm') {
                   return height >= 150 && height <= 193;
                 } else if (units == 'in') {
                   return height >= 59 && height <= 76;
                 } else {
                   return false;
                 }
               case 'hcl':
                 return new RegExp(/^#[0-9a-f]{6}$/).test(val);
               case 'ecl':
                 return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val);
               case 'pid':
                 return new RegExp(/^\d{9}$/).test(val);
               case 'cid':
                 return true;
               default:
                 return false;
            }
          }
        }
        return false;
     });
     return foundAllFields ? accumulator + 1  : accumulator;
  }, 0);
  return validCount;
}
