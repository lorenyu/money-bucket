var express = require('express'),
  mongodb = require('mongodb'),
  async = require('async'),
  _ = require('underscore'),
  _s = require('underscore.string'),
  config = require('./config/config'),
  models = require('./models'),
  services = require('./services'),

  https = require('https'); // TODO remove this once we refactor out the controller logic

var app = express.createServer();

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

app.param('userId', function(req, res, next, userId) {
  DeckService.getDeckByName(deckName, function(err, deck) {
    if (err) return next(err);

    req.deck = deck;
    next();
  });
});

app.param('bucketId', function(req, res, next, bucketId) {
  DeckService.getDeckByName(deckName, function(err, deck) {
    if (err) return next(err);

    req.deck = deck;
    next();
  });
});

app.get('/', function(req, res) {
  if (req.session.user) {
    res.render('home', {
      buckets: [
        {
          title: 'Travel',
          amount: 150.00
        },
        {
          title: 'Movies',
          amount: 15.50
        }
      ]
    });
  } else {
    res.render('login');
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
    res.json({ success: true, statusMsg: 'Logged in.'});
  });
});
app.post('/api/users/:userId', function(req, res) {

});
app.post('/api/buckets/:bucketId', function(req, res) {

});

app.listen(config.server.port);
console.log("Server listening on " + config.server.port);
