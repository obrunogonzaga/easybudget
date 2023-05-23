const data = require('../../../src/app/model/budgetModel');

const { createBudget, getBudget, updateBudget, deleteBudget } = require('../../../src/app/controllers/budgetController'); 

jest.mock('../../../src/app/model/budgetModel');

describe('createBudget function tests', () => {
  let req;
  let res;
  let budgetItem;

  beforeEach(() => {
    // Reset all instances and calls to constructor and all methods:
    data.add.mockClear();

    budgetItem = { category: 'test', description: 'test', amount: 100, date: '2023-05-23' };

    req = {
      body: budgetItem,
    };

    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  test('chama data.add e res.json com os argumentos corretos quando um budgetItem válido é fornecido', () => {
    createBudget(req, res);

    expect(data.add).toHaveBeenCalledWith(budgetItem);
    expect(res.json).toHaveBeenCalledWith(budgetItem);
  });

  test('chama res.status e res.send com os argumentos corretos quando nenhum budgetItem é fornecido', () => {
    req.body = null;

    createBudget(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('No budget item provided');
  });
});

describe('getBudget function tests', () => {
  let req;
  let res;
  
  beforeEach(() => {
    // Reset all instances and calls to constructor and all methods:
    data.getAll.mockClear();

    req = {}; // getBudget não usa req, então podemos apenas passar um objeto vazio

    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  test('chama data.getAll e res.json com os argumentos corretos quando data.getAll resolve', async () => {
    const allBudgetItems = [{ category: 'test', description: 'test', amount: 100, date: '2023-05-23' }];

    data.getAll.mockResolvedValueOnce(allBudgetItems);

    await getBudget(req, res);

    expect(data.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(allBudgetItems);
  });

  test('chama data.getAll, res.status, e res.send com os argumentos corretos quando data.getAll rejeita', async () => {
    const errorMessage = 'Database error';

    data.getAll.mockRejectedValueOnce(new Error(errorMessage));

    await getBudget(req, res);

    expect(data.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});

describe('updateBudget function tests', () => {
  let req;
  let res;
  let budgetItem;
  let id;

  beforeEach(() => {
    // Reset all instances and calls to constructor and all methods:
    data.update.mockClear();

    id = 1;
    budgetItem = { category: 'test', description: 'test', amount: 100, date: '2023-05-23' };

    req = {
      params: { id: id.toString() }, // id deve ser uma string porque vem de uma URL
      body: budgetItem,
    };

    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  test('chama data.update e res.json com os argumentos corretos quando um budgetItem válido é fornecido e data.update resolve', async () => {
    data.update.mockResolvedValueOnce(budgetItem);

    await updateBudget(req, res);

    expect(data.update).toHaveBeenCalledWith(id, budgetItem);
    expect(res.json).toHaveBeenCalledWith(budgetItem);
  });

  test('chama res.status e res.send com os argumentos corretos quando nenhum budgetItem é fornecido', () => {
    req.body = null;

    updateBudget(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Missing item data');
  });

  test('chama data.update, res.status e res.send com os argumentos corretos quando um budgetItem válido é fornecido e data.update resolve com null', async () => {
    data.update.mockResolvedValueOnce(null);

    await updateBudget(req, res);

    expect(data.update).toHaveBeenCalledWith(id, budgetItem);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Item not found');
  });
});

describe('deleteBudget function tests', () => {
  let req;
  let res;
  let id;

  beforeEach(() => {
    // Reset all instances and calls to constructor and all methods:
    data.delete.mockClear();

    id = 1;

    req = {
      params: { id: id.toString() }, // id deve ser uma string porque vem de uma URL
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  test('chama data.delete, res.status e res.send com os argumentos corretos quando data.delete resolve com um resultado que indica sucesso', async () => {
    const mockResult = [{ affectedRows: 1 }];

    data.delete.mockResolvedValueOnce(mockResult);

    await deleteBudget(req, res);

    expect(data.delete).toHaveBeenCalledWith(id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Item deleted');
  });

  test('chama data.delete, res.status e res.send com os argumentos corretos quando data.delete resolve com um resultado que indica falha', async () => {
    const mockResult = [{ affectedRows: 0 }];

    data.delete.mockResolvedValueOnce(mockResult);

    await deleteBudget(req, res);

    expect(data.delete).toHaveBeenCalledWith(id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Item not found');
  });
});
