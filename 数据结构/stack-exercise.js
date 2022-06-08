const Stack = require('./stack');

// 十进制转二进制
function decimalToBinary(number) {
  const stack = new Stack();
  let result = '';

  while (number > 0) {
    stack.push(number % 2);
    number = ~~(number / 2);
  }

  while (!stack.isEmpty()) {
    result += stack.pop();
  }

  return result;
}

console.log(decimalToBinary(11));

// 十进制转二、八、十六进制
function converter(number, bs) {
  const stack = new Stack();
  const digits = '0123456789ABCDEF';
  let result = '';

  while (number > 0) {
    stack.push(number % bs);
    number = ~~(number / bs);
  }

  while (!stack.isEmpty()) {
    result += digits[stack.pop()];
  }

  return result;
}

console.log(converter(100, 2));
console.log(converter(100, 8));
console.log(converter(100, 16));

/**
 * 有效的括号
 *
 *  给定一个只包括 小括号 ( ) ，中括号 [ ] 大括号 { } 的字符串，判断字符串是否有效。
 *
 *  有效字符串需要满足：
 *    1、左括号必须用相同类型的右括号闭合。
 *    2、左括号必须以正确的顺序闭合。
 *
 *  示例：
 *    input: '{}'
 *    output: true
 *
 *    input: '{}()[]'
 *    output: true
 *
 *    input: '{)(}[}'
 *    output: false
 */

function isValid(string) {
  const stack = new Stack();

  for (let v of string) {
    const p = stack.peek();

    if (
      (p === '(' && v === ')') ||
      (p === '{' && v === '}') ||
      (p === '[' && v === ']')
    ) {
      stack.pop();
    } else {
      stack.push(v);
    }
  }

  return stack.isEmpty();
}

console.log(isValid('{}()[]'));
console.log(isValid('{)(}[}'));
