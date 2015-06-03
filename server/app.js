'use strict';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var bodyParser = require('body-parser');

mongoose.connect(config.mongo.url);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
require('./config/routes')(app);
app.listen (config.port);

console.log('Server is running');

module.exports = app;