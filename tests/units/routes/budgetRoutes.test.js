const request = require('supertest');
const express = require('express');
const routes = require('../../../src/app/routes/budgetRoutes');
const app = express();

app.use(express.json());
app.use('/budget', routes);

describe('Test /budget routes', () => {
  test('POST /budget', async () => {
    const newItem = { id: 1, name: 'Test item', price: 100 };

    const response = await request(app)
      .post('/budget')
      .send(newItem);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(newItem);
  });

  test('GET /budget', async () => {
    const response = await request(app).get('/budget');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  test('PUT /budget/:id', async () => {
    const updatedItem = { id: 1, name: 'Updated item', price: 200 };

    const response = await request(app)
      .put('/budget/1')
      .send(updatedItem);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedItem);
  });

  test('DELETE /budget/:id', async () => {
    const response = await request(app).delete('/budget/1');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Item deleted');
  });
});
