MB.namespace('models');

MB.models.User = Backbone.Model.extend({

  defaults: {
    'facebookId': 0,
    'amount': 0,
    'buckets': new MB.models.BucketCollection()
  },
  urlRoot: '/api/users',
  allocatedAmount: function() {
    return this.get('buckets').totalAmount();
  },
  unallocatedAmount: function() {
    return this.get('amount') - this.allocatedAmount();
  }
});
