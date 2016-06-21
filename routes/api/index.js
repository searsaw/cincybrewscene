const api = require('express').Router();
const breweries = require('./breweries');
const route = require('./route');
const crawlbrews = require('./crawl_brews');
const token = require('./token');


api.get('/breweries', breweries);
api.get('/route', route);

api.get('/crawls/breweries/:id', crawlbrews);

api.get('/token',token);

module.exports = api;
