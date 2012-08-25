MB.namespace('views.pages');

MB.views.pages.BucketsPageView = Backbone.View.extend({
  events: {
    'click .add-bucket': 'addBucket',
    'click .bucket .edit': 'edit',
    'click .bucket .delete': 'delete',
    'submit .edit-bucket-form': 'saveBucket',
    'click .edit-bucket-form .cancel': 'cancelEdit',

    //new user experience only (not used very often)
    'click .add-example-buckets': 'addExampleBuckets',
    'click .reset-buckets': 'resetBuckets'
  },
  isFirstTime: false,
  editingBuckets: {},
  statusMsg: '',
  initialize: function(options) {
    this.isFirstTime = this.model.get('user').get('buckets').length <= 0;
  },
  render: function() {
    if (this.model.get('user').get('buckets').length <= 0) {
      this.statusMsg = '<div class="alert alert-info alert-block"><button data-dismiss="alert" class="close">×</button><h3 class="alert-heading">Adding Cubbies</h3><p>Click <a class="add-bucket btn"><i class="icon-plus"></i> Add Cubby</a> to add a cubby. Or start with some <a class="add-example-buckets btn"><i class="icon-plus"></i> example cubbies</a></p></div>';
    }
    this.$el.html(MB.render.pages.buckets({
      buckets: this.model.get('user').get('buckets').toJSON(),
      editingBuckets: this.editingBuckets,
      statusMsg: this.statusMsg
    }));

    return this;
  },
  addBucket: function() {
    var bucket = this.model.get('user').get('buckets').create({}, {
      at: 0,
      wait: true,
      success: _.bind(function(bucket) {
        this.editingBuckets[bucket.id] = true;

        this.render();
        $('input[name=id][value=' + bucket.id + ']').parents('form').find('[name=name]').focus();
      }, this)
    });
  },
  addExampleBuckets: function() {
    this.model.get('user').get('buckets').reset([
      {
        name: 'Rainy Day Money',
        description: 'For emergencies only.'
      },
      {
        name: 'Tuition Money',
        description: 'It is never too late to learn.'
      },
      {
        name: 'Trip to Paris',
        description: 'The city of love'
      },
      {
        name: 'Random Acts of Kindness',
        description: 'For it is in giving that we receive.'
      },
      {
        name: 'Groceries and Supplies',
        description: 'The essentials.'
      },
      {
        name: 'Eating out',
        description: 'Dinner is served.'
      },
      {
        name: 'Special Occasions',
        description: 'Birthdays and weddings and holidays, oh my.'
      },
      {
        name: 'Shopping',
        description: 'Nuff said.'
      }
    ]);
    this.statusMsg = '<div class="alert alert-info"><button class="close" data-dismiss="alert">&times;</button>You are now ready to <a class="btn" href="#deposit">Allocate</a> money into your newly created cubbies. Or you can <button class="reset-buckets btn">Start Over</button> and create your own cubbies.</div>';
    this.render();

    this.model.get('user').get('buckets').invoke('save');
  },
  resetBuckets: function() {
    var buckets = this.model.get('user').get('buckets').toArray(),
        bucket;
    while (true) {
      bucket = buckets.pop();
      if (!bucket) {
        break;
      }
      bucket.destroy();
    }

    this.render();
  },
  edit: function(event) {
    var $target = $(event.target),
        bucketId = $target.parents('.bucket').attr('bucketId');
    this.editingBuckets[bucketId] = true;
    this.render();
  },
  delete: function(event) {
    var $target = $(event.target),
        bucketId = $target.parents('.bucket').attr('bucketId'),
        bucket = this.model.get('user').get('buckets').get(bucketId);
    if (!confirm('Delete cubby: ' + bucket.get('name') + '?')) {
      return;
    }
    bucket.destroy();
    this.render();
  },
  saveBucket: function(event) {
    event.preventDefault();
    var $target = $(event.target),
        bucketId = $target.find('[name=id]').val(),
        bucket = this.model.get('user').get('buckets').get(bucketId);
    bucket.set({
      name: $target.find('[name=name]').val(),
      description: $target.find('[name=description]').val()
    });

    // if this is the first bucket the user created
    if (this.model.get('user').get('buckets').length == 1 && this.isFirstTime) {
      this.statusMsg = '<div class="alert alert-info"><button class="close" data-dismiss="alert">&times;</button>You successfully created your first cubby. Go ahead and create a few more. When you are ready, click <a class="btn" href="#deposit">Allocate</a> to put money into your newly created cubbies.</div>';
    }

    delete this.editingBuckets[bucketId];
    this.render();

    bucket.save();
  },
  cancelEdit: function(event) {
    event.preventDefault();
    var $target = $(event.target),
        bucketId = $target.parents('.edit-bucket-form').find('[name=id]').val();
    delete this.editingBuckets[bucketId];
    this.render();
  }
});