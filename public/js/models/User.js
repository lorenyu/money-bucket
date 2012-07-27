MB.namespace('models');

MB.models.User = Backbone.Model.extend({

  defaults: {
    'facebookId': 0
  },
  urlRoot: '/api/users'

});
