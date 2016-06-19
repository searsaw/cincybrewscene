const api = require('express').Router();
const breweries = require('./breweries');
const route = require('./route');
const crawlbrews = require('./crawl_brews');


api.get('/breweries', breweries);
api.get('/route', route);

api.get('/crawls/breweries/:id', crawlbrews);

module.exports = api;
