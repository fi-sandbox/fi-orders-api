// Process entrypoint. Not covered by tests on purpose: it only wires the
// app to a real port/listener, which is exercised by integration/manual
// testing rather than Jest.
const { createApp } = require('./app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  createApp().listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`fi-orders-api listening on port ${PORT}`);
  });
}

module.exports = { PORT };