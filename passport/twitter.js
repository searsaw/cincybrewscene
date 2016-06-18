const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../mongoose/user');

module.exports = passport => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TW_CLIENT_ID,
    consumerSecret: process.env.TW_CLIENT_SECRET,
    callbackURL: process.env.TW_CALLBACK_URL,
  }, (token, tokenSecret, profile, done) => {
    console.log('token', token);
    console.log('tokenSecret', tokenSecret);
    User.findOne({ 'auths.twitter.id': profile.id.toString() })
      .then((user, err) => {
        if (!user) {
          createUser(token, tokenSecret, profile).then(user => {
            done(null, user);
          }).catch(err => {
            done(err, null);
          });
        } else if (err) {
          done(err, null);
        } else {
          done(null, user);
        }
      });
  }));
};

function createUser(token, tokenSecret, profile) {
  return new Promise((resolve, reject) => {
    const user = {
      auths: {
        twitter: {
          id: profile.id,
          token,
          tokenSecret,
        },
      },
    };

    User.create(user)
      .then(u => {
        resolve(u);
      })
      .catch(err => {
        reject(err);
      });
  });
}
