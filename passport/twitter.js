const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = passport => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TW_CLIENT_ID,
    consumerSecret: process.env.TW_CLIENT_SECRET,
    callbackURL: process.env.TW_CALLBACK_URL,
  }, (token, tokenSecret, profile, cb) => {

  }));
};
