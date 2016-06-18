const passport = require('passport');
const User = require('../mongoose/user');
const initializeTwitter = require('./twitter');
const initializeFacebook = require('./facebook');

module.exports = () => {
  initializeFacebook(passport);
  initializeTwitter(passport);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  return passport.initialize();
};
