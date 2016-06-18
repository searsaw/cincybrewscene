const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = passport => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
  }, (accessToken, refreshToken, profile, cb) => {

  }));
}
