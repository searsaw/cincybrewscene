const request = require('request'); // npm install request
const token = "";


  var promise = new Promise(
    function(resolve, reject) {

      request.post({
        url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
        json: true,
        form: {
          'f': 'json',
          'client_id': 'URTLuc6ZAWQir2dC',
          'client_secret': '12a35b0f6c5746508e48b898627207b0',
          'grant_type': 'client_credentials',
          'expiration': '1440'
        }
    }, function(error, response, body){

      if(error)
      {
        reject({error:error})
      }
        resolve(body);
    });

  });
    




module.exports = promise;
