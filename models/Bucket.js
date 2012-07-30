var _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var Bucket = module.exports = function(bucket) {
  bucket = bucket || {};

  if (bucket.id && typeof bucket.id === 'string') {
    bucket.id = ObjectID(bucket.id);
  }

  if (bucket.userId && typeof bucket.userId === 'string') {
    bucket.userId = ObjectID(bucket.userId);
  }

  // whitelist properties
  bucket = _.pick(bucket,
    'id',
    'name',
    'description',
    'amount',
    'userId');

  // set default properties
  bucket = _.defaults(bucket, {
    id: '',
    name: 'New bucket',
    amount: 0,
    userId: 0
  });

  // assign properties to object instance
  _.extend(this, bucket);

  // sanitize
  if (this.amount) {
    this.amount = parseInt(this.amount);
    this.amount = isNaN(this.amount) ? 0 : this.amount;
    this.amount = this.amount < 0 ? 0 : this.amount;
  }

  return this;
};

Bucket.collectionName = 'buckets';