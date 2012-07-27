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
        _id: ObjectID()
    });

    // if _id is a string, then convert to ObjectID
    if (!(user._id instanceof ObjectID)) {
        user._id = ObjectID(user._id);
    }

    // assign properties to object instance
    _.extend(this, user);
    return this;
};

User.collectionName = 'users';