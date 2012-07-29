var db = require('../db'),
    async = require('async'),
    _ = require('underscore'),
    config = require('../config/config').mongodb,
    ObjectID = require('mongodb').ObjectID;

var Storage = module.exports = {
  load: function(modelClass, id, callback) {
    db.collection(modelClass.collectionName, function(err, collection) {
      if (err) return callback(err);

      collection.findOne({ _id: id }, function(err, object) {
        if (err) return callback(err);

        if (!object) {
          err = 'No object found with id ' + id + ' in collection ' + modelClass.collectionName;
          console.error(err);
          callback(err);
          return;
        }

        object.id = object._id;
        callback(null, new modelClass(object));
      });
    });
  },
  save: function(modelClass, object, callback) {
    db.collection(modelClass.collectionName, function(err, collection) {
      if (err) return callback(err);

      object._id = object.id;
      delete(object.id);

      if (!object._id) {
        object._id = ObjectID();
      }

      collection.findAndModify({ _id: object._id }, [], object,
        { upsert: true },
        function(err, result) {
          if (err) return callback(err);

          collection.findOne({ _id: object._id }, function(err, object) {
            if (err) return callback(err);

            if (!object) {
              err = 'Object not found after insertion';
              console.error(err);
              callback(err);
              return;
            }

            object.id = object._id;
            callback(null, new modelClass(object));
          });
        }
      );
    });
  },
  delete: function(modelClass, object, callback) {
    async.waterfall([
      function(callback) {
        db.collection(modelClass.collectionName, callback);
      },
      function(collection, callback) {
        collection.findAndModify({ _id: object.id }, [], {}, { remove: true }, function(err, object) {
          if (!object) {
            callback('Object not found');
            return;
          }

          callback(null, new modelClass(object));
        });
      }
    ],
    function(err, object) {
      if (err) {
        console.log(err);
        callback(err);
        return;
      }

      callback(null, object);
    });
  }
};