const router = require('express').Router();

router.use('/', (req, res) => {
  res.render('index');
});

module.exports = router;
