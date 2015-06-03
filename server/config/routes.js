'use strict';

var morgan = require('morgan');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var config = require('./environment');

module.exports = function (app){

  app.use(morgan('dev'));

  if(config.env === 'development'){
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(__dirname, '..', '..', '.tmp')));
  }

  app.use(express.static(config.static));

  app.use(bodyParser.urlencoded({ extended :false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(expressValidator({
    customValidators: {
      isObjectId: function(value) {
        return mongoose.Types.ObjectId.isValid(value);
      }
    }
  }));

  app.use('/api/products', require('../api/product'));
  app.use('/api/users', require('../api/user'));
  app.use('/auth', require('../api/auth'));

  app.get('/*', function (req, res){
    res.sendfile(config.static + '/index.html');
  });
}


