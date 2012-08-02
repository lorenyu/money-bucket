MB.namespace('views.pages');

MB.views.pages.HomePageView = Backbone.View.extend({
  events: {
    'submit .user-amount-form': 'setUserAmount'
  },
  initialize: function(options) {
    this.model.get('buckets').on('reset', _.bind(this.render, this));
    this.model.get('buckets').on('sync', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.home({
      user: this.model.toJSON(),
      buckets: this.model.get('buckets').toJSON(),
      allocatedAmount: this.model.allocatedAmount(),
      unallocatedAmount: this.model.unallocatedAmount()
    }));
    return this;
  },
  setUserAmount: function(event) {
    event.preventDefault();
    var $target = $(event.target),
        amount = parseInt($target.find('.amount').val());
    this.model.set('amount', amount);
    this.model.save();
    MB.router.go('buckets');
  }
});