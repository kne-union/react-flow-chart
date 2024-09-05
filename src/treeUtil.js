export const findNode = (tree, { currentNodeId }) => {
  const core = tree => {
    if (Array.isArray(tree)) {
      for (let node of tree) {
        const res = core(node);
        if (res) {
          return res;
        }
      }
    }
    if (tree.id === currentNodeId) {
      return tree;
    }

    return tree.children ? core(tree.children) : null;
  };
  return core(tree);
};

export const appendNode = (tree, { currentNodeId, node, type }) => {
  const core = tree => {
    if (Array.isArray(tree)) {
      const currentIndex = tree.findIndex(node => node.id === currentNodeId);
      if (currentIndex > -1) {
        const newTree = tree.slice(0);
        if (newTree[currentIndex].type === 'condition' && type === 'condition') {
          const newNode = Object.assign({}, newTree[currentIndex]);
          const newChildren = (newNode.children || []).slice(0);
          newChildren.push([node]);
          newNode.children = newChildren;
          newTree.splice(currentIndex, 1, newNode);
        } else {
          newTree.splice(currentIndex + 1, 0, node);
        }

        return newTree;
      } else {
        return tree.map(node => core(node));
      }
    }
    return Object.assign({}, tree, tree.children ? { children: core(tree.children) } : null);
  };

  return core(tree);
};

export const removeNode = (tree, { currentNodeId }) => {
  const core = tree => {
    if (Array.isArray(tree)) {
      const currentIndex = tree.findIndex(node => node.id === currentNodeId);
      if (currentIndex > -1) {
        const newTree = tree.slice(0);
        if (newTree[currentIndex].type === 'branch') {
          return [];
        }
        newTree.splice(currentIndex, 1);
        return newTree;
      } else {
        return tree
          .map(node => core(node))
          .filter(node => {
            return !(node.type === 'condition' && node.children.length < 2);
          });
      }
    }
    return Object.assign({}, tree, tree.children ? { children: core(tree.children).filter(item => item && item.length > 0) } : null);
  };

  return core(tree);
};

export const replaceNode = (tree, { node }) => {
  const core = tree => {
    if (Array.isArray(tree)) {
      for (let node of tree) {
        const res = core(node);
        if (res) {
          return res;
        }
      }
    }
    if (tree.id === node.id) {
      return Object.assign({}, node, { type: tree.type });
    }

    return tree.children ? core(tree.children) : null;
  };
  return core(tree);
};

const treeUtil = { findNode, appendNode, removeNode, replaceNode };

export default treeUtil;
