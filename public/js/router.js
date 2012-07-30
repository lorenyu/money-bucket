MB.Router = Backbone.Router.extend({

  routes: {
    '':                           'home',
    'buckets':                    'buckets',
    'buckets/add':                'addBucket',
    'buckets/:bucketId':          'bucket',
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

  addBucket: function() {
    MB.page = new MB.views.pages.AddBucketPageView({
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

  bucket: function(bucketId) {
    MB.page = new MB.views.pages.BucketPageView({
      model: MB.user.get('buckets').get(bucketId)
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