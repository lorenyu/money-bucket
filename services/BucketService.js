var Storage = require('./Storage'),
    Bucket = require('../models/Bucket');

var BucketService = module.exports = {
  loadBucket: function(id, callback) {
    Storage.load(Bucket, id, callback);
  },
  saveBucket: function(bucket, callback) {
    Storage.save(Bucket, bucket, callback);
  }
};