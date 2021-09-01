const h = require('./h');

const vnode = h('div', {}, [
  h('h1', {}, '我是一个标题'),
  h('div', {}, h('p', {}, '我是一个段落')),
  h('ul', {}, [
    h('li', {}, 'HTML'),
    h('li', {}, 'CSS'),
    h('li', {}, 'JavaScript'),
  ]),
]);

console.log(vnode);
