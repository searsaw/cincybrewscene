const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const CrawlSchema = new Schema({
  name: {
  	type:String,
  	required: [true, 'Please enter a name'],
  },
  date: {
  	type:Date,
  	required: [true, 'Please enter a date'],
  },
  breweries: [{
    type: Schema.Types.ObjectId,
    ref: 'Brewery',
    required: [true, 'We Need a Brewery'],
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You need an owner'],
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  reviewLength: {
    type:Number,
  }
});

module.exports = mongoose.model('Crawl', CrawlSchema);
