const FacebookStrategy = require('passport-facebook').Strategy;
const { FB } = require('fb');
const Promise = require('bluebird');
const User = require('../mongoose/user');
const {
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
  FB_CALLBACK_URL,
} = process.env;

module.exports = passport => {
  passport.use(new FacebookStrategy({
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: FB_CALLBACK_URL,
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'auths.facebook.id': profile.id })
      .then((user, err) => {
        if (!user) {
          createUser(accessToken, profile).then(user => {
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

function createUser(accessToken, profile) {
  return new Promise((resolve, reject) => {
    getRefreshToken(accessToken).then(fbRes => {
      const user = {
        auths: {
          facebook: {
            id: profile.id,
            accessToken: fbRes.access_token,
            expires: fbRes.expires ? fbRes.expires : 0,
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
    }).catch(err => reject(err));
  });
}

function getRefreshToken(accessToken) {
  return new Promise((resolve, reject) => {
    FB.api('oauth/access_token', {
      client_id: FB_CLIENT_ID,
      client_secret: FB_CLIENT_SECRET,
      grant_type: 'fb_exchange_token',
      fb_exchange_token: accessToken,
    }, res => {
      if (!res) reject('There was an error.');
      else if (res.error) reject(res.error);
      else resolve(res);
    });
  });
}
