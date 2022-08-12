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
          title: 'node5',
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

const search = (tree, iteratee) => {
  let path = null;

  const dfs = (node) => {
    if (iteratee(node)) {
      path = node;
      return true;
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (dfs(node.children[i])) {
          const cloneNode = JSON.parse(JSON.stringify(node));
          cloneNode.children = [path];
          path = cloneNode;
          return true;
        }
      }
    }
  };

  dfs(tree);
  return path;
};

console.log(search(treeData, (node) => node.value === '0-2-0'));
