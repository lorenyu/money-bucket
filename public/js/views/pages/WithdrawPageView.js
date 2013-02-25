MB.namespace('views.pages');

MB.views.pages.WithdrawPageView = Backbone.View.extend({
  events: {
    'submit .bucket form': 'subtract'
  },
  initialize: function(options) {

  },
  render: function() {
    this.$el.html(MB.render.pages.withdraw({
      user: this.model.get('user').toJSON(),
      withdrawAmount: this.model.get('withdrawAmount'),
      buckets: this.model.get('user').get('buckets').toJSON(),
      loggedIn: MB.isLoggedIn
    }));

    // create PrimitivePropertyView for each bucket to re-render that bucket when it changes
    this.$el.find('.bucket').each(_.bind(function(index, bucketEl) {
      var $bucketEl = $(bucketEl),
          bucketId = $bucketEl.attr('bucketid'),
          bucket = this.model.get('user').get('buckets').getByCid(bucketId);
      new MB.views.components.PrimitivePropertyView({
        el: $bucketEl.find('.amount'),
        model: bucket,
        propertyName: 'amount'
      });
    }, this));

    new MB.views.components.PrimitivePropertyView({
      el: this.$el.find('.allocated .amount'),
      model: this.model.get('user'),
      propertyName: 'allocatedAmount'
    });

    return this;
  },
  subtract: function(event) {
    var $target = $(event.target).find('input.amount'),
        amount = parseInt($target.val()),
        bucketId = $target.parents('.bucket').attr('bucketId'),
        bucket = this.model.get('user').get('buckets').getByCid(bucketId),
        curAmount = bucket.get('amount');

    amount = Math.min(curAmount, amount);
    curAmount -= amount;

    bucket.set('amount', curAmount);
    $target.val(''); // clear the input after submitting

    bucket.save();
  }
});