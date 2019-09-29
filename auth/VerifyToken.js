var jwt = require('jsonwebtoken');
var config = require('../config/globle.config');

module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            console.log(err);
            if (err) { //failed verification.
                return res.json({"error": true,"message":"Invalid Token or Token Expired"});
            }
            console.log(decoded);
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}