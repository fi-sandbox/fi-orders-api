const { createOrderService } = require('../src/orderService');
const { createOrderRepository } = require('../src/orderRepository');

describe('orderService', () => {
  test('places a valid order and computes totals', () => {
    const service = createOrderService(createOrderRepository());
    const result = service.placeOrder({
      customerId: 'cust-1',
      items: [{ sku: 'A', quantity: 1, unitPrice: 100 }],
    });
    expect(result.ok).toBe(true);
    expect(result.order.customerId).toBe('cust-1');
    expect(result.order.status).toBe('created');
  });

  test('rejects an invalid payload', () => {
    const service = createOrderService(createOrderRepository());
    const result = service.placeOrder({});
    expect(result.ok).toBe(false);
  });

  test('rejects an out-of-stock item', () => {
    const service = createOrderService(createOrderRepository());
    const result = service.placeOrder({
      customerId: 'cust-1',
      items: [{ sku: 'A', quantity: 999, unitPrice: 1 }],
    });
    expect(result.ok).toBe(false);
  });

  test('getOrder and listOrders reflect placed orders', () => {
    const service = createOrderService(createOrderRepository());
    const placed = service.placeOrder({
      customerId: 'cust-1',
      items: [{ sku: 'A', quantity: 1, unitPrice: 50 }],
    });
    expect(service.getOrder(placed.order.id)).toEqual(placed.order);
    expect(service.listOrders()).toHaveLength(1);
  });
});