import { nanoid } from 'nanoid';

import { createNode } from './treeNode';
import type { TreeOptions, Tree, Node, ID, BreadthFirstSearch } from './types';

export function createHierarchicalTree<T>(
  value: T,
  options?: TreeOptions
): Tree<T> {
  const setupOptions: Required<TreeOptions> = {
    createId: () => nanoid(),
    ...options,
  };

  const root = createNode(value, setupOptions.createId);
  const id = setupOptions.createId();
  let size = 1;

  const getSize = () => size;
  const getTreeId = () => id;
  const getRootNode = () => root;

  const addNewNodeToId: Tree<T>['addNewNodeToId'] = (
    id,
    value,
    type,
    before
  ) => {
    const node = findNodeById(id);
    const appendedNode = createNode(value, setupOptions.createId);
    switch (type) {
      case 'append':
        node.append(appendedNode);
        size++;
        break;
      case 'prepend':
        node.prepend(appendedNode);
        size++;
        break;
      case 'insert':
        if (before === undefined) {
          throw new Error(`Fourth argument "before" is required`);
        }
        node.insert(appendedNode, before);
        size++;
        break;
      default:
        throw new Error('Invalid type');
    }
    return appendedNode;
  };

  const findNodeById = (nodeId: ID): Node<T> => {
    const queue: Node<T>[] = [getRootNode()];
    let result: Node<T> | null = null;
    while (queue.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentNode = queue.shift()!;
      if (currentNode.getId() === nodeId) {
        result = currentNode;
        break;
      }
      const children = currentNode.getChildren();
      for (const key in children) {
        if (Object.hasOwn(children, key)) {
          queue.push(children[key]);
        }
      }
    }
    if (result === null) {
      throw new Error('Node not found');
    }
    return result;
  };

  const breadthFirstSearch: BreadthFirstSearch<T> = () => {
    const queue = [getRootNode()];
    const result: Node<T>[] = [];
    while (queue.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentNode = queue.shift()!;
      result.push(currentNode);
      const children = currentNode.getChildren();
      for (const key in children) {
        if (Object.hasOwn(children, key)) {
          queue.push(children[key]);
        }
      }
    }
    return result;
  };

  return {
    getSize,
    getTreeId,
    getRootNode,
    addNewNodeToId,
    findNodeById,
    breadthFirstSearch,
  };
}
