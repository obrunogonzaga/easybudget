const controller = require('../../../src/app/controllers/budgetController');
const data = require('../../../src/app/model/budgetModel');

jest.mock('../../../src/app/model/budgetModel');

let req, res, next;

beforeEach(() => {
  // Mock request and response objects
  req = { body: {}, params: {} };
  res = { json: jest.fn(), status: jest.fn(), send: jest.fn() };
  next = jest.fn();
});

describe('Test budgetController', () => {
  test('createBudgetItem', async () => {
    const newItem = { id: 1, name: 'Test item', price: 100 };
    req.body = newItem;

    data.add.mockResolvedValue(newItem);

    await controller.createBudgetItem(req, res);

    expect(res.json).toHaveBeenCalledWith(newItem);
  });

  test('getBudgetItems', async () => {
    const items = [{ id: 1, name: 'Test item', price: 100 }];
    
    data.getAll.mockResolvedValue(items);

    await controller.getBudgetItems(req, res);

    expect(res.json).toHaveBeenCalledWith(items);
  });

  test('updateBudgetItem', async () => {
    const updatedItem = { id: 1, name: 'Updated item', price: 200 };
    req.params.id = 1;
    req.body = updatedItem;

    data.update.mockResolvedValue(updatedItem);

    await controller.updateBudgetItem(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedItem);
  });

  test('deleteBudgetItem', async () => {
    req.params.id = 1;

    data.remove.mockResolvedValue(true);

    await controller.deleteBudgetItem(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Item deleted');
  });
});
