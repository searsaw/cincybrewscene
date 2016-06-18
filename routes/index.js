const router = require('express').Router();
const authRoutes = require('./auth');

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
