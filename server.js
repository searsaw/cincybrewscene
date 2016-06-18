const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const initializePassport = require('./passport');
const routes = require('./routes');
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
}));
server.set('views', './views');
server.set('view engine', 'pug');
server.use(express.static('public'));
server.use(initializePassport());

server.use('/', routes);

module.exports = server;
