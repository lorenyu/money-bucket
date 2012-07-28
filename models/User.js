var _ = require('underscore');

var User = module.exports = function(user) {
  user = user || {};

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