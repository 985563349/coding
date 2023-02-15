/**
 * Point Free:
 * Point Free是一种编程风格。中文可译做 ‘无参数’风格，不使用所要处理的值，只合成运算过程。
 * 其本质是使用一些通用的函数，组合出各种复杂运算。
 */

// Hello World -> hello_world

// 非Point Free 模式
// function f(word) {
//   return word.toLowerCase().replace(/\s+/g, '_');
// }

// Point Free
function toLowerCase(word) {
  return word.toLowerCase();
}

const replace = curry((pattern, replacement, word) => {
  return word.replace(pattern, replacement);
});

const f = compose(replace(/\s+/g, '_'), toLowerCase);

f('Hello  World');
