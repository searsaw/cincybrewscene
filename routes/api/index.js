const api = require('express').Router();
const breweries = require('./breweries');
const route = require('./route');

api.get('/breweries', breweries);
api.get('/route', route);

module.exports = api;
