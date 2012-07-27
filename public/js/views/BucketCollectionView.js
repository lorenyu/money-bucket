MB.namespace('views');

MB.views.BucketCollectionView = Backbone.View.extend({
  className: 'buckets',
  render: function() {
    this.$el.html(MB.render.buckets.buckets({ buckets: this.collection }));
    return this;
  }
});