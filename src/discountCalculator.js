// Flat-rate discount rules based on order subtotal.
const RULES = [
  { minSubtotal: 1000, rate: 0.1 },
  { minSubtotal: 500, rate: 0.05 },
];

function calculateDiscount(subtotal) {
  if (typeof subtotal !== 'number' || subtotal < 0) {
    throw new Error('subtotal must be a non-negative number');
  }
  const rule = RULES.find((r) => subtotal >= r.minSubtotal);
  return rule ? Math.round(subtotal * rule.rate * 100) / 100 : 0;
}

module.exports = { calculateDiscount };