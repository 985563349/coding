const treeData = {
  title: 'node1',
  value: '0',
  key: '0',
  children: [
    {
      title: 'node1',
      value: '0-1',
      key: '0-1',
    },
    {
      title: 'node2',
      value: '0-2',
      key: '0-2',
      children: [
        {
          title: 'node4',
          value: '0-2-0',
          key: '0-2-0',
        },
        {
          title: 'node45',
          value: '0-2-1',
          key: '0-2-1',
        },
      ],
    },
    {
      title: 'node3',
      value: '0-3',
      key: '0-3',
      children: [
        {
          title: 'node6',
          value: '0-3-0',
          key: '0-3-0',
        },
      ],
    },
  ],
};

const searchTree = (node, iteratee) => {
  if (iteratee(node)) {
    return node;
  }

  if (Array.isArray(node.children)) {
    const children = [];

    for (let i = 0; i < node.children.length; i++) {
      const current = searchTree(node.children[i], iteratee);
      if (current) {
        children.push(current);
      }
    }

    return children.length > 0 ? { ...node, children } : null;
  }

  return null;
};

// console.log(searchTree(treeData, (node) => node.value === '0-2-1'));
console.log(searchTree(treeData, (node) => node.title.includes('node4')));
