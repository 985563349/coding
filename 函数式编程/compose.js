/**
 * 结合律:
 * 函数组合要符合结合律，以下代码中把f和g组合，或则把g和h组合，都不影响最终结果
 * compose(f, g, h) == compose(compose(f, g), h) == compose(f, compose(g, h))
 */

const compose = (...func) => {
  if (func.length === 0) return () => {};

  if (func.length === 1) return func[0];

  return func.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};

/**
 * 调试：
 * compose(f, trace('g'), g, trace('h'), h)
 */
const trace = (tag) => (v) => {
  console.log(`${tag}: ${v}`);
  return v;
};
