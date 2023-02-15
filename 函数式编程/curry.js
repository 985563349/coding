function curry(func) {
  function wrapper() {
    const prevArgs = arguments;

    return function curried() {
      const args = [].slice.call(prevArgs);
      [].push.apply(args, arguments);

      if (args.length < func.length) {
        return wrapper.apply(null, args);
      } else {
        return func.apply(this, args);
      }
    };
  }

  return wrapper();
}
