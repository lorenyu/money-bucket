MB.namespace('models');

MB.models.User = Backbone.Model.extend({

  defaults: {
    'facebookId': 0,
    'amount': 0,
    'buckets': new MB.models.BucketCollection(),
    'allocatedAmount': 0,
    'unallocatedAmount': 0
  },
  urlRoot: '/api/users',
  initialize: function(attributes) {
    this.get('buckets').on('reset', function(buckets, options) {
      this._updateAllocatedAmount();
      buckets.each(function(bucket) {
        bucket.on('change:amount', this._updateAllocatedAmount, this);
      }, this);
    }, this);

    this.on('change:amount', this._updateUnallocatedAmount, this);

    this._updateAllocatedAmount();
  },
  _updateAllocatedAmount: function() {
    var allocatedAmount = this.get('buckets').totalAmount();
    if (this.get('allocatedAmount') === allocatedAmount) {
      return this;
    }
    this.set('allocatedAmount', allocatedAmount);
    this._updateUnallocatedAmount();
    return this;
  },
  _updateUnallocatedAmount: function() {
    var unallocatedAmount = this.get('amount') - this.get('allocatedAmount');
    if (this.get('unallocatedAmount') === unallocatedAmount) {
      return this;
    }
    this.set('unallocatedAmount', unallocatedAmount);
    return this;
  },
});
