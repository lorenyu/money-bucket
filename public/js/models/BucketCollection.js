MB.namespace('models');

MB.models.BucketCollection = Backbone.Collection.extend({

  model: MB.models.Bucket,
  url: function() {
    return '/api/users/' + MB.user.id + '/buckets';
  },
  totalAmount: function() {
    return this.reduce(function(memo, bucket) {
      return memo + bucket.get('amount');
    }, 0);
  }

});
