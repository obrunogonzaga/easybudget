const model = require('../../../src/app/model/budgetModel');

describe('Test budgetModel', () => {
  let data;

  beforeEach(() => {
    // Reset data before each test
    data = [];
  });

  test('add', () => {
    const newItem = { id: 1, name: 'Test item', price: 100 };
    data = model.add(newItem);

    expect(data).toHaveLength(1);
    expect(data[0]).toEqual(newItem);
  });

  test('getAll', () => {
    const items = [{ id: 1, name: 'Test item', price: 100 }];
    data = [...items];

    const result = model.getAll(data);

    expect(result).toEqual(items);
  });

  test('update', () => {
    const items = [{ id: 1, name: 'Test item', price: 100 }];
    const updatedItem = { id: 1, name: 'Updated item', price: 200 };
    let item;
    data = [...items];
  
    item = model.update(1, updatedItem);
  
    expect(data).toHaveLength(1);
    expect(item).toEqual(updatedItem);
  });

  test('delete', () => {
    const items = [{ id: 1, name: 'Test item', price: 100 }];
    let result;
    data = [...items];

    result = model.delete(1);

    expect(result).toEqual(true);
  });
});
