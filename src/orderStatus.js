// Simple order status state machine.
const STATES = ['created', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const TRANSITIONS = {
  created: ['confirmed', 'cancelled'],
  confirmed: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};

function canTransition(from, to) {
  if (!STATES.includes(from) || !STATES.includes(to)) return false;
  return TRANSITIONS[from].includes(to);
}

function nextStatus(current, target) {
  if (!canTransition(current, target)) {
    throw new Error(`cannot transition from ${current} to ${target}`);
  }
  return target;
}

module.exports = { STATES, canTransition, nextStatus };