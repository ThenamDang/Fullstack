const app = require('./app');
const processes = require('../processes.json');

const port = processes.apps[0].env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
