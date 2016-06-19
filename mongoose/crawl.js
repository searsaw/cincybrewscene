const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const CrawlSchema = new Schema({
  name: String,
  breweries: [{
    type: Schema.Types.ObjectId,
    ref: 'Brewery',
  }],
  owner: User,
  users: [User],
});

module.exports = mongoose.model('Crawl', CrawlSchema);
