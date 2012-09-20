MB.namespace('views.pages');

MB.views.pages.LoginPageView = Backbone.View.extend({
  events: {
    // TODO: the header .login should be in a more general place not just LoginPageView
    'click .login': 'login'
  },
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(MB.render.pages.login({}));
    return this;
  },
  login: function() {
    MB.auth.promptUserForLogin(function(data) {
      MB.user = new MB.models.User(data.user);
      MB.user.get('buckets').fetch({
        success: function() {
          // backbone's equivalent to refresh
          Backbone.history.loadUrl(window.location.hash);
        }
      });
    });
  }
});