MB.namespace('models');

MB.models.BucketCollection = Backbone.Collection.extend({

  model: MB.models.Bucket,
  url: function() {
    return '/api/users/' + MB.user.id + '/buckets';
  }

});
