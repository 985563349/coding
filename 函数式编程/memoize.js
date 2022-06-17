function memoize(f) {
  const cache = {};

  return function () {
    const arg_string = JSON.stringify(arguments);
    cache[arg_string] = cache[arg_string] ?? f.apply(f, arguments);
    return cache[arg_string];
  };
}
