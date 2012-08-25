MB.namespace('views.pages');

MB.views.pages.WithdrawPageView = Backbone.View.extend({
  events: {
    'click .bucket .btn': 'subtract',
    'submit .withdraw-form': 'withdraw'
  },
  withdrawAmount: 0,
  initialize: function(options) {
    this.model.get('user').on('change', _.bind(this.render, this));
    this.model.get('user').get('buckets').on('change', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.withdraw({
      user: this.model.get('user').toJSON(),
      withdrawAmount: this.withdrawAmount,
      buckets: this.model.get('user').get('buckets').toJSON()
    }));
    return this;
  },
  subtract: function(event) {
    var $target = $(event.target),
        amount = parseInt($target.attr('amount')),
        bucketId = $target.parents('.bucket').attr('bucketId'),
        bucket = this.model.get('user').get('buckets').get(bucketId),
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
    var curUserAmount = this.model.get('user').get('amount');
    
    curUserAmount -= this.withdrawAmount;
    this.withdrawAmount = 0;

    this.model.get('user').set('amount', curUserAmount);
    this.model.get('user').save();
  }
});