var _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var Bucket = module.exports = function(user, bucket) {
    // whitelist properties
    bucket = _.pick(bucket,
        '_id',
        'title',
        'description',
        'amount');
    // set default properties
    bucket = _.defaults(bucket, {
        _id: new ObjectID(),
        title: 'New bucket',
        amount: 0,
        userId: user._id
    });
    // assign properties to object instance
    _.extend(this, bucket);
    return this;
};

Bucket.collectionName = 'buckets';