MB.Router = Backbone.Router.extend({

  routes: {
    '':                           'home',
    'buckets':                    'buckets',
    'buckets/add':                'addBucket',
    'buckets/:bucketId':          'bucket'
  },

  home: function() {
    new MB.views.MainView({
      model: MB.user,
      el: $('.container-fluid')
    });
  },

  addBucket: function() {
    alert('add bucket');
  },

  buckets: function() {
    console.log('buckets');
  },

  bucket: function(bucketId) {
    console.log('bucket' + bucketId);
  }

});