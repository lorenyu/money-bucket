var mongodb = require('mongodb'),
    _ = require('underscore'),
    config = require('../config/config').mongodb;

var _db = new mongodb.Db(config.database, new mongodb.Server(config.host, config.port, { autoreconnect: true })),
  _conn = null;

function _open(callback) {
  if (_conn) {
    return callback(null, _conn);
  }

  _db.open(function(err, conn) {
    if (err) return;
    _conn = conn;
    return callback(null, _conn);
  });
}

function _collection(collectionName, callback) {
  _open(function(err, conn) {
    if (err) return;

    conn.collection(collectionName, callback);
  });
}

var Storage = module.exports = {
  load: function(modelClass, id, callback) {
    _collection(modelClass.collectionName, function(err, collection) {
      if (err) return callback(err);

      collection.findOne({ _id: id }, function(err, object) {
        if (err) return callback(err);

        callback(null, new modelClass(object));
      });
    });
  },
  save: function(modelClass, object, callback) {
    _collection(modelClass.collectionName, function(err, collection) {
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