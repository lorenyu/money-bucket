var _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var User = module.exports = function(user) {
  user = user || {};

  if (user.id && typeof user.id === 'string') {
    user.id = ObjectID(user.id);
  }

  // whitelist properties
  user = _.pick(user,
    'id',
    'facebookId');

  // set default properties
  user = _.defaults(user, {
    id: ''
  });

  // assign properties to object instance
  _.extend(this, user);
  return this;
};

User.collectionName = 'users';