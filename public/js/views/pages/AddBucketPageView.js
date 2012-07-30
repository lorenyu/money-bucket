MB.namespace('views.pages');

MB.views.pages.AddBucketPageView = Backbone.View.extend({
  events: {
    'submit form': 'addBucket'
  },
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(MB.render.pages.buckets.add({}));
    return this;
  },
  addBucket: function(event) {
    event.preventDefault();
    this.model.get('buckets').create({
      name: this.$el.find('[name=name]').val(),
      description: this.$el.find('[name=description]').val()
    }, {
      success: function(bucket) {
        MB.router.go('buckets/' + bucket.id);
      }
    });
  }
});