const passport = require('passport');
const initializeTwitter = require('./twitter');
const initializeFacebook = require('./facebook');

module.exports = () => {
  initializeFacebook(passport);
  initializeTwitter(passport);

  return passport.initialize();
};
