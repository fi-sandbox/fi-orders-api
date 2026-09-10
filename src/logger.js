/* eslint-disable no-console */
// Thin wrapper around console so call sites don't depend on a concrete
// logging backend. Left without a dedicated test file on purpose: it has
// no branching logic, only forwards to console.
function info(message) {
  console.log(`[INFO] ${message}`);
}

function error(message) {
  console.error(`[ERROR] ${message}`);
}

module.exports = { info, error };