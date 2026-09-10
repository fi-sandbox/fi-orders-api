const request = require('supertest');
const { createApp } = require('../src/app');
const { createOrderRepository } = require('../src/orderRepository');

describe('orders API', () => {
  test('POST /orders creates an order', async () => {
    const app = createApp(createOrderRepository());
    const res = await request(app)
      .post('/orders')
      .send({ customerId: 'cust-1', items: [{ sku: 'A', quantity: 1, unitPrice: 20 }] });
    expect(res.status).toBe(201);
    expect(res.body.customerId).toBe('cust-1');
  });

  test('POST /orders rejects an invalid payload', async () => {
    const app = createApp(createOrderRepository());
    const res = await request(app).post('/orders').send({});
    expect(res.status).toBe(400);
  });

  test('GET /orders/:id returns 404 for an unknown order', async () => {
    const app = createApp(createOrderRepository());
    const res = await request(app).get('/orders/missing');
    expect(res.status).toBe(404);
  });

  test('GET /orders lists placed orders', async () => {
    const repo = createOrderRepository();
    const app = createApp(repo);
    await request(app)
      .post('/orders')
      .send({ customerId: 'c', items: [{ sku: 'A', quantity: 1, unitPrice: 10 }] });
    const res = await request(app).get('/orders');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});