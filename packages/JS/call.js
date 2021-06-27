Function.prototype.myCall = function (context, ...rest) {
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...rest);
  delete context[fn];
  return result;
};
