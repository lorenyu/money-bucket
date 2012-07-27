MB.namespace('models');

MB.models.Bucket = Backbone.Model.extend({

  defaults: {
    'name': 'New bucket',
    'description': '',
    'amount': 0,
    'userId': 0
  }

});
