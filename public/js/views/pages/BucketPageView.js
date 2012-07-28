MB.namespace('views.pages');

MB.views.pages.BucketPageView = Backbone.View.extend({
  events: {
  },
  initialize: function(options) {
  },
  render: function() {

    this.$el.html(MB.render.buckets.bucket({ bucket: this.model.toJSON() }));
    return this;
  }
});