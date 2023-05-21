const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/budgetRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/budget', routes);

module.exports = app;
