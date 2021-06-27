Function.prototype.myBind = function (context, ...rest) {
  const that = this;

  return function () {
    const fn = Symbol('fn');
    context[fn] = that;
    const result = context[fn](...rest, ...arguments);
    delete context[fn];
    return result;
  };
};
