var jwt = require('jwt-simple');
var moment = require('moment');
var secret_token = 'A string to test the token'

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
      return res.json(401, { message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, secret_token);
  if (payload.exp <= moment().unix()) {
      return res.json(401, { message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

