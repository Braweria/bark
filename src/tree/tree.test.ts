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

  it('should get sorted nodes', () => {
    const { addNewNodeToId, getChronologicalOrder, getRootNode } =
      createHierarchicalTree('1');
    const rootNodeId = getRootNode().getId();
    /* Tree Structure
            1
         /    \
        2      6
       / \    / \
      3   4  7   8
           \    / \
            5  9  10
    */

    const two = addNewNodeToId(rootNodeId, '2', 'append');
    addNewNodeToId(two.getId(), '3', 'append');
    const four = addNewNodeToId(two.getId(), '4', 'append');
    addNewNodeToId(four.getId(), '5', 'append');
    const six = addNewNodeToId(rootNodeId, '6', 'append');
    addNewNodeToId(six.getId(), '7', 'append');
    const eight = addNewNodeToId(six.getId(), '8', 'append');
    addNewNodeToId(eight.getId(), '9', 'append');
    addNewNodeToId(eight.getId(), '10', 'append');

    const nodes = getChronologicalOrder().map((node) => node.getValue());

    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    expect(nodes).toStrictEqual(expected);
  });

  it('should delete node by id', () => {
    const {
      addNewNodeToId,
      getRootNode,
      deleteNodeById,
      getChronologicalOrder,
    } = createHierarchicalTree(1);
    const rootNodeId = getRootNode().getId();

    const node2 = addNewNodeToId(rootNodeId, 2, 'append');
    addNewNodeToId(rootNodeId, 5, 'append');

    const before = getChronologicalOrder().map((node) => node.getValue());

    expect(before).toStrictEqual([1, 2, 5]);

    deleteNodeById(node2.getId());

    const after = getChronologicalOrder().map((node) => node.getValue());

    expect(after).not.toStrictEqual(before);
    expect(after).toStrictEqual([1, 5]);
  });

  it('should move node to another and update sorting', () => {
    const { addNewNodeToId, getChronologicalOrder, getRootNode, moveNodeToId } =
      createHierarchicalTree(1);
    const rootNodeId = getRootNode().getId();

    const node2 = addNewNodeToId(rootNodeId, 2, 'append');
    const node3 = addNewNodeToId(rootNodeId, 9, 'append');
    const node4 = addNewNodeToId(node2.getId(), 12, 'append');

    const nodesBefore = getChronologicalOrder().map((node) => node.getValue());

    expect(nodesBefore).toStrictEqual([1, 2, 12, 9]);

    moveNodeToId(node4.getId(), node3.getId(), 'append');

    const nodesAfter = getChronologicalOrder().map((node) => node.getValue());

    expect(nodesAfter).not.toStrictEqual(nodesBefore);
    expect(nodesAfter).toStrictEqual([1, 2, 9, 12]);
  });
});
