let input = [1650,
1174,
1156,
1874,
1958,
1918,
1980,
1588,
1863,
1656,
1843,
1738,
2001,
1883,
1941,
1602,
1881,
1927,
1284,
1474,
1942,
1992,
1925,
1990,
1831,
1907,
1914,
1815,
1921,
1589,
1224,
1148,
1223,
935,
1726,
1828,
1838,
1611,
1960,
1668,
1744,
1566,
1902,
1203,
1975,
1225,
2000,
1678,
1950,
572,
1812,
1568,
1484,
1767,
1509,
1658,
1127,
1870,
1098,
1294,
1310,
1483,
1865,
1967,
1856,
1963,
1929,
1119,
132,
1969,
1094,
1523,
1701,
1896,
1631,
1956,
1910,
1672,
1232,
1285,
1761,
1649,
1931,
1959,
1191,
1846,
1908,
1976,
1500,
1940,
1924,
1521,
1989,
1635,
1102,
1114,
1948,
2007,
1964,
1926,
1590,
1900,
1690,
1880,
1596,
1395,
1373,
1937,
1833,
1845,
1949,
1128,
1218,
1928,
1912,
1893,
1869,
960,
1813,
1645,
1490,
1318,
1934,
1259,
2005,
1522,
1270,
1089,
1674,
1997,
1112,
1954,
1769,
1829,
1814,
1922,
1904,
1894,
1595,
1103,
237,
1943,
1364,
1906,
1971,
1998,
1461,
1606,
1911,
1545,
1952,
1917,
1582,
1994,
1946,
1935,
1844,
1938,
1633,
2004,
1132,
1530,
1915,
1982,
1871,
1852,
1613,
1476,
1216,
1834,
1939,
409,
1895,
1120,
1194,
1135,
1899,
1901,
1439,
485,
1855,
1136,
200,
1887,
250,
1930,
1506,
1945,
1988,
1170,
1575,
1872,
1261,
1137,
1978,
1537,
1897,
1837,
1753,
1913];

function twoSum2020() {
  input.forEach((el, index) => {
    input.forEach((el2, index2) => {
      if (index == index2) {
        // do nothing; can't re-use numbers.
      } else if (el + el2 == 2020) {
        console.log(el * el2);
        return el * el2;
      }
    });
  });
}

function threeSum2020() {
  input.forEach((el, index) => {
    input.forEach((el2, index2) => {
      if (index2 == index) {
        // do nothing; can't re-use numbers.
      } else {
        input.forEach((el3, index3) => {
          if (index3 == index2 || index3 == index) {
            // do nothing; can't re-use numbers.
          } else if (el + el2 + el3 == 2020) {
            console.log(el * el2 * el3);
            return el * el2 * el3;
          }
        });
      }
    });
  });
}
