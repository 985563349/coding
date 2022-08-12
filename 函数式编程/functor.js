// Box
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: () => `Box(${x})`,
});

/**
 * Maybe函子:
 * Maybe函子可以对外部的空值情况做处理（控制副作用做载允许的范围）
 */
const Maybe = (x) => ({
  map: (f) => Maybe(x == null ? x : f(x)),
  fold: (f) => f(x),
  inspect: () => `Maybe(${x})`,
});

/**
 * Either函子:
 * Either两者中的任何一个，类似于if... else...的处理。
 * 异常会让函数变的不纯，Either函子可以用来做异常处理。
 */
const Either = (l, r) => ({
  map: (f) => (r == null ? Either(f(l), r) : Either(l, f(r))),
  fold: (f) => (r == null ? f(l) : f(r)),
  inspect: () => `Either(${l}, ${r})`,
});
