MB.namespace('views.pages');

MB.views.pages.WithdrawPageView = Backbone.View.extend({
  events: {
    'click .bucket .btn': 'subtract',
    'submit .withdraw-form': 'withdraw'
  },
  withdrawAmount: 0,
  initialize: function(options) {
    this.model.on('change', _.bind(this.render, this));
    this.model.get('buckets').on('change', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.withdraw({
      user: this.model.toJSON(),
      allocatedAmount: this.model.allocatedAmount(),
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
    bucket.save();
  },
  withdraw: function(event) {
    event.preventDefault();
    var curUserAmount = this.model.get('amount');
    
    curUserAmount -= this.withdrawAmount;
    this.withdrawAmount = 0;

    this.model.set('amount', curUserAmount);
    this.model.save();
  }
});