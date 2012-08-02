MB.namespace('models');

MB.models.Bucket = Backbone.Model.extend({

  defaults: {
    'name': 'New cubby',
    'description': '',
    'amount': 0,
    'userId': 0
  }

});
