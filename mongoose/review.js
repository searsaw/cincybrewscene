const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  content: String,
  suggested: Boolean,
  crawl: {
    type: Schema.Types.ObjectId,
    ref: 'Crawl',
    required: [true, 'You need an crawl'],
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You need an owner'],
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
