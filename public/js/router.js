MB.Router = Backbone.Router.extend({

  routes: {
    '':                           'home',
    'buckets':                    'buckets',
    'deposit':                    'deposit',
    'withdraw':                   'withdraw'
  },

  go: function(routeName) {
    this.navigate(routeName, { trigger: true });
  },

  home: function() {
    MB.page = new MB.views.pages.HomePageView({
      model: new MB.models.Page({
        user: MB.user
      })
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  },

  buckets: function() {
    MB.page = new MB.views.pages.BucketsPageView({
      model: new MB.models.Page({
        user: MB.user
      })
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  },

  deposit: function() {
    MB.page = new MB.views.pages.DepositPageView({
      model: new MB.models.Page({
        user: MB.user
      })
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  },

  withdraw: function() {
    MB.page = new MB.views.pages.WithdrawPageView({
      model: new MB.models.WithdrawPage({
        user: MB.user
      })
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  }

});