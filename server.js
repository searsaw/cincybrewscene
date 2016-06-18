const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const initializePassport = require('./passport');
const routes = require('./routes');
const server = express();
var exphbs  = require('express-handlebars');

require('./mongoose');

server.use(morgan('dev'));
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.engine('handlebars', exphbs({defaultLayout: 'main'}));

server.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
}));

server.set('views', 'views');
server.set('view engine', 'handlebars');
server.use(express.static('public'));
initializePassport(server);

server.use('/', routes);

module.exports = server;
