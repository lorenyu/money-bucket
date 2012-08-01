MB.namespace('models');

MB.models.Bucket = Backbone.Model.extend({

  defaults: {
    'name': 'New bucket',
    'description': '',
    'amount': 0,
    'userId': 0
  }

});
MB.models.Bucket = MB.mixin(MB.models.Bucket, MB.models.util.Resetable);