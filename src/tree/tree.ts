import { nanoid } from 'nanoid';

import { createNode } from './treeNode';
import type { TreeOptions, MakeTreeReturn, NodeGroup } from './types';

export function createHierarchicalTree<T>(
  value: T,
  options?: TreeOptions
): MakeTreeReturn<T> {
  const setupOptions: Required<TreeOptions> = {
    createId: () => nanoid(),
    ...options,
  };

  const tree = {
    root: createNode(value, setupOptions.createId, 0),
    size: 1,
    id: setupOptions.createId(),
  };

  const getTree = () => tree;
  const getSize = () => tree.size;
  const getTreeId = () => tree.id;
  const getRootNode = () => tree.root;

  const appendNewNodeToPosition = (value: T, position: number) => {
    let nextPosition = position + 1;

    const traverse = (nodeGroup: NodeGroup<T>): NodeGroup<T> | null => {
      let appended: NodeGroup<T>;
      if (nodeGroup.getPosition() === position) {
        const { append, getLastChild } = nodeGroup;
        const lastChild = getLastChild();

        if (lastChild) {
          nextPosition = lastChild.getPosition() + 1;
        }

        const createdNodeGroup = createNode(
          value,
          setupOptions.createId,
          nextPosition
        );

        appended = append(createdNodeGroup);
        tree.size++;
        return appended;
      }
      if (nodeGroup.getChildren().length > 0) {
        for (const child of nodeGroup.getChildren()) {
          const traversed = traverse(child);
          if (traversed) {
            return traversed;
          }
        }
      }
      return null;
    };

    const appendedNode = traverse(getRootNode());

    if (appendedNode) {
      const updateNodePositions = (nodeGroup: NodeGroup<T>) => {
        if (nodeGroup.getPosition() >= appendedNode.getPosition()) {
          nodeGroup.updatePositionBy(1);
        } else {
          for (const child of nodeGroup.getChildren()) {
            if (child.getPosition() >= appendedNode.getPosition()) {
              updateNodePositions(child);
            }
          }
        }
      };
      updateNodePositions(getRootNode());
      return appendedNode;
    }

    throw new Error(`Couldn't add new node to Position ${position}.`);
  };

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

  /*
  // const findNodeByPosition = (position: number): Node<T> | null => {
  //   const node = tree.root;

  //   if (position === 0) {
  //     return node;
  //   }

  //   const traverse = <T>(node: Node<T>): Node<T> | null => {
  //     if (node.children) {
  //       for (const child of node.children) {
  //         if (position === 0) {
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
    getTree,
    getSize,
    getTreeId,
    getRootNode,
    appendNewNodeToPosition,
    // findNodeById,
    // findNodeByPosition,
  };
}
