const { calculateDiscount } = require('../src/discountCalculator');

describe('calculateDiscount', () => {
  test('no discount below 500', () => {
    expect(calculateDiscount(100)).toBe(0);
  });

  test('5% between 500 and 1000', () => {
    expect(calculateDiscount(600)).toBe(30);
  });

  test('10% at or above 1000', () => {
    expect(calculateDiscount(1000)).toBe(100);
  });

  test('rejects a negative subtotal', () => {
    expect(() => calculateDiscount(-1)).toThrow();
  });
});