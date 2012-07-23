var mongodb = require('mongodb'),
    config = require('./config/config').mongodb;

var _db = new mongodb.Db(config.database, new mongodb.Server(config.host, config.port, { autoreconnect: true })),
    _conn = null;

var db = module.exports = {
  open: function(callback) {
    if (_conn) {
      return callback(null, _conn);
    }

    _db.open(function(err, conn) {
      if (err) return;
      _conn = conn;
      return callback(null, _conn);
    });
  },
  collection: function(collectionName, callback) {
    db.open(function(err, conn) {
      if (err) return callback(err);

      conn.collection(collectionName, callback);
    });
  }
}
