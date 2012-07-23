var db = require('../db'),
    _ = require('underscore'),
    config = require('../config/config').mongodb;

var Storage = module.exports = {
  load: function(modelClass, id, callback) {
    db.collection(modelClass.collectionName, function(err, collection) {
      if (err) return callback(err);

      collection.findOne({ _id: id }, function(err, object) {
        if (err) return callback(err);

        callback(null, new modelClass(object));
      });
    });
  },
  save: function(modelClass, object, callback) {
    db.collection(modelClass.collectionName, function(err, collection) {
      if (err) return callback(err);

      collection.insert(object,
        { safe: true },
        function(err, result) {
          if (err) return callback(err);

          collection.findOne({ _id: object._id }, function(err, object) {
            if (err) return callback(err);

            callback(null, new modelClass(object));
          });
        }
      );
    });
  }
};