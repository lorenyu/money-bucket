MB.Router = Backbone.Router.extend({

  routes: {
    '': 'home',
    'buckets': 'buckets',
    'buckets/:bucketId': 'bucket'
  },

  home: function() {
    MB.user.get('buckets').on('reset', function() {
      console.log('buckets reset');
      $('.container-fluid').html(MB.render.home({ buckets: MB.user.get('buckets').toJSON() }));
    });
  },

  buckets: function() {
    console.log('buckets');
  },

  bucket: function(bucketId) {
    console.log('bucket' + bucketId);
  }

});