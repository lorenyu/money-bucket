var express = require('express'),
  mongodb = require('mongodb'),
  async = require('async'),
  _ = require('underscore'),
  _s = require('underscore.string'),
  config = require('./config/config'),
  models = require('./models'),
  services = require('./services'),
  ObjectID = require('mongodb').ObjectID,

  https = require('https'); // TODO remove this once we refactor out the controller logic

var app = express.createServer();

app.use(express.logger(config.logging.format));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: config.session.secret }));
app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/test/browser'));

app.set('view engine', 'jade');
// need this to enable template inheritance in jade - 2012-03-03
app.set('view options', { layout: false });


// helper functions to be used within views
app.helpers({
  config: config
});
app.dynamicHelpers({
  session: function(req, res){
    return req.session;
  }
});

function requireLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
    return;
  }

  req.loggedInUser = req.session.user;
  next();
}

function ajaxRequireLogin(req, res, next) {
  if (!req.session.user) {
    next(new Error('Login required'));
    return;
  }

  // session serializes everything to JSON so we have to reconstruct the user object
  req.loggedInUser = new models.User(req.session.user);
  next(); 
}

function andRestrictToSelf(req, res, next) {
  if (!req.loggedInUser) {
    next(new Error('User not logged in'));
    return;
  }

  if (!req.user) {
    next(new Error('No user defined'));
    return;
  }

  if (!req.loggedInUser.id.equals(req.user.id)) {
    next(new Error('Unauthorized: user ' + req.loggedInUser.id + ' trying to access user ' + req.user.id ));
    return;
  }
  next();
}

app.param('userId', function(req, res, next, userId) {
  services.UserService.getUser(ObjectID(userId), function(err, user) {
    if (err) {
      console.error('User ' + userId + ' not found');
      res.json({});
      return;
    }

    req.user = user;
    next();
  });
});

app.param('bucketId', function(req, res, next, bucketId) {
  services.BucketService.getBucket(ObjectID(bucketId), function(err, bucket) {
    if (err) {
      console.error('Bucket ' + bucketId + ' not found');
      res.json({});
      return;
    }

    req.bucket = bucket;
    next();
  });
});

app.get('/', function(req, res) {
  if (req.session.user) {
    res.render('layout');
  } else {
    res.render('pages/login');
  }
});


app.post('/api/auth/login', function(req, res) {
  async.waterfall([
    // check for required parameters
    function(callback) {
      var credentials = req.param('credentials');
      if (!credentials) return callback('Missing required parameter "credentials".');

      var facebookId = credentials.facebookId;
      if (!facebookId) return callback('Missing required parameter "credentials.facebookId".');

      var accessToken = credentials.accessToken;
      if (!accessToken) return callback('Missing required parameter "credentials.accessToken".');

      callback(null, accessToken, facebookId);
    },
    // authenticate user
    function(accessToken, facebookId, callback) {
      https.get({
        host: 'graph.facebook.com',
        path: '/' + facebookId + '?access_token=' + accessToken
      }, function(res) {
        if (res.statusCode == 200) {
          callback(null, facebookId);
        } else {
          callback('Login failed');
        }
      }).on('error', function(e) {
        callback('Login failed');
      });
    },
    // get the user from the database or create it if it doesn't exist
    function(facebookId, callback) {
      services.UserService.getUserByFacebookId(facebookId, function(err, user) {
        if (err) {
          user = new models.User({
            facebookId: facebookId
          });
          services.UserService.saveUser(user, function(err, user) {
            if (err) return callback('Error saving user');

            callback(null, user);
          });
          return;
        }

        callback(null, user);
      });
    }
  ],
  // save the user in the session or return an error message if something failed along the way
  function(err, user) {
    if (err) {
      console.error(err);
      res.json({ success: false, statusMsg: err });
      return;
    }

    req.session.user = user;
    console.log('Logged in as user ' + user.id);
    console.log(typeof user.id);
    res.json({ success: true, statusMsg: 'Logged in.'});
  });
});
app.post('/api/auth/logout', function(req, res) {
  req.session.destroy(function(err){
    if (err) {
      console.error(err);
      res.json({ success: false });
      return;
    }
    res.json({ success: true });
  });
});


app.get('/api/users/:userId', ajaxRequireLogin, andRestrictToSelf, function(req, res) {
  res.json(req.user);
});
app.put('/api/users/:userId', ajaxRequireLogin, andRestrictToSelf, function(req, res) {
  var user = new models.User(req.body);
  services.UserService.saveUser(user, function(err, user) {
    if (err) {
      console.error(err);
      res.json({});
      return;
    }

    res.json(user);
  });
});
app.get('/api/users/:userId/buckets', ajaxRequireLogin, andRestrictToSelf, function(req, res) {
  services.BucketService.getBucketsForUser(req.user, function(err, buckets) {
    if (err) {
      console.error(err);
      res.json({});
      return;
    }
    res.json(buckets);
  });
});
app.get('/api/users/:userId/buckets/:bucketId', ajaxRequireLogin, andRestrictToSelf, function(req, res) {
  res.json(req.bucket);
});
app.post('/api/users/:userId/buckets', ajaxRequireLogin, andRestrictToSelf, function(req, res) {
  var bucketData = req.body,
      bucket;

  // TODO: this stuff should be moved to UserService.addBucket
  bucketData.userId = req.user.id;
  bucket = new models.Bucket(bucketData);

  services.BucketService.saveBucket(bucket, function(err, bucket) {
    if (err) {
      console.error(err);
      res.json({});
      return;
    }

    res.json(bucket);
  });
});
app.put('/api/users/:userId/buckets/:bucketId', ajaxRequireLogin, andRestrictToSelf, function(req, res) {
  var bucket = new models.Bucket(req.body);
  services.BucketService.saveBucket(bucket, function(err, bucket) {
    if (err) {
      console.error(err);
      res.json({});
      return;
    }

    res.json(bucket);
  });
});
app.del('/api/users/:userId/buckets/:bucketId', ajaxRequireLogin, andRestrictToSelf, function(req, res) {
  if (!req.bucket) {
    console.error('Bucket not found');
    res.json({});
    return;
  }

  services.BucketService.deleteBucket(req.bucket, function(err, bucket) {
    if (err) {
      console.error(err);
      res.json({});
      return;
    }
    res.json(bucket);
  });
});



app.get('/js/renderers/*.js', function(req, res) {
  var path = req.params[0];
  services.RendererService.getClientRenderer(path, function(err, render) {
    res.send(render, { 'Content-Type' : 'text/javascript' });
  });
});


app.listen(config.server.port);
console.log("Server listening on " + config.server.port);
