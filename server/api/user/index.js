'use strict';

var express= require('express');
var controller = require('./user.controller');
var secu = require('../middleware/authenticated');

var router = express.Router ();

router.get('/', secu.ensureAuthenticated, controller.index);
router.get('/:id', secu.ensureAuthenticated, controller.show);
router.post('/', controller.create);
router.put('/:id', secu.ensureAuthenticated, controller.update);
router.delete('/:id', secu.ensureAuthenticated, controller.destroy);

module.exports = router;




