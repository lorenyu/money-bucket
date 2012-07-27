MB.namespace('models');

MB.models.UserCollection = Backbone.Collection.extend({

  model: MB.models.User,
  url: '/api/users'

});
