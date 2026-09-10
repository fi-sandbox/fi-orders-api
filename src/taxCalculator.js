const DEFAULT_RATE = 0.2;

function calculateTax(amount, rate = DEFAULT_RATE) {
  if (typeof amount !== 'number' || amount < 0) {
    throw new Error('amount must be a non-negative number');
  }
  return Math.round(amount * rate * 100) / 100;
}

module.exports = { calculateTax, DEFAULT_RATE };