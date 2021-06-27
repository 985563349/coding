Function.prototype.myApply = function (context, params) {
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...params);
  delete context[fn];
  return result;
};
