const { isInStock } = require('../src/inventoryChecker');

describe('isInStock', () => {
  test('returns false without a sku', () => {
    expect(isInStock(undefined, 1)).toBe(false);
  });

  test('is deterministic for the same sku', () => {
    expect(isInStock('SKU-1', 1)).toBe(isInStock('SKU-1', 1));
  });

  test('rejects quantities above the stub stock level', () => {
    expect(isInStock('A', 1000)).toBe(false);
  });
});