var Storage = require('./Storage'),
    User = require('../models/User'),
    db = require('../db'),
    async = require('async'),
    ObjectID = require('mongodb').ObjectID;

var UserService = module.exports = {
  getUserByFacebookId: function(facebookId, callback) {
    async.waterfall([
      function(callback) {
        db.collection(User.collectionName, callback);
      },
      function(collection, callback) {
        collection.findOne({ 'facebookId': facebookId }, callback);
      },
      function(user, callback) {
        if (!user) {
          return callback('No user with facebookId ' + facebookId);
        }

        user.id = user._id.toHexString();
        user = new User(user);
        callback(null, user);
      }
    ],
    callback);
  },
  getUser: function(id, callback) {
    Storage.load(User, id, callback);
  },
  saveUser: function(user, callback) {
    Storage.save(User, user, callback);
  }
};