MB.namespace('views.pages');

MB.views.pages.DepositPageView = Backbone.View.extend({
  events: {
    'click .bucket .btn': 'add',
    'submit .deposit-form': 'deposit',

    //new user experience only (not used very often)
    'click .deposit': 'deposit' // shows up in the status msg you see at the beginning if user.amount == 0
  },
  isFirstTime: 0,
  initialize: function(options) {
    if (this.model.get('user').get('amount') <= 0) {
      this.model.set('statusMsg', '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><h3 class="alert-heading">Adding Money</h3><p>Enter how much money you want to add, then click <a class="deposit btn">Add Money</a>.</p></div>');
    }

    this.isFirstTime = this.model.get('user').get('amount') <= 0 || this.model.get('user').get('allocatedAmount') <= 0;
  },
  render: function() {
    this.$el.html(MB.render.pages.deposit({
      user: this.model.get('user').toJSON(),
      buckets: this.model.get('user').get('buckets').toJSON(),
      statusMsg: this.model.get('statusMsg')
    }));

    this.model.get('user').on('change:unallocatedAmount', function(model, options) {
      if (model.get('unallocatedAmount') === 0) {
        this.$el.find('.unallocated').css('display', 'none');
      } else {
        this.$el.find('.unallocated').css('display', 'block');
      }
    }, this);

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

    // create PrimitivePropertyView for the allocated and unallocated amounts
    new MB.views.components.PrimitivePropertyView({
      el: this.$el.find('.allocated .amount'),
      model: this.model.get('user'),
      propertyName: 'allocatedAmount'
    });
    new MB.views.components.PrimitivePropertyView({
      el: this.$el.find('.unallocated .amount'),
      model: this.model.get('user'),
      propertyName: 'unallocatedAmount'
    });
    new MB.views.components.PrimitivePropertyView({
      el: this.$el.find('.status-msg'),
      model: this.model,
      propertyName: 'statusMsg'
    });

    return this;
  },
  add: function(event) {
    var $target = $(event.target),
        amount = parseInt($target.attr('amount')),
        bucketId = $target.parents('.bucket').attr('bucketId'),
        bucket = this.model.get('user').get('buckets').get(bucketId),
        curAmount = bucket.get('amount');

    if ($target.hasClass('disabled')) {
      return;
    }

    if (this.model.get('user').get('unallocatedAmount') <= 0) {
      this.model.set('statusMsg', '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><a class="deposit btn">Add money</a> to allocate.</p></div>');
    }

    amount = Math.min(this.model.get('user').get('unallocatedAmount'), amount);
    curAmount += amount;

    bucket.set('amount', curAmount);

    if (this.isFirstTime && this.model.get('user').get('unallocatedAmount') <= 0) {
      this.model.set('statusMsg', '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><h3 class="alert-heading">Success</h3>You allocated all your money and are ready to <a href="#withdraw" class="btn">Spend</a> it when you need to.</p></div>');
    }


    bucket.save();
  },
  deposit: function(event) {
    event.preventDefault();
    $('.deposit-amount').focus();
    var depositAmount = parseInt($('.deposit-amount').val()),
        userAmount = this.model.get('user').get('amount'),
        isFirstDeposit = userAmount == 0;

    if (!(depositAmount > 0)) {
      return;
    }

    this.model.get('user').set('amount', userAmount + depositAmount);

    if (isFirstDeposit) {
      this.model.set('statusMsg', '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><h3 class="alert-heading">Allocating Money</h3><p>Allocate all your money to give it a purpose. Then you can spend it with confidence that you are following your plans and principles. Click on the buttons within each cubby to allocate money to that cubby.</p></div>');
    } else {
      this.model.set('statusMsg', '');
    }

    this.model.get('user').save();
  }
});