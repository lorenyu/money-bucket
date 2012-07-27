MB.Router = Backbone.Router.extend({

  routes: {
    '': 'home',
    'buckets': 'buckets',
    'buckets/:bucketId': 'bucket'
  },

  home: function() {
    console.log('home');
  },

  buckets: function() {
    console.log('buckets');
  },

  bucket: function(bucketId) {
    console.log('bucket' + bucketId);
  }

});