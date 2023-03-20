/**
 * 回文数字
 * 思路：先判断特殊情况：小于0的，尾数为0的，小于10的正整数。之后将整数反转，反转前后两个整数是否相等来判断是否为回文整数。
 * 此处的反转：将整数取模得到尾数，之后每一次取模，都在结果上添加一位（通过 *10 来得到），这样就能得到一个反转的数。
 */

function isPalindrome(x) {
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false;
  }
  if (x >= 0 && x <= 9) {
    return true;
  }
  let cur = 0;
  let num = x;
  while (num > 0) {
    cur = cur * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return cur === x;
}

isPalindrome(121); // true
isPalindrome(123); // false
isPalindrome(-121); // false
isPalindrome(0); // true
