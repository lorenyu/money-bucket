MB.namespace('views.pages');

MB.views.pages.WithdrawPageView = Backbone.View.extend({
  events: {
    'click .bucket .btn': 'subtract',
    'submit .withdraw-form': 'withdraw'
  },
  initialize: function(options) {

  },
  render: function() {
    this.$el.html(MB.render.pages.withdraw({
      user: this.model.get('user').toJSON(),
      withdrawAmount: this.model.get('withdrawAmount'),
      buckets: this.model.get('user').get('buckets').toJSON()
    }));

    // create PrimitivePropertyView for each bucket to re-render that bucket when it changes
    this.$el.find('.bucket').each(_.bind(function(index, bucketEl) {
      var $bucketEl = $(bucketEl),
          bucketId = $bucketEl.attr('bucketid'),
          bucket = this.model.get('user').get('buckets').get(bucketId);
      new MB.views.components.PrimitivePropertyView({
        el: $bucketEl.find('.amount'),
        model: bucket,
        propertyName: 'amount'
      });
    }, this));

    new MB.views.components.PrimitivePropertyView({
      el: this.$el.find('.withdraw-amount .amount'),
      model: this.model,
      propertyName: 'withdrawAmount'
    });
    new MB.views.components.PrimitivePropertyView({
      el: this.$el.find('.allocated .amount'),
      model: this.model.get('user'),
      propertyName: 'allocatedAmount'
    });

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
    this.model.set('withdrawAmount', this.model.get('withdrawAmount') + amount);

    bucket.set('amount', curAmount);
    bucket.save();
  },
  withdraw: function(event) {
    event.preventDefault();
    var curUserAmount = this.model.get('user').get('amount');
    
    curUserAmount -= this.withdrawAmount;
    this.model.set('withdrawAmount', 0);

    this.model.get('user').set('amount', curUserAmount);
    this.model.get('user').save();
  }
});