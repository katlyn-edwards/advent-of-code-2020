let input = `77
58
25
92
14
154
105
112
147
63
84
109
24
129
49
102
130
128
134
88
95
70
80
4
153
17
145
122
39
117
93
65
3
2
139
101
148
37
27
1
87
64
23
59
42
146
43
151
116
46
115
118
131
94
19
33
12
107
10
7
73
78
53
11
135
79
60
32
141
31
140
98
136
72
38
152
30
74
106
50
13
26
155
67
20
66
91
56
34
125
52
51
18
108
57
81
119
71
144`;


let inputArr = input.split('\n');
inputArr = inputArr.map((el) => parseInt(el));

function part1() {
  console.log(`inputArr: ${inputArr}`)
  let startVoltage = 0;
  let differenceDistributionArr = new Array(4);
  differenceDistributionArr.fill(0, 0, 4);

  let max = Math.max(...inputArr);
  console.log(`max: ${max}`)

  while (startVoltage < max) {
    // console.log(`startVoltage: ${startVoltage}`);
    for (let i = 0; i < 3; i++) {
      // console.log(`looking for: ${startVoltage + i + 1}`)
      let found = inputArr.indexOf(startVoltage + i + 1);
        let difference = inputArr[found] - startVoltage;
      if (found != -1) {
        // console.log(`found next voltage: ${inputArr[found]}`);
        // console.log(`difference: ${difference}`)
        differenceDistributionArr[difference] = differenceDistributionArr[difference] + 1;
        startVoltage = inputArr[found];
        break;
      }
    }
  }

  let finalDiff = (max + 3) - startVoltage;
  differenceDistributionArr[finalDiff] = differenceDistributionArr[finalDiff] + 1;
  console.log(differenceDistributionArr);

  return differenceDistributionArr[1] * differenceDistributionArr[3];
}

// part1();

function part2() {
  console.log(`inputArr: ${inputArr}`)
  inputArr.sort((a, b) => a - b);
  inputArr.unshift(0);
  let startVoltage = 0;
  let max = Math.max(...inputArr);
  console.log(`max: ${max}`)

  console.log(`starting!!`);
  // OK so this doesn't work, the recursive stack gets too big. I have to use
  // dynamic programming. Fuck. Maybe it's the arrays?? IDK
  let result = [1];
  getSuccessfulArrangement2(startVoltage, max, inputArr, result);
  console.log(`done!!`);
  console.log(result[result.length - 1]);
}


function getSuccessfulArrangement2(voltage, max, inputArr, result) {
  for (let i = 1; i < inputArr.length; i++) {
    result[i] = 0;
    for (let j = 1; j <= 3; j++) {
      // check the three previous to get my new total
      // Is it valid?
      if ((i - j) >= 0 && inputArr[i] <= inputArr[i - j] + 3) {
        // voltage jump is legal
        result[i] += result[i - j];
      }
    }
  }
  console.log(`results: ${result}`);
}

part2();
