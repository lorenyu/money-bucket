MB.namespace('views.pages');

MB.views.pages.DepositPageView = Backbone.View.extend({
  events: {
    'click .bucket .btn': 'add',
    'submit .deposit-form': 'deposit'
  },
  curAllocatedAmount: 0,
  curUnallocatedAmount: 0,
  isAllocating: false,
  initialize: function(options) {
    this.model.get('buckets').on('reset', _.bind(this.render, this));
    this.model.get('buckets').on('sync', _.bind(this.render, this));
    this.model.get('buckets').on('change', _.bind(this.render, this));
    this.model.on('change', _.bind(this.render, this));

    this.curAllocatedAmount = 0;
    this.curUnallocatedAmount = this.model.unallocatedAmount();
  },
  render: function() {
    this.$el.html(MB.render.pages.deposit({
      user: this.model.toJSON(),
      buckets: this.model.get('buckets').toJSON(),
      allocatedAmount: this.model.allocatedAmount(),
      unallocatedAmount: this.model.unallocatedAmount(),
      curAllocatedAmount: this.curAllocatedAmount,
      curUnallocatedAmount: this.curUnallocatedAmount,
      isAllocating: this.isAllocating
    }));
    var allocatedPercentage = this.curAllocatedAmount / this.curUnallocatedAmount;
    $('.bar').css('width', (100 * allocatedPercentage) + '%' );
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

    this.curAllocatedAmount += amount;
    this.isAllocating = true;

    bucket.set('amount', curAmount);
    bucket.save();
  },
  deposit: function(event) {
    event.preventDefault();
    var depositAmount = parseInt($('.deposit-amount').val()),
        userAmount = this.model.get('amount');

    if (!(depositAmount > 0)) {
      return;
    }

    this.curAllocatedAmount = 0;
    this.curUnallocatedAmount = this.model.unallocatedAmount();
    this.isAllocating = true;

    this.model.set('amount', userAmount + depositAmount);
    this.model.save();
  }
});