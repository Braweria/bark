import type { TreeOptions, Node, NodeGroup } from './types';

export const createNode = <T>(
  value: T,
  createId: NonNullable<TreeOptions['createId']>,
  position: number
): NodeGroup<T> => {
  const node: Node<T> = {
    id: createId(),
    value,
    children: [],
  };

  let nodePosition = position;

  const append: NodeGroup<T>['append'] = (child: NodeGroup<T>) => {
    node.children.push(child);
    return child;
  };

  const getValue = () => node.value;
  const getId = () => node.id;
  const getChildren = () => node.children;
  const getNode = () => node;
  const getPosition = () => nodePosition;
  const getFirstChild = () => node.children[0] || null;
  const getLastChild = () => node.children[node.children.length - 1] || null;

  const updatePositionBy = (by: number) => (nodePosition += by);

  return {
    getValue,
    getId,
    getChildren,
    getNode,
    getPosition,
    getFirstChild,
    getLastChild,
    updatePositionBy,
    append,
  };
};
