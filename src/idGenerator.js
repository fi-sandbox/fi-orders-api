// Generates sequential order ids of the form "ORD-000123".
let counter = 0;

function nextOrderId() {
  counter += 1;
  return `ORD-${String(counter).padStart(6, '0')}`;
}

function resetForTests() {
  counter = 0;
}

module.exports = { nextOrderId, resetForTests };