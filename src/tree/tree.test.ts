import { createHierarchicalTree } from './tree';

describe('Hierarchical Data Structure Tree', () => {
  let id = 0;
  function createId() {
    id++;
    return id;
  }

  beforeEach(() => {
    id = 0;
  });

  it('should create a tree with initial value', () => {
    const { getRootNode } = createHierarchicalTree('Hello World');

    expect(getRootNode().getValue()).toBe('Hello World');
  });

  it('should append a new node to root', () => {
    const { getRootNode, addNewNodeToId, getSize } = createHierarchicalTree(
      'Hello World',
      { createId }
    );

    const { getValue } = addNewNodeToId(1, 'Hello World 2', 'append');

    expect(getValue()).toBe('Hello World 2');
    expect(getSize()).toBe(2);
    expect(getRootNode().getChildren()[0].getValue()).toBe('Hello World 2');
  });

  it('should append several nodes to tree', () => {
    const { addNewNodeToId, getSize, findNodeById } = createHierarchicalTree(
      'Hello World',
      {
        createId,
      }
    );

    addNewNodeToId(1, 'Hello World 2', 'append');
    addNewNodeToId(1, 'Hello World 3', 'append');
    addNewNodeToId(3, 'Hello World 4', 'append');
    addNewNodeToId(4, 'Hello World 5', 'append');
    addNewNodeToId(4, 'Hello World 6', 'append');
    addNewNodeToId(6, 'Hello World 6', 'append');

    const node = findNodeById(4);

    expect(node).not.toBeNull();
    // @ts-expect-error: node is not null
    expect(Object.keys(node.getChildren())).toHaveLength(2);
    expect(getSize()).toBe(7);
  });

  it('should add new node to another node', () => {
    const { addNewNodeToId, findNodeById, getRootNode } =
      createHierarchicalTree('Hello World');

    const rootNodeId = getRootNode().getId();

    addNewNodeToId(rootNodeId, 'Dog', 'append');
    addNewNodeToId(rootNodeId, 'Cat', 'append');
    const bunnyNode = addNewNodeToId(rootNodeId, 'Bunny', 'append');
    addNewNodeToId(bunnyNode.getId(), 'Bird', 'append');
    addNewNodeToId(bunnyNode.getId(), 'Borb', 'insert', 0);

    const node = findNodeById(bunnyNode.getId())!;

    const kids = node.getSortedChildren();

    expect(kids[0].getValue()).toBe('Borb');
    expect(kids[1].getValue()).toBe('Bird');
  });

  it('should prepend new nodes', () => {
    const { addNewNodeToId, getSize, findNodeById } = createHierarchicalTree(
      'Hello World',
      {
        createId,
      }
    );

    addNewNodeToId(1, 'Hello World 2', 'prepend');
    addNewNodeToId(1, 'Hello World 3', 'prepend');
    addNewNodeToId(3, 'Hello World 4', 'prepend');
    addNewNodeToId(4, 'Hello World 5', 'prepend');
    addNewNodeToId(4, 'Hello World 6', 'prepend');
    addNewNodeToId(6, 'Hello World 6', 'prepend');

    const node = findNodeById(4);

    expect(node).not.toBeNull();
    // @ts-expect-error: node is not null
    expect(Object.keys(node.getChildren())).toHaveLength(2);
    expect(getSize()).toBe(7);
  });

  it('should get first and last child', () => {
    const { addNewNodeToId, getRootNode } = createHierarchicalTree(
      'Hello World',
      { createId }
    );

    addNewNodeToId(1, 'Dog', 'append');
    addNewNodeToId(1, 'Cat', 'append');
    addNewNodeToId(1, 'Bunny', 'prepend');

    // @ts-expect-error: getFirstChild is not null
    expect(getRootNode().getFirstChild().getValue()).toBe('Bunny');
    // @ts-expect-error: getLastChild is not null
    expect(getRootNode().getLastChild().getValue()).toBe('Cat');
  });

  it('should insert node before another node', () => {
    const { addNewNodeToId, getRootNode } = createHierarchicalTree(
      'Hello World',
      { createId }
    );

    addNewNodeToId(1, 'Dog', 'append');
    addNewNodeToId(1, 'Cat', 'append');
    addNewNodeToId(1, 'Bunny', 'append');
    addNewNodeToId(1, 'Bird', 'insert', 0);
    addNewNodeToId(1, 'Borb', 'insert', 1);

    // @ts-expect-error: getFirstChild is not null
    expect(getRootNode().getFirstChild().getValue()).toBe('Bird');
    // @ts-expect-error: getLastChild is not null
    expect(getRootNode().getLastChild().getValue()).toBe('Bunny');
  });

  it('should breadth first search', () => {
    const { addNewNodeToId, breadthFirstSearch } = createHierarchicalTree(
      'Hello World',
      { createId }
    );

    addNewNodeToId(1, 'Dog', 'append');
    addNewNodeToId(1, 'Cat', 'append');
    addNewNodeToId(1, 'Bunny', 'append');
    addNewNodeToId(1, 'Bird', 'append');
    addNewNodeToId(1, 'Borb', 'append');

    const nodes = breadthFirstSearch();

    expect(nodes).toHaveLength(6);
  });

  it('should find node by id', () => {
    const { addNewNodeToId, findNodeById, getRootNode } =
      createHierarchicalTree('Hello World');

    const rootNodeId = getRootNode().getId();

    addNewNodeToId(rootNodeId, 'Dog', 'append');
    addNewNodeToId(rootNodeId, 'Cat', 'append');
    const bunnyNode = addNewNodeToId(rootNodeId, 'Bunny', 'append');
    addNewNodeToId(bunnyNode.getId(), 'Bird', 'insert', 0);
    const borbNode = addNewNodeToId(bunnyNode.getId(), 'Borb', 'insert', 1);

    const node = findNodeById(borbNode.getId())!;

    expect(node.getValue()).toBe('Borb');
  });

  // it("should throw error if position doesn't exist", () => {
  //   const { appendNewNodeToPosition } = createHierarchicalTree('Hello World');

  //   expect(() => {
  //     appendNewNodeToPosition('Hello World 2', 5);
  //   }).toThrowError(/couldn't add new node to position 5./i);
  // });

  // it('should find node by position', () => {
  //   const { appendNewNodeToPosition, findNodeByPosition } =
  //     createHierarchicalTree('Hello World 0');
  //   appendNewNodeToPosition('Hello World 1', 0);
  //   appendNewNodeToPosition('Hello World 2', 0);
  //   appendNewNodeToPosition('Hello World 3', 0);

  //   expect(findNodeByPosition(2).getValue()).toBe('Hello World 2');
  // });

  // it('should add several nodes as a tree', () => {
  //   const { appendNewNodeToPosition, getSize } =
  //     createHierarchicalTree('Hello World 1');

  //   appendNewNodeToPosition('Hello World 2', 0);
  //   appendNewNodeToPosition('Hello World 3', 0);
  //   appendNewNodeToPosition('Hello World 4', 2);
  //   appendNewNodeToPosition('Hello World 5', 1);
  //   appendNewNodeToPosition('Hello World 6', 4);
  //   appendNewNodeToPosition('Hello World 7', 3);

  //   expect(getSize()).toBe(7);
  // });

  // it('should find Node by ID', () => {
  //   const { appendNewNodeToPosition, tree, findNodeById } = createHierarchicalTree('Hello World');
  //   const { root: rootNode, size } = tree;
  //   const newNode = appendNewNodeToPosition(rootNode, 'Hello World 2');

  //   const node = findNodeById(rootNode.id);

  //   expect(node).toBe(rootNode);
  // });
});
