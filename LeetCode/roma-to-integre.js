/**
 * 罗马数字转整数
 */

function romanToInt(s) {
  const map = new Map();

  map.set('I', 1);
  map.set('V', 5);
  map.set('X', 10);
  map.set('L', 50);
  map.set('C', 100);
  map.set('D', 500);
  map.set('M', 1000);

  let cur = 0;

  for (let i = 0; i < s.length; i++) {
    const value = map.get(s[i]);
    if (i < s.length - 1 && value < map.get(s[i + 1])) {
      cur -= value;
    } else {
      cur += value;
    }
  }

  return cur;
}

romanToInt('III');
romanToInt('IV');
romanToInt('VI');
