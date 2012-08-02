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
  deleteBucket: function(bucket, callback) {
    Storage.delete(Bucket, bucket, callback);
  },
  getBucketsForUser: function(user, callback) {
    db.collection(Bucket.collectionName, function(err, collection) {
      collection.find({ 'userId': user.id }, {
          sort: [['_id', 'desc']]
        }).toArray(function(err, buckets) {
        buckets = _.map(buckets, function(bucket) {
          bucket.id = bucket._id;
          return new Bucket(bucket);
        });
        callback(null, buckets);
      });
    });
  }
};