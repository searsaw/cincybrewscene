const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  auths: {
    facebook: {
      id: String,
      accessToken: String,
      expires: String,
    },
    twitter: {
      id: String,
      token: String,
      tokenSecret: String,
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
