MB.namespace('views.pages');

MB.views.pages.BucketsPageView = Backbone.View.extend({
  events: {
    'click .add-bucket': 'addBucket',
    'click .bucket .edit': 'edit',
    'click .bucket .delete': 'delete',
    'submit .edit-bucket-form': 'saveBucket',
    'click .edit-bucket-form .cancel': 'cancelEdit'
  },
  editingBuckets: {},
  initialize: function(options) {
    this.model.get('buckets').on('reset', _.bind(this.render, this));
    this.model.get('buckets').on('sync', _.bind(this.render, this));
    this.model.get('buckets').on('change', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.buckets({
      buckets: this.model.get('buckets').toJSON(),
      editingBuckets: this.editingBuckets
    }));
    return this;
  },
  addBucket: function() {
    var bucket = this.model.get('buckets').create({}, {
      wait: true,
      success: _.bind(function(bucket) {
        this.editingBuckets[bucket.id] = true;
        this.render();
      }, this)
    });
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
        bucket = this.model.get('buckets').get(bucketId);
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
        bucket = this.model.get('buckets').get(bucketId);
    bucket.set({
      name: $target.find('[name=name]').val(),
      description: $target.find('[name=description]').val()
    });
    delete this.editingBuckets[bucketId];
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