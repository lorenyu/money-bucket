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
      model: MB.user
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  },

  buckets: function() {
    MB.page = new MB.views.pages.BucketsPageView({
      model: MB.user
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  },

  deposit: function() {
    MB.page = new MB.views.pages.DepositPageView({
      model: MB.user
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  },

  withdraw: function() {
    MB.page = new MB.views.pages.WithdrawPageView({
      model: MB.user
    });
    $('.root').html(MB.page.el);
    MB.page.render();
  }

});