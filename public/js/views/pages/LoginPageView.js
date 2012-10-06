MB.namespace('views.pages');

MB.views.pages.LoginPageView = Backbone.View.extend({
  events: {
  },
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(MB.render.pages.login({}));
    return this;
  }
});