MB.namespace('models');

MB.models.User = Backbone.Model.extend({

  defaults: {
    'facebookId': 0,
    'buckets': new MB.models.BucketCollection()
  },
  urlRoot: '/api/users'

});
