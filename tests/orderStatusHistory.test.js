const { createStatusHistory } = require('../src/orderStatusHistory');

describe('order status history', () => {
  test('starts in the created state', () => {
    expect(createStatusHistory().current()).toBe('created');
  });

  test('records an allowed transition', () => {
    const history = createStatusHistory();
    history.record('confirmed');
    expect(history.current()).toBe('confirmed');
    expect(history.all()).toHaveLength(2);
  });

  test('rejects a transition the state machine forbids', () => {
    const history = createStatusHistory();
    expect(() => history.record('delivered')).toThrow();
  });
});