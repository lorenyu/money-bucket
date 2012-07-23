var express = require('express'),
	mongodb = require('mongodb'),
	_ = require('underscore'),
	_s = require('underscore.string'),
	config = require('./config/config');

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
});
app.dynamicHelpers({
	session: function(req, res){
		return req.session;
	}
});

app.get('/', function(req, res) {
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
});

app.listen(config.server.port);
console.log("Server listening on " + config.server.port);
