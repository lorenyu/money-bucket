var Storage = require('./Storage'),
    User = require('../models/User');

var UserService = module.exports = {
  loadUser: function(id, callback) {
    Storage.load(User, id, callback);
  },
  saveUser: function(user, callback) {
    Storage.save(User, user, callback);
  }
};