var _ = require('underscore');

var Bucket = module.exports = function(bucket) {
    bucket = bucket || {};
    // whitelist properties
    bucket = _.pick(bucket,
        'id',
        'name',
        'description',
        'amount');
    // set default properties
    bucket = _.defaults(bucket, {
        id: '',
        name: 'New bucket',
        amount: 0,
        userId: 0
    });
    // assign properties to object instance
    _.extend(this, bucket);
    return this;
};

Bucket.collectionName = 'buckets';