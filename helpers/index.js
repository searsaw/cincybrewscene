const request = require('request'); // npm install request

  var promise = new Promise(
    function(resolve, reject) {

      request.post({
        url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
        json: true,
        form: {
          'f': 'json',
          'client_id': 'StmlPjfGYsyT2CVX',
          'client_secret': 'e265cb500e17421ead0eac373c6872d8',
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
