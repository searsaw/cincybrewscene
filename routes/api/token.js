const Crawls = require('../../mongoose/crawl');
const request = require('request'); // npm install request


module.exports = (req, res) => {


	request.post({
	    url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
	    json: true,
	    form: {
	      'f': 'json',
	      'client_id': 'YOUR_APPLICATIONS_CLIENT_ID',
	      'client_secret': 'YOUR_APPLICATIONS_CLIENT_SECRET',
	      'grant_type': 'client_credentials',
	      'expiration': '1440'
	    }
	}, function(error, response, body){

		if(error)
		{
			return res.send({error:error});
		}
	    return res.send({token:body.access_token});
	});


};
