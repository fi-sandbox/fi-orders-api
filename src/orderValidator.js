// Validates an incoming order payload before it reaches the service layer.
function validateOrder(payload) {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['payload must be an object'] };
  }
  if (!payload.customerId || typeof payload.customerId !== 'string') {
    errors.push('customerId is required');
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    errors.push('items must be a non-empty array');
  } else {
    payload.items.forEach((item, i) => {
      if (!item.sku || typeof item.sku !== 'string') {
        errors.push(`items[${i}].sku is required`);
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`items[${i}].quantity must be a positive number`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateOrder };