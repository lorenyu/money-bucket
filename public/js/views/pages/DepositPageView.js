MB.namespace('views.pages');

MB.views.pages.DepositPageView = Backbone.View.extend({
  events: {
    'click .bucket .btn': 'add',
    'submit .deposit-form': 'deposit',

    //new user experience only (not used very often)
    'click .deposit': 'deposit' // shows up in the status msg you see at the beginning if user.amount == 0
  },
  curAllocatedAmount: 0,
  curUnallocatedAmount: 0,
  initialize: function(options) {
    this.model.get('buckets').on('reset', _.bind(this.render, this));
    this.model.get('buckets').on('sync', _.bind(this.render, this));
    this.model.get('buckets').on('change', _.bind(this.render, this));
    this.model.on('change', _.bind(this.render, this));

    this.curAllocatedAmount = 0;
    this.curUnallocatedAmount = this.model.unallocatedAmount();

    if (this.model.get('amount') <= 0) {
      this.statusMsg = '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><h3 class="alert-heading">Adding Money</h3><p>Enter how much money you want to add, then click <a class="deposit btn">Add Money</a>.</p></div>';
    }
  },
  render: function() {
    this.$el.html(MB.render.pages.deposit({
      user: this.model.toJSON(),
      buckets: this.model.get('buckets').toJSON(),
      allocatedAmount: this.model.allocatedAmount(),
      unallocatedAmount: this.model.unallocatedAmount(),
      curAllocatedAmount: this.curAllocatedAmount,
      curUnallocatedAmount: this.curUnallocatedAmount,
      statusMsg: this.statusMsg
    }));
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

    if (this.model.unallocatedAmount() <= 0) {
      this.statusMsg = '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><a class="deposit btn">Add money</a> to allocate.</p></div>';
    }

    amount = Math.min(this.model.unallocatedAmount(), amount);
    curAmount += amount;

    this.curAllocatedAmount += amount;
    bucket.set('amount', curAmount);


    bucket.save();

    this.render();
  },
  deposit: function(event) {
    event.preventDefault();
    $('.deposit-amount').focus();
    var depositAmount = parseInt($('.deposit-amount').val()),
        userAmount = this.model.get('amount'),
        isFirstDeposit = userAmount == 0;

    if (!(depositAmount > 0)) {
      return;
    }

    this.model.set('amount', userAmount + depositAmount);
    this.curAllocatedAmount = 0;
    this.curUnallocatedAmount = this.model.unallocatedAmount();

    if (isFirstDeposit) {
      this.statusMsg = '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><h3 class="alert-heading">Allocating Money</h3><p>Allocate all your money to give it a purpose. Then you can spend it with confidence that you are following your plans and principles. Click on the buttons within each cubby to allocate money to that cubby.</p></div>';  
    } else {
      this.statusMsg = '';
    }

    this.model.save();
    this.render();
  }
});