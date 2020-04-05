const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/task/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  '/users',
  (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error.ejs', {
      message: err.message,
      error: err
    });
    next(err);
  },
  userRouter
);
app.use(
  '/boards',
  (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error.ejs', {
      message: err.message,
      error: err
    });
    next(err);
  },
  taskRouter
);
app.use(
  '/boards',
  (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error.ejs', {
      message: err.message,
      error: err
    });
    next(err);
  },
  boardRouter
);

module.exports = app;
