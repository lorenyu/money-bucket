MB.Router = Backbone.Router.extend({

  routes: {
    '':                           'home',
    'buckets':                    'buckets',
    'buckets/add':                'addBucket',
    'buckets/:bucketId':          'bucket'
  },

  home: function() {
    MB.page = new MB.views.pages.HomePageView({
      model: MB.user,
      className: 'home-page'
    });
    $('.container-fluid').html(MB.page.el);
  },

  addBucket: function() {
    MB.page = new MB.views.pages.AddBucketPageView({
      model: MB.user,
      className: 'add-bucket-page'
    });
    $('.container-fluid').html(MB.page.el);
  },

  buckets: function() {
    console.log('buckets');
  },

  bucket: function(bucketId) {
    console.log('bucket' + bucketId);
  }

});