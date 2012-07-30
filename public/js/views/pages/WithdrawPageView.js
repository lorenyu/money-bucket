MB.namespace('views.pages');

MB.views.pages.WithdrawPageView = Backbone.View.extend({
  events: {
    'click .withdraw': 'withdraw'
  },
  withdrawAmount: 0,
  initialize: function(options) {
    this.model.get('buckets').on('change', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.withdraw({
      withdrawAmount: this.withdrawAmount,
      buckets: this.model.get('buckets').toJSON()
    }));
    return this;
  },
  withdraw: function(event) {
    var $target = $(event.target),
        amount = parseInt($target.attr('amount')),
        bucketId = $target.parents('.bucket').attr('bucketId'),
        bucket = this.model.get('buckets').get(bucketId),
        curAmount = bucket.get('amount');

    if ($target.hasClass('disabled')) {
      return;
    }

    amount = Math.min(curAmount, amount);
    curAmount -= amount;
    this.withdrawAmount += amount;

    bucket.set('amount', curAmount);
  }
});