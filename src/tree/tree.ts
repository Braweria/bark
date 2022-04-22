import { nanoid } from 'nanoid';

import { createNode } from './treeNode';
import type { TreeOptions, Tree, Node, ID } from './types';

// const updateNodePositions = <T>(Node: Node<T>, appendedNode: Node<T>) => {
//   if (
//     Node.getPosition() >= appendedNode.getPosition() &&
//     Node.getId() !== appendedNode.getId()
//   ) {
//     Node.updatePositionBy(1);
//   } else {
//     for (const child of Node.getChildren()) {
//       if (child.getPosition() >= appendedNode.getPosition()) {
//         updateNodePositions(child, appendedNode);
//       }
//     }
//   }
// };

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
        if (!before) {
          throw new Error('Fourth argument "before" is required');
        }
        node.insert(appendedNode, before);
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

  // const breadthFirstSearch = (): Node<T> => {
  //   //
  // };

  // const appendNewNodeToPosition = (value: T, position: number) => {
  //   let nextPosition = position + 1;

  //   const traverse = (Node: Node<T>): Node<T> | null => {
  //     let appended: Node<T>;
  //     if (Node.getPosition() === position) {
  //       const { append, getLastChild } = Node;
  //       const lastChild = getLastChild();

  //       if (lastChild) {
  //         nextPosition = lastChild.getPosition() + 1;
  //       }

  //       const createdNode = createNode(
  //         value,
  //         setupOptions.createId,
  //         nextPosition
  //       );

  //       appended = append(createdNode);
  //       tree.size++;
  //       return appended;
  //     }
  //     if (Node.getChildren().length > 0) {
  //       for (const child of Node.getChildren()) {
  //         const traversed = traverse(child);
  //         if (traversed) {
  //           return traversed;
  //         }
  //       }
  //     }
  //     return null;
  //   };

  //   const appendedNode = traverse(getRootNode());

  //   if (appendedNode) {
  //     updateNodePositions(getRootNode(), appendedNode);
  //     return appendedNode;
  //   }

  //   throw new Error(`Couldn't add new node to Position ${position}.`);
  // };

  // const findNodeByPosition = (
  //   position: number,
  //   startingNode?: Node<T>
  // ): Node<T> => {
  //   const node = startingNode ?? getRootNode();

  //   if (node.getPosition() === position) {
  //     return node;
  //   }

  //   if (node.getChildren().length === 0) {
  //     throw new Error(`Couldn't find node at position ${position}.`);
  //   }

  //   let pointer = node.getChildren().length - 1;

  //   while (pointer >= 0) {
  //     const child = node.getChildren()[pointer];
  //     if (child.getPosition() <= position) {
  //       const found = findNodeByPosition(position, child);
  //       if (found) {
  //         return found;
  //       }
  //       break;
  //     }
  //     pointer--;
  //   }

  //   throw new Error(`Couldn't find node at position ${position}.`);
  // };

  /*
  // const findNodeById: FindNodeById = (nodeId) => {
  //   const node = tree.root;

  //   if (node.id === nodeId) {
  //     return node;
  //   }

  //   const traverse = <T>(node: Node<T>): Node<T> | null => {
  //     if (node.children) {
  //       for (const child of node.children) {
  //         if (child.id === nodeId) {
  //           return child;
  //         }
  //         traverse(child);
  //       }
  //     }
  //     return null;
  //   };

  //   return traverse(node);
  // };
  */

  return {
    getSize,
    getTreeId,
    getRootNode,
    addNewNodeToId,
    // appendNewNodeToPosition,
    findNodeById,
    // findNodeByPosition,
  };
}

// function breadthFirstSearch<T>(
//   Node: Node<T>,
//   callback: (Node: Node<T>) => void
// ) {
//   callback(Node);
//   for (const child of Node.getChildren()) {
//     breadthFirstSearch(child, callback);
//   }
// }
