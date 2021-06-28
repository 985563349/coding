function myInstanceof(A, B) {
  let __proto__ = A.__proto__;
  const prototype = B.prototype;

  while (true) {
    if (__proto__ === null) return false;

    if (__proto__ === prototype) return true;

    __proto__ = __proto__.__proto__;
  }
}
