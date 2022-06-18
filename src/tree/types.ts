export type TreeOptions = {
  createId?: () => string | number;
};

export type ID = string | number;

export type NodeChildren<T> = {
  [key: string]: Node<T>;
};

export type AppendNewNodeToPosition<T> = (
  value: T,
  position: number
) => Node<T>;

export type FindNodeById<T> = (nodeId: ID) => Node<T> | null;
export type FindNodeByPosition<T> = (
  position: number,
  startingNode?: Node<T>
) => Node<T>;

export type AddNewNodeToId<T> = {
  (nodeId: ID, value: T, type: 'append' | 'prepend', before?: number): Node<T>;
  (nodeId: ID, value: T, type: 'insert', before: number): Node<T>;
};

export type Node<T> = {
  getValue: () => T;
  getId: () => ID;
  getChildren: () => NodeChildren<T>;
  getFirstChild: () => Node<T> | null;
  getLastChild: () => Node<T> | null;
  getSortedChildren: () => Node<T>[];
  append: (child: Node<T>) => Node<T>;
  prepend: (child: Node<T>) => Node<T>;
  insert: (child: Node<T>, before: number) => Node<T>;
};

export type BreadthFirstSearch<T> = () => Node<T>[];

export type GetChronologicalOrder<T> = () => Node<T>[];

export type Tree<T> = {
  getSize: () => number;
  getTreeId: () => ID;
  getRootNode: () => Node<T>;
  addNewNodeToId: AddNewNodeToId<T>;
  findNodeById: FindNodeById<T>;
  breadthFirstSearch: BreadthFirstSearch<T>;
  getChronologicalOrder: GetChronologicalOrder<T>
};
