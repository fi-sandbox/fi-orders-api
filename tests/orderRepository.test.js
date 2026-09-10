const { createOrderRepository } = require('../src/orderRepository');

describe('orderRepository', () => {
  test('saves and retrieves an order by id', () => {
    const repo = createOrderRepository();
    repo.save({ id: 'ORD-1', total: 10 });
    expect(repo.findById('ORD-1')).toEqual({ id: 'ORD-1', total: 10 });
  });

  test('returns null for an unknown id', () => {
    const repo = createOrderRepository();
    expect(repo.findById('missing')).toBeNull();
  });

  test('lists all saved orders', () => {
    const repo = createOrderRepository();
    repo.save({ id: 'a' });
    repo.save({ id: 'b' });
    expect(repo.findAll()).toHaveLength(2);
  });
});