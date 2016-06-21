const request = require('request'); // npm install request
var tokenGetter = require('../../server');



module.exports = (req, res) => {
	res.send(tokenGetter.token);
};
