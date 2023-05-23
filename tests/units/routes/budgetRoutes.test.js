const request = require('supertest');
const express = require('express');
const router = require('../../../src/app/routes/budgetRoutes');
const controller = require('../../../src/app/controllers/budgetController');

jest.mock('../../../src/app/controllers/budgetController');

const app = express();
app.use(express.json());
app.use(router);

describe('Budget Routes', () => {
  let mockBudget;

  beforeEach(() => {
    mockBudget = { id: 1, category: 'test', description: 'test', amount: 100, date: '2023-05-23' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /', async () => {
    controller.createBudget.mockImplementation((req, res) => res.status(200).send(mockBudget));

    const response = await request(app).post('/').send(mockBudget);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockBudget);
    expect(controller.createBudget).toHaveBeenCalled();
  });

  test('GET /', async () => {
    controller.getBudget.mockImplementation((req, res) => res.status(200).send([mockBudget]));

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([mockBudget]);
    expect(controller.getBudget).toHaveBeenCalled();
  });

  test('PUT /:id', async () => {
    controller.updateBudget.mockImplementation((req, res) => res.status(200).send(mockBudget));

    const response = await request(app).put(`/${mockBudget.id}`).send(mockBudget);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockBudget);
    expect(controller.updateBudget).toHaveBeenCalled();
  });

  test('DELETE /:id', async () => {
    controller.deleteBudget.mockImplementation((req, res) => res.status(200).send('Item deleted'));

    const response = await request(app).delete(`/${mockBudget.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Item deleted');
    expect(controller.deleteBudget).toHaveBeenCalled();
  });
});
