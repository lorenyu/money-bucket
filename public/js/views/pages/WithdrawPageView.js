MB.namespace('views.pages');

MB.views.pages.WithdrawPageView = Backbone.View.extend({
  events: {
    'click .subtract': 'subtract',
    'click .submit': 'withdraw'
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
  subtract: function(event) {
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
  },
  withdraw: function() {
    var withdrawAmount = parseInt($('.withdraw-amount'));
    this.model.get('buckets').each(function(bucket) {
      bucket.save();
    });
    MB.router.go('');
  }
});