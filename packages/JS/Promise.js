const PADDING = 'padding';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(resolver) {
    this.status = PADDING;
    this.value = null;
    this.reason = null;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PADDING) {
        this.status = FULFILLED;
        this.value = value;
        this.fulfilledCallbacks.forEach((cb) => cb(value));
      }
    };

    const reject = (reason) => {
      if (this.status === PADDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectedCallbacks.forEach((cb) => cb(reason));
      }
    };

    try {
      resolver(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 实现Promise终值、拒因穿透
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let promise2;

    promise2 = new MyPromise((resolve, reject) => {
      // 当前Promise为成功态，onFulfilled方法直接执行
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            promiseResolve(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      // 当前Promise为失败态，onRejected方法直接执行
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            promiseResolve(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      // 当前Promise为等待态，进入队列等待执行
      if (this.status === PADDING) {
        this.fulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              promiseResolve(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.rejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              promiseResolve(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }

    return new MyPromise((resolve, reject) => {
      if (value && typeof value.then === 'function') {
        setTimeout(() => value.then(resolve, reject));
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      let index = 0;

      if (promises.length === 0) {
        resolve(result);
        return;
      }

      function process(value) {
        result.push(value);
        if (++index === promises.length) {
          resolve(result);
        }
      }

      for (let i = 0; i < promises.length; i++) {
        // 判断当前项是否为Promise
        MyPromise.resolve(promises[i])
          .then((value) => process(value))
          .catch((error) => reject(error));
      }
    });
  }
}

function promiseResolve(promise2, x, resolve, reject) {
  // 处理Promise循环引用
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'));
  }

  // 判断当前终值是否为Promise实例或存在then方法
  if ((x && typeof x === 'object') || typeof x === 'function') {
    let used = false;

    try {
      const then = x.then;

      if (typeof x === 'function') {
        then.call(
          x,
          (value) => {
            if (used) return;
            used = true;
            promiseResolve(promise2, value, resolve, reject);
          },
          (error) => {
            if (used) return;
            used = true;
            promiseResolve(promise2, error, resolve, reject);
          }
        );
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
