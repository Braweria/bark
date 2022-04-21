export type TreeOptions = {
  createId?: () => string | number;
};

export type ID = string | number;

export type Tree<T> = {
  root: NodeGroup<T>;
  size: number;
  id: ID;
};

export type NodeGroup<T> = {
  getValue: () => T;
  getId: () => ID;
  getChildren: () => NodeGroup<T>[];
  getNode: () => Node<T>;
  getPosition: () => number;
  getFirstChild: () => NodeGroup<T> | null;
  getLastChild: () => NodeGroup<T> | null;
  updatePositionBy: (by: number) => void;
  append: (child: NodeGroup<T>) => NodeGroup<T>;
};

export type Node<T> = {
  id: ID;
  value: T;
  children: NodeGroup<T>[];
};

// export type CreateNode = <T>(
//   value: T,
//   createId: NonNullable<TreeOptions['createId']>,
//   position: number
// ) => NodeGroup<T>;

export type AppendNewNodeToPosition<T> = (
  value: T,
  position: number
) => NodeGroup<T>;

export type FindNodeById = (nodeId: ID) => Node<unknown> | null;
export type FindNodeByPosition = (position: number) => Node<unknown> | null;

export type MakeTreeReturn<T> = {
  getTree: () => Tree<T>;
  getSize: () => number;
  getTreeId: () => ID;
  getRootNode: () => NodeGroup<T>;
  appendNewNodeToPosition: AppendNewNodeToPosition<T>;
  // findNodeById: FindNodeById;
  // findNodeByPosition: FindNodeByPosition;
};
