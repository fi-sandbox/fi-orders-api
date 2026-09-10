const { nextOrderId } = require('./idGenerator');
const { validateOrder } = require('./orderValidator');
const { calculateDiscount } = require('./discountCalculator');
const { calculateTax } = require('./taxCalculator');
const { isInStock } = require('./inventoryChecker');

function createOrderService(repository) {
  function placeOrder(payload) {
    const { valid, errors } = validateOrder(payload);
    if (!valid) {
      return { ok: false, errors };
    }

    const outOfStock = payload.items.filter(
      (item) => !isInStock(item.sku, item.quantity)
    );
    if (outOfStock.length > 0) {
      return {
        ok: false,
        errors: outOfStock.map((item) => `${item.sku} is out of stock`),
      };
    }

    const subtotal = payload.items.reduce(
      (sum, item) => sum + item.quantity * (item.unitPrice || 0),
      0
    );
    const discount = calculateDiscount(subtotal);
    const tax = calculateTax(subtotal - discount);

    const order = {
      id: nextOrderId(),
      customerId: payload.customerId,
      items: payload.items,
      subtotal,
      discount,
      tax,
      total: Math.round((subtotal - discount + tax) * 100) / 100,
      status: 'created',
    };

    repository.save(order);
    return { ok: true, order };
  }

  function getOrder(id) {
    return repository.findById(id);
  }

  function listOrders() {
    return repository.findAll();
  }

  return { placeOrder, getOrder, listOrders };
}

module.exports = { createOrderService };