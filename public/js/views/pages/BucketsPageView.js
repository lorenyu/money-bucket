MB.namespace('views.pages');

MB.views.pages.BucketsPageView = Backbone.View.extend({
  events: {
    'click .add': 'add'
  },
  initialize: function(options) {
    this.model.get('buckets').on('reset', _.bind(this.render, this));
    this.model.get('buckets').on('sync', _.bind(this.render, this));
    this.model.get('buckets').on('change', _.bind(this.render, this));
    this.model.on('change', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.buckets.buckets({
      user: this.model.toJSON(),
      buckets: this.model.get('buckets').toJSON(),
      allocatedAmount: this.model.allocatedAmount(),
      unallocatedAmount: this.model.unallocatedAmount()
    }));
    var allocatedPercentage = this.model.allocatedAmount() / this.model.get('amount');
    $('.bar').css('width', parseInt(100 * allocatedPercentage) + '%' );
    return this;
  },
  add: function(event) {
    var $target = $(event.target),
        amount = parseInt($target.attr('amount')),
        bucketId = $target.parents('.bucket').attr('bucketId'),
        bucket = this.model.get('buckets').get(bucketId),
        curAmount = bucket.get('amount');

    if ($target.hasClass('disabled')) {
      return;
    }

    amount = Math.min(this.model.unallocatedAmount(), amount);
    curAmount += amount;

    bucket.set('amount', curAmount);
    bucket.save();
  }
});