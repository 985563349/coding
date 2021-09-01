/**
 * vnode 创建vnode对象
 * @param {string} sel 选择器
 * @param {any} data 属性、样式等
 * @param {Array<VNode | string>} children 子元素
 * @param {string} text 文字
 * @param {Element | Text} elm 是否有对应的真实DOM
 */
function vnode(sel, data, children, text, elm) {
  const key = data === undefined ? undefined : data.key;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
  };
}

module.exports = vnode;
