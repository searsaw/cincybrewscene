const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const initializePassport = require('./passport');
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
server.use(initializePassport());

module.exports = server;
