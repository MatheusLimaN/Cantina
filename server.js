#!/usr/bin / env node
import mongoose from 'mongoose';
import Promisse from 'bluebird';
import util from 'util';
import http from 'http';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes/index';
import exphbs from 'express-handlebars';
import moment from 'moment';

const debug = require('debug')('cantina:server');

require('dotenv-safe').config({
  allowEmptyValues: true
});

mongoose.Promise = Promisse;
Promisse.promisifyAll(mongoose);

const app = express();
var hbs = exphbs.create({
  extname: ".hbs",
  // Specify helpers which are only registered on this instance.
  helpers: {
    toFixed: (options) => options.hash.value.toFixed(options.hash.fixed),
    formatDate: (options) => moment(options.hash.date).format(options.hash.format),
    calcValor: (options) => (options.hash.valorTotal - options.hash.valorPago).toFixed(2),
    mult: (options) => (options.hash.a * options.hash.b).toFixed(2),
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

// conectar ao mongo db
mongoose.connectAsync(process.env.DB_URI, { server: { socketOptions: { keepAlive: 1 } } })
  .then(connection => debug(connection))
  .catch(e => new Error(`Não foi possível conectar ao database: ${process.env.DB_URI}, ${e}`));

// printar logs do mongoose em ambiente de dev
if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}