MB.namespace('views');

MB.views.BucketView = Backbone.View.extend({
  className: 'bucket',
  render: function() {
    this.$el.html(MB.render.buckets.bucket({ bucket: this.model }));
    return this;
  }
});