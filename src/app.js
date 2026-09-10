const express = require('express');
const { createOrderRepository } = require('./orderRepository');
const { createOrderService } = require('./orderService');

function createApp(repository = createOrderRepository()) {
  const app = express();
  app.use(express.json());

  const orderService = createOrderService(repository);

  app.post('/orders', (req, res) => {
    const result = orderService.placeOrder(req.body);
    if (!result.ok) {
      return res.status(400).json({ errors: result.errors });
    }
    return res.status(201).json(result.order);
  });

  app.get('/orders/:id', (req, res) => {
    const order = orderService.getOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'order not found' });
    }
    return res.json(order);
  });

  app.get('/orders', (req, res) => {
    res.json(orderService.listOrders());
  });

  return app;
}

module.exports = { createApp };