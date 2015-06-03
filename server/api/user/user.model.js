var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  address: {
    type: String
  },
  zipcode: {
    type: String
  },
  province: {
    type: String
  },
  sessionToken: {
    type: String
  }
});

// Middlewares
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  var that = this;
  return bcrypt.genSalt(function(err, salt) {
    if (err) {
      return next(err);
    }
    return bcrypt.hash(that.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      that.password = hash;
      return next();
    });
  });
});

// Methods
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  return bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, isMatch);
    }
  });
};

module.exports = mongoose.model('User', userSchema);