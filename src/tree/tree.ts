import { nanoid } from 'nanoid';

import { createNode } from './treeNode';
import type {
  TreeOptions,
  Tree,
  Node,
  ID,
  BreadthFirstSearch,
  GetChronologicalOrder,
  MoveNodeToId,
  DeleteNodeById,
} from './types';

export function createHierarchicalTree<T>(
  value: T,
  options?: TreeOptions
): Tree<T> {
  const setupOptions: Required<TreeOptions> = {
    createId: () => nanoid(),
    ...options,
  };

  const root = createNode(value, null, setupOptions.createId);
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
    const appendedNode = createNode(value, node, setupOptions.createId);
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

  const getChronologicalOrder: GetChronologicalOrder<T> = () => {
    const stack: Node<T>[] = [getRootNode()];
    const result: Node<T>[] = [];

    while (stack.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentNode = stack.shift()!;
      result.push(currentNode);
      const children = currentNode.getChildren();
      const childNodes = [];
      for (const key in children) {
        if (Object.hasOwn(children, key)) {
          childNodes.push(children[key]);
        }
      }
      stack.splice(0, 0, ...childNodes);
    }

    return result;
  };

  const deleteNodeById: DeleteNodeById<T> = (nodeId) => {
    const nodeToDelete = findNodeById(nodeId);
    const parentNode = nodeToDelete.getParent();

    if (parentNode) {
      return parentNode.deleteChildById(nodeId);
    }
    throw new Error(
      "No parent found was found, can't delete reference of Node."
    );
  };

  const moveNodeToId: MoveNodeToId<T> = (node, targetNodeId, type, before) => {
    const target = findNodeById(targetNodeId);
    const nodeToMove = typeof node === 'object' ? node : findNodeById(node);

    deleteNodeById(typeof node === 'object' ? node.getId() : node);

    switch (type) {
      case 'append':
        target.append(nodeToMove);
        break;
      case 'prepend':
        target.prepend(nodeToMove);
        break;
      case 'insert':
        if (before === undefined) {
          throw new Error(`Fourth argument "before" is required`);
        }
        target.insert(nodeToMove, before);
        break;
      default:
        throw new Error('Invalid type');
    }
  };

  return {
    getSize,
    getTreeId,
    getRootNode,
    addNewNodeToId,
    findNodeById,
    breadthFirstSearch,
    getChronologicalOrder,
    moveNodeToId,
    deleteNodeById,
  };
}
