MB.namespace('models');

MB.models.Bucket = Backbone.Model.extend({

  defaults: {
    'name': 'New cubby',
    'description': '',
    'amount': 0,
    'userId': 0,
    'cid': 0
  },

  initialize: function() {
  	this.set('cid', this.cid);
  }

});
