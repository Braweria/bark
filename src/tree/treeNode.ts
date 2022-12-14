import type { TreeOptions, Node, NodeChildren } from './types';

export const createNode = <T>(
  value: T,
  parentNode: Node<T> | null,
  createId: NonNullable<TreeOptions['createId']>
): Node<T> => {
  const id = createId();
  const nodeValue = value;
  let children: NodeChildren<T> = {};
  const parent = parentNode;

  const getChildKeys = () => Object.keys(children);

  const append: Node<T>['append'] = (child: Node<T>) => {
    const lastKey = getChildKeys().pop();
    children[lastKey ? Number.parseInt(lastKey, 10) + 1 : 0] = child;
    return child;
  };

  const prepend: Node<T>['prepend'] = (child: Node<T>) => {
    const keys = getChildKeys();
    const updatedChildren: NodeChildren<T> = keys.reduce(
      (acc: Record<number, Node<T>>, cur) => {
        acc[Number.parseInt(cur, 10) + 1] = children[cur];
        return acc;
      },
      {}
    );
    updatedChildren[0] = child;
    children = updatedChildren;
    return child;
  };

  const insert: Node<T>['insert'] = (child: Node<T>, before: number) => {
    const keys = getChildKeys();

    const updatedChildren: NodeChildren<T> = keys.reduce(
      (accumulated: NodeChildren<T>, current) => {
        if (current >= before.toString()) {
          accumulated[Number.parseInt(current, 10) + 1] = children[current];
        } else {
          accumulated[current] = children[current];
        }
        return accumulated;
      },
      {}
    );

    updatedChildren[before] = child;

    children = updatedChildren;

    return child;
  };

  const deleteChildById: Node<T>['deleteChildById'] = (childId) => {
    const updatedChildren: NodeChildren<T> = {};
    let deletedNode;

    for (const key in children) {
      if (Object.hasOwn(children, key)) {
        const nodeId = children[key].getId();
        if (nodeId === childId) {
          deletedNode = children[key];
        } else {
          updatedChildren[key] = children[key];
        }
      }
    }

    children = updatedChildren;
    return deletedNode as Node<T>;
  };

  const getParent = () => parent;
  const getValue = () => nodeValue;
  const getId = () => id;
  const getChildren = () => children;
  const getFirstChild = () => children[0] || null;
  const getLastChild = () =>
    children[Object.keys(children)[Object.keys(children).length - 1]] || null;
  const getSortedChildren = () => getChildKeys().map((key) => children[key]);

  return {
    getParent,
    getValue,
    getId,
    getChildren,
    getFirstChild,
    getLastChild,
    getSortedChildren,
    append,
    prepend,
    insert,
    deleteChildById,
  };
};
