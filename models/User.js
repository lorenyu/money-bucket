var _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var User = module.exports = function(user) {
    user = user || {};
    // whitelist properties
    user = _.pick(user,
        '_id',
        'facebookId');
    // set default properties
    user = _.defaults(user, {
        _id: new ObjectID()
    });
    // assign properties to object instance
    _.extend(this, user);
    return this;
};

User.collectionName = 'users';