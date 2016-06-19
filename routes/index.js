const router = require('express').Router();
const authRoutes = require('./auth');
const brewery = require('../mongoose/brewery');
const crawl = require('../mongoose/crawl');
const apiRoutes = require('./api');
const mongoose = require('mongoose');


router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/map/:id', (req, res) => {
  crawl.findById(req.params.id).then((crawl, error) => {
    if (!crawl) res.sendStatus(404);
    else if (error) res.status(500).json({ error });
    else res.render('map-crawl', {
      id: req.params.id,
      crawl
    });
  });
});

router.get('/map', (req, res) => {
  res.render('map');
});

router.post('/brewery/create', (req,res) => {
	let breweries = req.body.breweries;

	if(typeof breweries == 'undefined')
	{
		res.send({error:"No Breweries"});
		return;
	}

	breweries = breweries.map(brew => {
	   return mongoose.Types.ObjectId(brew);
	});

	var dates = req.body.date.split('/');
	dates = dates[2]+"-"+dates[0]+"-"+dates[1]+" "+req.body.time;
	time = new Date(dates);

	crawl.create({
            name : req.body.name,
            breweries : req.body.breweries,
            date: time,
            owner: req.user,
        }, (err,message) => {

            if (err) {
            res.send(err);
            }

            res.send(message);
    });
});

function isLoggedIn(req,res,next){
  if(typeof req.user!== "object"){
   return res.redirect('login');
  }
  next();
}

router.get('/create',isLoggedIn, (req, res) => {

  brewery.find(function (err, brews) {
    if (err) return console.error(err);
    res.render('create',{brews:brews});
  })


});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/privacy', (req, res) => {
  res.render('privacy');
});

router.get('/tos', (req, res) => {
  res.render('tos');
});

router.get('/uber', (req, res) => {
  res.render('uber');
})

module.exports = router;
