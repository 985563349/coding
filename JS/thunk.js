// 简单版
function thunk(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    };
  };
}

// 完整版
function thunkify(fn) {
  return function () {
    var args = new Array(arguments.length);
    var ctx = this;

    // 填充参数
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      arg.push(function () {
        // 防止重复调用
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}
