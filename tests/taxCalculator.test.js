const { calculateTax, DEFAULT_RATE } = require('../src/taxCalculator');

describe('calculateTax', () => {
  test('applies the default rate', () => {
    expect(calculateTax(100)).toBe(100 * DEFAULT_RATE);
  });

  test('applies a custom rate', () => {
    expect(calculateTax(100, 0.1)).toBe(10);
  });

  test('rejects a negative amount', () => {
    expect(() => calculateTax(-5)).toThrow();
  });
});