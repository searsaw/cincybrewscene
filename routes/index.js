const router = require('express').Router();
const authRoutes = require('./auth');
const apiRoutes = require('./api');

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/map', (req, res) => {
  res.render('')
});

router.get('/create', (req, res) => {
	var array = ['jake','balls'];

	var data = {
		array: array,
	};
  res.render('create',data);
});

module.exports = router;
