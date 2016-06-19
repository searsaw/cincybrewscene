const api = require('express').Router();
const breweries = require('./breweries');

api.get('/breweries', breweries);

module.exports = api;
