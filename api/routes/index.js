const bodyParser = require('body-parser');
const receita = require('./receita.js');

module.exports = (app) => {
  app.use(
      bodyParser.json(),
      receita,
  );
};
