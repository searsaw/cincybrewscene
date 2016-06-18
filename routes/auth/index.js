const authRoutes = require('express').Router();
const passport = require('passport');

authRoutes.get('/twitter', passport.authenticate('twitter'));
authRoutes.get('/twitter-callback', passport.authenticate('twitter', {
  failureRedirect: '/',
}), (req, res) => {
  console.log(req);
  res.redirect('/create');
});

authRoutes.get('/facebook', passport.authenticate('facebook'));
authRoutes.get('/facebook-callback', passport.authenticate('facebook', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/create');
});

module.exports = authRoutes;
