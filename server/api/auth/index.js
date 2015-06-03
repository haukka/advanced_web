'use strict';

var express= require('express');
var controller = require('./auth.controller');
var secu = require('../middleware/authenticated');

var router = express.Router ();


router.post('/login', controller.login);

module.exports = router;




