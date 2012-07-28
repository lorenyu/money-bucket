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
    this._createPageView(MB.views.pages.HomePageView);
  },

  addBucket: function() {
    this._createPageView(MB.views.pages.AddBucketPageView);
  },

  buckets: function() {
    console.log('buckets');
  },

  bucket: function(bucketId) {
    console.log('bucket' + bucketId);
  },

  _createPageView: function(pageClass) {
    MB.page = new pageClass({
      model: MB.user
    });
    $('.container-fluid').html(MB.page.el);
    MB.page.render();
  }

});