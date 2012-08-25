MB.namespace('models');

MB.models.WithdrawPage = Backbone.Model.extend({
  defaults: _.extend(_.clone(MB.models.Page.prototype.defaults), {
    'withdrawAmount': 0
  })
});
