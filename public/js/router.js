MB.Router = Backbone.Router.extend({

  routes: {
    '':                           'home',
    'buckets':                    'buckets',
    'buckets/add':                'addBucket',
    'buckets/:bucketId':          'bucket'
  },

  go: function(routeName) {
    this.navigate(routeName, { trigger: true });
  },

  home: function() {
    MB.page = new MB.views.pages.HomePageView({
      model: MB.user
    });
    $('.container-fluid').html(MB.page.el);
    MB.page.render();
  },

  addBucket: function() {
    MB.page = new MB.views.pages.AddBucketPageView({
      model: MB.user
    });
    $('.container-fluid').html(MB.page.el);
    MB.page.render();
  },

  buckets: function() {
    this.go('');
  },

  bucket: function(bucketId) {
    MB.page = new MB.views.pages.BucketPageView({
      model: MB.user.get('buckets').get(bucketId)
    });
    $('.container-fluid').html(MB.page.el);
    MB.page.render();
  }

});