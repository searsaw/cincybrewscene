const Brewery = require('../../mongoose/brewery');

module.exports = (req, res) => {
  Brewery.find().then((breweries, err) => {
    if (err) res.json({ error: err });
    else res.json({ breweries });
  });
};
