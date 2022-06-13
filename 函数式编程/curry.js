function curry(func) {
  const arity = func.length;
  const args = [];

  return function wrapper() {
    [].push.apply(args, arguments);

    if (args.length < arity) {
      return wrapper;
    }

    return func.apply(this, args);
  };
}
