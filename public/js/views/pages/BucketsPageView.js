MB.namespace('views.pages');

MB.views.pages.BucketsPageView = Backbone.View.extend({
  events: {
  },
  initialize: function(options) {
    this.model.get('buckets').on('reset', _.bind(this.render, this));
    this.model.get('buckets').on('sync', _.bind(this.render, this));
  },
  render: function() {
    this.$el.html(MB.render.pages.buckets.buckets({ buckets: this.model.get('buckets').toJSON() }));
    return this;
  }
});