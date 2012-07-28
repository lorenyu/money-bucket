MB.namespace('views.pages');

MB.views.pages.BucketPageView = Backbone.View.extend({
  events: {
    'submit .delete-form': 'deleteBucket',
  },
  initialize: function(options) {
  },
  render: function() {

    this.$el.html(MB.render.buckets.bucket({ bucket: this.model.toJSON() }));
    return this;
  },
  deleteBucket: function() {
    event.preventDefault();
    this.model.destroy();
    MB.router.go('/');
  }
});