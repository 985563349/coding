Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fn = Symbol(context);
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};
