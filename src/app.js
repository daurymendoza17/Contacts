const express = require('express');
const morgan = require('morgan');
const exhb = require('express-handlebars');
const path = require('path');



const app = express();

// settings 

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs', exhb.create({
    defaultLayout: 'main',
    extname: '.hbs',
  }).engine
);
app.set('view engine', '.hbs');

// middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


// router

app.use(require('./router/index'));

// static files

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;







