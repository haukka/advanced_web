'use strict';

var _ = require('lodash');
var async = require('async');
var User = require('../user/user.model');
var jwt = require('jwt-simple');
var moment = require('moment');

var secret_token = 'A string to test the token'

function createToken(user) {
    var loaddata = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(loaddata, secret_token);
}

exports.login = function (req, res){
    User.findOne({email: req.body.email}, function(err, user){
	if (!user) {
	    res.json({success: 'false'})
	} else {
	    user.comparePassword(req.body.password, function(err, isMatch) {
		if (!isMatch) {
		    res.json({success: 'false'});
		}
		var createtoken = createToken(user);
		res.json({token: createtoken});
	    });
	}
    });		 
}
