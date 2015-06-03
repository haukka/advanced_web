'use strict';

var path = require('path');

module.exports = {
  mongo : {
    url : 'mongodb://localhost/advancedweb-api'
  },
  static : path.join(__dirname,'..', '..', '..', 'static')
};
