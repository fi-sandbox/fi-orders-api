const { canTransition, nextStatus } = require('../src/orderStatus');

describe('order status transitions', () => {
  test('created can move to confirmed', () => {
    expect(canTransition('created', 'confirmed')).toBe(true);
  });

  test('delivered is terminal', () => {
    expect(canTransition('delivered', 'shipped')).toBe(false);
  });

  test('nextStatus returns the target when allowed', () => {
    expect(nextStatus('created', 'cancelled')).toBe('cancelled');
  });

  test('nextStatus throws when not allowed', () => {
    expect(() => nextStatus('delivered', 'created')).toThrow();
  });
});