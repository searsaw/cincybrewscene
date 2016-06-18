const mongoose = require('mongoose');
const Brewery = require('./brewery');
const User = require('./user');
const Schema = mongoose.Schema;

const CrawlSchema = new Schema({
  name: String,
  breweries: [Brewery],
  owner: User,
  users: [User],
});

module.exports = mongoose.model('Crawl', CrawlSchema);
