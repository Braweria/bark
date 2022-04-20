import type { TreeOptions } from './types';

export function createNode<T>(
  value: T,
  createId: NonNullable<TreeOptions['createId']>,
): Node<T> {
  return {
    id: createId(),
    value,
    children: null,
  };
}

type Node<T> = {
  id: string | number;
  value: T;
  children: Node<T>[] | null;
};
