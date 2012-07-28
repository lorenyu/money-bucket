var Storage = require('./Storage'),
    Bucket = require('../models/Bucket'),
    db = require('../db'),
    _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var BucketService = module.exports = {
  getBucket: function(id, callback) {
    Storage.load(Bucket, id, callback);
  },
  saveBucket: function(bucket, callback) {
    Storage.save(Bucket, bucket, callback);
  },
  getBucketsForUser: function(user, callback) {
    db.collection(Bucket.collectionName, function(err, collection) {
      collection.find({ 'userId': ObjectID(user.id) }).toArray(function(err, buckets) {
        buckets = _.map(buckets, function(bucket) {
          bucket.id = bucket._id.toHexString();
          return new Bucket(bucket);
        });
        callback(null, buckets);
      });
    });
  }
};