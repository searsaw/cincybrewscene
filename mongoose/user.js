const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  auths: {
    facebook: {
      id: String,
      accessToken: String,
      expires: String,
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
