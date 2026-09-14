// Append-only history of order status changes, kept next to the status
// state machine in orderStatus.js. Integration branch only for now.
const { canTransition } = require('./orderStatus');

function createStatusHistory(initialStatus = 'created') {
  const entries = [{ status: initialStatus, at: new Date(0).toISOString() }];

  function record(status, at) {
    const current = entries[entries.length - 1].status;
    if (!canTransition(current, status)) {
      throw new Error(`cannot transition from ${current} to ${status}`);
    }
    entries.push({ status, at: at || new Date().toISOString() });
    return entries[entries.length - 1];
  }

  function current() {
    return entries[entries.length - 1].status;
  }

  function all() {
    return entries.slice();
  }

  return { record, current, all };
}

module.exports = { createStatusHistory };