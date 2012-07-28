MB.namespace('views.pages');

MB.views.pages.BucketsPageView = Backbone.View.extend({
  events: {
  },
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(MB.render.buckets.buckets({ buckets: this.model.get('buckets').toJSON() }));
    return this;
  }
});