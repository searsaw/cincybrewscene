const router = require('express').Router();
const authRoutes = require('./auth');
const brewery = require('../mongoose/brewery');
const apiRoutes = require('./api');

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/map', (req, res) => {
  res.render('map');
});

router.get('/create', (req, res) => {

  brewery.find(function (err, brews) {
    if (err) return console.error(err);
    res.render('create',{brews:brews});
  })
  

});

module.exports = router;
