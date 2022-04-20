import { createTree } from './tree';

describe('Functional Data Structure Tree', () => {
  it('should create a tree with initial value', () => {
    const { tree } = createTree('Hello World');

    expect(tree.root.value).toEqual('Hello World');
  });
});
