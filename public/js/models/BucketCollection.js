MB.namespace('models');

MB.models.BucketCollection = Backbone.Collection.extend({

  model: MB.models.Bucket,
  url: '/api/buckets'

});
