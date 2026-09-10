// Synchronous stub inventory check: in the sandbox there is no real
// warehouse system, so stock is derived deterministically from the sku.
function isInStock(sku, quantity) {
  if (!sku) return false;
  const stubStock = (sku.charCodeAt(0) % 5) + 1;
  return quantity <= stubStock;
}

module.exports = { isInStock };