Function.prototype.myApply = function (context, params) {
  context = context || window;
  const fn = Symbol(context);
  context[fn] = this;
  const result = context[fn](...params);
  delete context[fn];
  return result;
};
