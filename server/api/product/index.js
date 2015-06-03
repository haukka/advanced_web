'use strict';

var express= require('express');
var controller = require('./product.controller');
var secu = require('../middleware/authenticated');

var router = express.Router ();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', secu.ensureAuthenticated, controller.create);
router.put('/:id', secu.ensureAuthenticated, controller.update);
router.delete('/:id', secu.ensureAuthenticated, controller.destroy);

module.exports = router;