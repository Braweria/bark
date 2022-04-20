import { createNode } from './treeNode';
import { nanoid } from 'nanoid';
import type { TreeOptions } from './types';

export function createTree<T>(value: T, options?: TreeOptions) {
  const setupOptions: Required<TreeOptions> = {
    createId: () => nanoid(),
    ...options,
  };

  const tree = {
    root: createNode(value, setupOptions.createId),
    size: 0,
  };
  
  return {
    tree,
  };
}
