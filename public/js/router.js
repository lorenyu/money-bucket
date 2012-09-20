MB.Router = Backbone.Router.extend({

  routes: {
    '':                           'home',
    'login':                      'login',
    'buckets':                    'buckets',
    'deposit':                    'deposit',
    'withdraw':                   'withdraw',
    'feedback':                   'feedback'
  },

  go: function(routeName) {
    this.navigate(routeName, { trigger: true });
  },

  requireLogin: function(callback) {
    if (!MB.user) {
      this.login();
      return;
    }
    callback();
  },

  login: function() {
    MB.page = new MB.views.pages.LoginPageView({
      model: new MB.models.Page({})
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  },

  home: function() {
    this.requireLogin(_.bind(function() {
      MB.page = new MB.views.pages.HomePageView({
        model: new MB.models.Page({
          user: MB.user
        })
      });
      $('.root').html(MB.page.el);
      MB.page.render();
    }, this));
  },

  buckets: function() {
    this.requireLogin(_.bind(function() {
      MB.page = new MB.views.pages.BucketsPageView({
        model: new MB.models.Page({
          user: MB.user
        })
      });
      $('.root').html(MB.page.el);
      MB.page.render();
    }, this));
  },

  deposit: function() {
    this.requireLogin(_.bind(function() {
      MB.page = new MB.views.pages.DepositPageView({
        model: new MB.models.Page({
          user: MB.user
        })
      });
      $('.root').html(MB.page.el);
      MB.page.render();
    }, this));
  },

  withdraw: function() {
    this.requireLogin(_.bind(function() {
      MB.page = new MB.views.pages.WithdrawPageView({
        model: new MB.models.WithdrawPage({
          user: MB.user
        })
      });
      $('.root').html(MB.page.el);
      MB.page.render();
    }, this));
  },

  feedback: function() {
    this.requireLogin(_.bind(function() {
      MB.page = new MB.views.pages.FeedbackPageView({
        model: new MB.models.Page({
          user: MB.user
        })
      });
      $('.root').html(MB.page.el);
      MB.page.render();
    }, this));
  }

});