'use strict';

var _ = require('lodash');
var async = require('async');
var Product = require('./product.model');

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
    Product.find({}, function(err, product){
	if (err) {
	    return (err);
	}
	res.json(product);
    });
}

exports.show = function (req, res){
    if(!isValidId(req,res)) return;
    var id = req.param('id');
    Product.findById(id, function(err, product){
	if (err) {
	    return (err);
	}
	res.json(product);
    });
};

exports.create = function (req,res, next){
    var errors = {};
    return async.waterfall([
	function(callback) {
	    return Product.count({ name: req.body.name }, callback);
	},
	function(isNameExist, callback) {
	    if (isNameExist) {
		return res.status(409).json({
		    errors: { name: ['Ce produit a déjà été créé'] }
		});
	    }
	    return Product.create({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		quantity_description: req.body.quantity_description,
		kind: req.body.kind,
		picture: req.body.picture
	    }, callback);
	}
    ], function(err) {
	if (err) {
	    return next(err);
	}
	return res.json({success: 'true'});
    });
};

exports.destroy = function (req,res){
  if(!isValidId(req,res)) return;
    var id = req.param('id');
    Product.findById(id, function(err, product){
	if (err) {
	    return (err);
	}
	product.remove(function(err){
	    if (err) {
		return (err);
	    } else {
		res.json({success: 'true'});
	    }
	})
    });
};

exports.update = function (req, res){
    if(!isValidId(req,res)) return;
    var id = req.param('id');
    Product.findById(id, function(err, product){
	if (err) {
	    return next(err);
	}
	product.name = req.body.name;
	product.description = req.body.description;
	product.price = req.body.price;
	product.quantity_description = req.body.quantity_description;
	product.kind = req.body.kind;
	product.picture = req.body.picture;
	product.save(function(err) {
	    if (err) {
		return next(err);
	    }
	});
	res.json(product);
    });
}
