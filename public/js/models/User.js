MB.namespace('models');

MB.models.User = Backbone.Model.extend({

  defaults: {
    'facebookId': 0,
    'amount': 0,
    'buckets': new MB.models.BucketCollection(),
    'allocatedAmount': 0
  },
  urlRoot: '/api/users',
  initialize: function(attributes) {
    this.get('buckets').on('reset', function(buckets) {
      this._updateAllocatedAmount();

      this.get('buckets').each(function(bucket) {
        bucket.on('change:amount', this._updateAllocatedAmount, this);
      }, this);
    }, this);

    this.get('buckets').each(function(bucket) {
      bucket.on('change:amount', this._updateAllocatedAmount, this);
    }, this);

    this.get('buckets').on('add', function(bucket) {
      bucket.on('change:amount', this._updateAllocatedAmount, this);
    }, this);

    this._updateAllocatedAmount();
  },
  _updateAllocatedAmount: function() {
    var allocatedAmount = this.get('buckets').totalAmount();
    this.set('amount', allocatedAmount);
    if (this.get('allocatedAmount') === allocatedAmount) {
      return this;
    }
    this.set('allocatedAmount', allocatedAmount);
    return this;
  }
});
