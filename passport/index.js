const passport = require('passport');
const User = require('../mongoose/user');
const initializeTwitter = require('./twitter');
const initializeFacebook = require('./facebook');

module.exports = (server) => {
  initializeFacebook(passport);
  initializeTwitter(passport);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log(id);

    User.findById(id, function(err, user) {
      done(err, user);
    });


  });

  server.use(passport.initialize());
  server.use(passport.session());
};
