MB.namespace('views.pages');

MB.views.pages.AddBucketPageView = Backbone.View.extend({
  events: {
    'submit form': 'addBucket'
  },
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(MB.render.buckets.add({}));
    return this;
  },
  addBucket: function(event) {
    event.preventDefault();
    var bucket = this.model.get('buckets').create({
      name: this.$el.find('[name=name]').val(),
      description: this.$el.find('[name=description]').val()
    });
    if (!bucket) {
      console.log('Cannot create bucket');
      return;
    }
    MB.router.go('/');
  }
});