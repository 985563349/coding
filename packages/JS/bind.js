Function.prototype.myBind = function (context, ...rest) {
  const self = this;
  context = context || window;

  return function fBind() {
    // 如果使用new调用，那么this指向fBind实例，实例作为this传入。
    return self.call(
      this instanceof fBind ? this : context,
      ...rest,
      ...arguments
    );
  };
};
