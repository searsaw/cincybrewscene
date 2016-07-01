const router = require('express').Router();
const authRoutes = require('./auth');
const brewery = require('../mongoose/brewery');
const crawl = require('../mongoose/crawl');
const review = require('../mongoose/review');
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
   return res.redirect('/login');
  }
  next();
}

router.get('/create',isLoggedIn, (req, res) => {

  brewery.find(function (err, brews) {
    if (err) return console.error(err);
    res.render('create',{brews:brews});
  })

});


router.get('/crawls', (req, res) => {

  crawl.find().populate('reviews').exec((err, crawls) => {
    if (err) return console.error(err);
    res.render('crawls',{crawls});
  })

});

router.get('/crawl/:id',isLoggedIn, (req, res) => {
  crawl.find({_id:req.params.id}).populate('breweries').exec(function(err, crawl) {
      if (err) {
          res.render('error', {
              status: 500
          });
      } else {
          crawl = crawl[0];
            review.find({crawl:mongoose.Types.ObjectId(req.params.id)},(err,reviews) => {
              res.render('crawl-page',{crawl:crawl,reviews:{review:reviews.length}});
          })
      }
  });
});

router.post('/crawl/vote', (req, res) => {
  review.update(
    {crawl: mongoose.Types.ObjectId(req.body.crawl),poster: req.user},
    {
      suggested : true,
      crawl : mongoose.Types.ObjectId(req.body.crawl),
      poster: req.user,
   },
    {upsert: true}, 
    function(err, numAffected) {

      if (err) {
        res.send(err);
      }
      if(numAffected.upserted)
      {
        crawl.update(
          {_id:req.body.crawl},
          { $push: { reviews: numAffected.electionId } },
          function(err,stuff){
            res.send(numAffected);
          }
        );
      }
    }
  );
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
