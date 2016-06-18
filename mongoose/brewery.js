const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrewerySchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  loc: {
    type: [Number],
    index: '2d'
  },
  website: String,
  twitter: String,
  facebook: String,
});

module.exports = mongoose.model('Brewery', BrewerySchema);
