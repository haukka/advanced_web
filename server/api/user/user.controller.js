'use strict';

var async = require('async');
var User = require('./user.model');

function isValidId (req, res){
  req.checkParams('id', 'Invalid id').isObjectId();

  var errors = req.validationErrors();
  if(!errors){
    return true;
  }
  res.json(400, errors)
  return false;
}

exports.index =  function (req, res){
    User.find({}, function(err, user){
	if (err) {
	    return (err);
	}
	res.json(user);
    });
}

exports.show = function (req, res){
    if(!isValidId(req,res)) return;
    var id = req.param('id');
    User.findById(id, function(err, user){
	if (err) {
	    return (err);
	}
	res.json(user);
    });
};

exports.create = function (req,res, next){
  return async.waterfall([
    function(callback) {
      return User.count({ email: req.body.email }, callback);
    },
    function(isEmailExist, callback) {
      if (isEmailExist) {
        return res.status(409).json({
          errors: { email: ['Cette adresse email est déjà associée à un compte'] }
        });
      }
      return User.create({
        email: req.body.email,
        password: req.body.password,
	firstname: req.body.firstname,
	lastname: req.body.lastname,
	address: req.body.address,
	zipcode: req.body.zipcode,
	province: req.body.province
      }, callback);
    }
  ], function(err) {
    if (err) {
      return next(err);
    }
      return res.json({success: 'true'});
  });
};

exports.update = function (req, res){
    if(!isValidId(req,res)) return;
    var id = req.param('id');
    User.findById(id, function(err, user){
	if (err) {
	    return next(err);
	}
	user.email = req.body.email;
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	user.address = req.body.address;
	user.zipcode = req.body.zipcode;
	user.province = req.body.province;
	user.save(function(err) {
	    if (err) {
		return next(err);
	    }
	    res.json(user);
	});
    });
}

exports.destroy = function (req,res){
  if(!isValidId(req,res)) return;
    var id = req.param('id');
    User.findById(id, function(err, user){
	if (err) {
	    return (err);
	}
	user.remove(function(err){
	    if (err) {
		return (err);
	    } else {
		res.json({success: 'true'});
	    }
	})
    });
};