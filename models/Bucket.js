var _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var Bucket = module.exports = function(bucket) {
    bucket = bucket || {};
    // whitelist properties
    bucket = _.pick(bucket,
        '_id',
        'name',
        'description',
        'amount');
    // set default properties
    bucket = _.defaults(bucket, {
        _id: new ObjectID(),
        name: 'New bucket',
        amount: 0,
        userId: 0
    });
    // assign properties to object instance
    _.extend(this, bucket);
    return this;
};

Bucket.collectionName = 'buckets';