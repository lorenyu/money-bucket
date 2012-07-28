MB.namespace('views.pages');

MB.views.pages.HomePageView = Backbone.View.extend({
  events: {
  },
  initialize: function(options) {
    var self = this;
    this.model.get('buckets').on('reset', function() {
      console.log('buckets reset');
      self.render();
    });
  },
  render: function() {
    this.$el.html(MB.render.home({ buckets: this.model.get('buckets').toJSON() }));
    return this;
  }
});