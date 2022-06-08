function request(count) {
  return new Promise(function (resolve) {
    setTimeout(resolve, count * 1000, count);
  });
}

function* gen() {
  const a = yield request(1);
  const b = yield request(2);
  const c = yield request(3);
  return a + b + c;
}

function run(fn) {
  return new Promise(function (resolve, reject) {
    const g = fn();

    function next(data) {
      try {
        const result = g.next(data);
        if (result.done) return resolve(result.value);

        // 包装Value
        Promise.resolve(result.value).then(next, (e) => g.throw(e));
      } catch (e) {
        reject(e);
      }
    }

    next();
  });
}

run(gen).then(console.log);
