const { nextOrderId, resetForTests } = require('../src/idGenerator');

describe('idGenerator', () => {
  beforeEach(() => resetForTests());

  test('generates zero-padded sequential ids', () => {
    expect(nextOrderId()).toBe('ORD-000001');
    expect(nextOrderId()).toBe('ORD-000002');
  });
});