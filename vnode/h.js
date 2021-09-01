const vnode = require('./vnode');

/**
 * h 创建虚拟DOM
 * @param {*} sel 选择器
 * @param {*} data 属性、样式等
 * @param {*} c 子元素
 */
function h(sel, data, c) {
  if (arguments.length < 3) {
    throw new Error('h函数只实现3个参数的情况');
  }

  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c, undefined);
  }

  if (Array.isArray(c)) {
    const children = [];
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组参数中有项不是h函数');
      }
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  }

  if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    const children = [c];
    return vnode(sel, data, children, undefined, undefined);
  }
}

module.exports = h;
