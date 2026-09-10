const { validateOrder } = require('../src/orderValidator');

describe('validateOrder', () => {
  test('accepts a well-formed order', () => {
    const result = validateOrder({
      customerId: 'cust-1',
      items: [{ sku: 'SKU-1', quantity: 2 }],
    });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  test('rejects a non-object payload', () => {
    expect(validateOrder(null).valid).toBe(false);
  });

  test('reports a missing customerId', () => {
    const result = validateOrder({ items: [{ sku: 'a', quantity: 1 }] });
    expect(result.errors).toContain('customerId is required');
  });

  test('reports empty items', () => {
    const result = validateOrder({ customerId: 'c', items: [] });
    expect(result.errors).toContain('items must be a non-empty array');
  });

  test('reports invalid item fields', () => {
    const result = validateOrder({
      customerId: 'c',
      items: [{ quantity: -1 }],
    });
    expect(result.errors).toEqual(
      expect.arrayContaining([
        'items[0].sku is required',
        'items[0].quantity must be a positive number',
      ])
    );
  });
});