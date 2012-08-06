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
    'amount',
    'facebookId'
  );

  // set default properties
  user = _.defaults(user, {
    id: '',
    amount: 0
  });

  // assign properties to object instance
  _.extend(this, user);

  // sanitize
  if (this.amount) {
    this.amount = parseInt(this.amount);
    this.amount = isNaN(this.amount) ? 0 : this.amount;
    this.amount = this.amount < 0 ? 0 : this.amount;
  }
  
  return this;
};

User.collectionName = 'users';