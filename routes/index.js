const router = require('express').Router();
const authRoutes = require('./auth');

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/create', (req, res) => {
	var array = ['jake','balls'];

	var data = {
		array: array,
	};
  res.render('create',data);
});

module.exports = router;
