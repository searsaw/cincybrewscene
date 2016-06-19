const router = require('express').Router();
const authRoutes = require('./auth');
const brewery = require('../mongoose/brewery');



router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/create', (req, res) => {

  brewery.find(function (err, brews) {
    if (err) return console.error(err);
    res.render('create',{brews:brews});
  })
  

});

module.exports = router;
