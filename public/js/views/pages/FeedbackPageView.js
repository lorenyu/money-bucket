MB.namespace('views.pages');

MB.views.pages.FeedbackPageView = Backbone.View.extend({
  render: function() {
    this.$el.html(MB.render.pages.feedback({ loggedIn: MB.isLoggedIn }));
  }
});