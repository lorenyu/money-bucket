MB.namespace('views.pages');

MB.views.pages.HomePageView = Backbone.View.extend({
  events: {
    'submit .user-amount-form': 'setUserAmount'
  },
  initialize: function(options) {
    this.model.get('user').get('buckets').on('reset', _.bind(this.render, this));
    this.model.get('user').get('buckets').on('sync', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.home({
      user: this.model.get('user').toJSON(),
      buckets: this.model.get('user').get('buckets').toJSON()
    }));
    return this;
  },
  setUserAmount: function(event) {
    event.preventDefault();
    var $target = $(event.target),
        amount = parseInt($target.find('.amount').val());
    this.model.get('user').set('amount', amount);
    this.model.get('user').save();
    MB.router.go('buckets');
  }
});