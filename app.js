import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes/index';
import exphbs from 'express-handlebars';
import moment from 'moment';

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

module.exports = app;
