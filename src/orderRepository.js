// In-memory order storage. Good enough for a sandbox API; a real backend
// would replace this module without touching callers.
function createOrderRepository() {
  const orders = new Map();

  return {
    save(order) {
      orders.set(order.id, order);
      return order;
    },
    findById(id) {
      return orders.get(id) || null;
    },
    findAll() {
      return Array.from(orders.values());
    },
  };
}

module.exports = { createOrderRepository };