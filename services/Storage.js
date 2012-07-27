var db = require('../db'),
    _ = require('underscore'),
    config = require('../config/config').mongodb,
    ObjectID = require('mongodb').ObjectID;

var Storage = module.exports = {
  load: function(modelClass, id, callback) {
    db.collection(modelClass.collectionName, function(err, collection) {
      if (err) return callback(err);

      collection.findOne({ _id: ObjectID(id) }, function(err, object) {
        if (err) return callback(err);

        if (!object) {
          err = 'No object found with id ' + id + ' in collection ' + modelClass.collectionName;
          console.error(err);
          callback(err);
          return;
        }

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

            if (!object) {
              err = 'No object found with id ' + id + ' in collection ' + modelClass.collectionName;
              console.error(err);
              callback(err);
              return;
            }

            callback(null, new modelClass(object));
          });
        }
      );
    });
  }
};