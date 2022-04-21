import { createHierarchicalTree } from './tree';

describe('Hierarchical Data Structure Tree', () => {
  it('should create a tree with initial value', () => {
    const { getRootNode } = createHierarchicalTree('Hello World');

    expect(getRootNode().getValue()).toBe('Hello World');
  });

  it('should add a new Node by Position', () => {
    const { appendNewNodeToPosition, getSize, getRootNode } =
      createHierarchicalTree('Hello World');
    appendNewNodeToPosition('Hello World 2', 0);

    expect(getRootNode().getChildren().length).toBeGreaterThan(0);
    expect(getSize()).toBe(2);
  });

  it("should throw error if position doesn't exist", () => {
    const { appendNewNodeToPosition } = createHierarchicalTree('Hello World');

    expect(() => {
      appendNewNodeToPosition('Hello World 2', 5);
    }).toThrowError(/couldn't add new node to position 5./i);
  });

  it('should add several nodes as a tree', () => {
    const { appendNewNodeToPosition, getSize } =
      createHierarchicalTree('Hello World 1');

    appendNewNodeToPosition('Hello World 2', 0);
    appendNewNodeToPosition('Hello World 3', 0);
    appendNewNodeToPosition('Hello World 4', 2);
    appendNewNodeToPosition('Hello World 5', 1);
    appendNewNodeToPosition('Hello World 6', 4);
    appendNewNodeToPosition('Hello World 7', 3);

    expect(getSize()).toBe(7);
  });

  // it('should find Node by ID', () => {
  //   const { appendNewNodeToPosition, tree, findNodeById } = createHierarchicalTree('Hello World');
  //   const { root: rootNode, size } = tree;
  //   const newNode = appendNewNodeToPosition(rootNode, 'Hello World 2');

  //   const node = findNodeById(rootNode.id);

  //   expect(node).toBe(rootNode);
  // });
});
