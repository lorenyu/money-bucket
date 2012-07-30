MB.namespace('views.pages');

MB.views.pages.BucketPageView = Backbone.View.extend({
  events: {
    'submit form':          'saveBucket',
    'click .delete':        'deleteBucket',
    'click .add-1000':      'add1000',
    'click .add-100':       'add100',
    'click .add-10':        'add10',
    'click .add-1':         'add1',
    'click .sub-1000':      'sub1000',
    'click .sub-100':       'sub100',
    'click .sub-10':        'sub10',
    'click .sub-1':         'sub1'
  },

  inputEl: null,

  initialize: function(options) {
  },
  render: function() {
    this.$el.html(MB.render.pages.buckets.bucket({ bucket: this.model.toJSON() }));
    this.inputEl = this.$el.find('input[name=amount]');
    return this;
  },
  saveBucket: function(event) {
    event.preventDefault();
    this.model.set('amount', this.curAmount());
    this.model.save();
    MB.router.go('buckets');
  },
  deleteBucket: function(event) {
    event.preventDefault();
    this.model.destroy();
    MB.router.go('buckets');
  },
  add1000: function() {
    event.preventDefault();
    this.addMoney(1000);
  },
  add100: function() {
    event.preventDefault();
    this.addMoney(100);
  },
  add10: function() {
    event.preventDefault();
    this.addMoney(10);
  },
  add1: function() {
    event.preventDefault();
    this.addMoney(1);
  },
  sub1000: function() {
    event.preventDefault();
    this.addMoney(-1000);
  },
  sub100: function() {
    event.preventDefault();
    this.addMoney(-100);
  },
  sub10: function() {
    event.preventDefault();
    this.addMoney(-10);
  },
  sub1: function() {
    event.preventDefault();
    this.addMoney(-1);
  },
  addMoney: function(amount) {
    var curAmount = this.curAmount();
    curAmount += amount;
    if (curAmount < 0) {
      curAmount = 0;
    }
    this.curAmount(curAmount);
  },
  curAmount: function(amount) {
    if (typeof amount === 'undefined') {
      return parseInt(this.inputEl.val());
    } else {
      this.inputEl.val(amount);
      return this;
    }
  }
});