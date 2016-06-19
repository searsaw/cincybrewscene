const Crawls = require('../../mongoose/crawl');

module.exports = (req, res) => {

  Crawls.find({_id:req.params.id}).populate('breweries').exec(function(err, crawl) {
	    
  		var breweries = [];
	    if (err) {
	        res.render('error', {
	            status: 500
	        });
	    } else {
	        for(i=0;i<crawl.length;i++){
	            breweries.push(crawl[i].breweries);
	        }
	        res.jsonp({"breweries":breweries[0]});
	    }
	});


};
